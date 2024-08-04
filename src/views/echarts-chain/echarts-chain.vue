<template>
  <div class="wrapper">
    <header class="header">
      <h1>Echarts资金流可视化组件</h1>
      <div>
        <p>链状资金流可视化，清晰地呈现资金在各账户之间流转的情况。</p>
        <p>
          主要技术点包括Echarts关系图graph配置，主链计算，节点布局，节点拖拽，JSON数据展示，边折叠功能实现等。
        </p>
        <p>
          通过数据进行Echarts关系图生成，给予主链第一个节点可自动计算后续节点，完成链状布局，其余节点则使用力布局。
          拖拽节点可以改变节点位置，改变后节点位置固定。鼠标hover到边上进行JSON数据展示，根据层级结构存在缩进。
          点击边可以对相同流向的边进行折叠，并生成一条“已折叠”的边，点击改变则能进行展开，初始化时，同一流向的边大于等于4条，默认折叠。
        </p>
      </div>
    </header>
    <main class="main">
      <div id="chart"></div>
      <div class="chart-setting">
        <el-button plain @click="dataSettingVisible = true"> 打开配置面板 </el-button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, ref } from 'vue'
import * as echarts from 'echarts'
import {
  options,
  createNodeList,
  createEdgeList,
  findMainChain,
  LAYOUT_TYPE
} from './echarts-graph'

//#region Echarts资金流图逻辑
const dataInit = reactive({
  nodeList: [
    {
      nameToShow: '账户1',
      name: '1',
      value: '账户余额：111',
      index: 1
    },
    {
      nameToShow: '账户2',
      name: '2',
      value: '账户余额：222',
      index: 0
    },
    {
      nameToShow: '账户3',
      name: '3',
      value: '账户余额：333',
      index: 0
    },
    {
      nameToShow: '账户4',
      name: '4',
      value: '账户余额：444',
      index: 0
    },
    {
      nameToShow: '账户5',
      name: '5',
      value: '账户余额：555',
      index: 0
    },
    {
      nameToShow: '账户6',
      name: '6',
      value: '账户余额：666',
      index: 0
    },
    {
      nameToShow: '账户7',
      name: '7',
      value: '账户余额：777',
      index: 0
    }
  ],
  edgeList: [
    {
      source: '1',
      target: '2',
      amount: '边1的描述',
      value: 'JSON'
    },
    {
      source: '2',
      target: '3',
      amount: '边2的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '1',
      amount: '边2的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '4',
      amount: '边3的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '2',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '2',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '4',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '4',
      target: '5',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '5',
      target: '6',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '6',
      target: '4',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '6',
      target: '7',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '7',
      target: '6',
      amount: '边4的描述',
      value: 'JSON'
    },
    {
      source: '3',
      target: '7',
      amount: '边4的描述',
      value: 'JSON'
    }
  ],
  foldDirection: [],
  layoutMethod: LAYOUT_TYPE.SHORT_LONGEST_FIXED
})
let chart
onMounted(() => {
  chart = echarts.init(document.getElementById('chart'))
  initChart()
})
watch([dataInit.nodeList, dataInit.edgeList, dataInit.foldDirection], () => {
  updateChart()
})
watch(dataInit.foldDirection, () => {
  const optionNow = chart.getOption()
  optionNow.series[0].links = createEdgeList(dataInit.edgeList, dataInit.foldDirection)
  chart.setOption(optionNow)
})
const initChart = () => {
  findMainChain(dataInit.nodeList, dataInit.edgeList, dataInit.layoutMethod)

  options.series[0].data = createNodeList(dataInit.nodeList, dataInit.layoutMethod)
  options.series[0].links = createEdgeList(dataInit.edgeList, dataInit.foldDirection)
  chart.setOption(options)

  chart.off('click')
  chart.on('click', (params: any) => {
    if (params.dataType === 'edge') {
      let index = dataInit.foldDirection.findIndex((item) => {
        return item.source === params.data.source && item.target === params.data.target
      })
      if (index === -1) {
        dataInit.foldDirection.push({ source: params.data.source, target: params.data.target })
      } else {
        dataInit.foldDirection.splice(index, 1)
      }
    }
  })
  chart.off('mouseup')
  chart.on('mouseup', (params: any) => {
    if (params.dataType === 'node') {
      var option = chart.getOption()
      option.series[0].data[params.dataIndex].x = params.event.offsetX
      option.series[0].data[params.dataIndex].y = params.event.offsetY
      option.series[0].data[params.dataIndex].fixed = true
      chart.setOption(option)
    }
  })
}
const updateChart = () => {
  const optionNow = chart.getOption()
  optionNow.series[0].data = createNodeList(dataInit.nodeList, dataInit.layoutMethod)
  optionNow.series[0].links = createEdgeList(dataInit.edgeList, dataInit.foldDirection)
  chart.setOption(optionNow)
}
//#endregion

//#region 对话框Setting逻辑
const dataSettingVisible = ref(false)
//#region
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  height: 840px;
  .header {
    margin-bottom: 5px;
    h1 {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 35px;
    }
    div {
      margin: 10px 0;
      p {
        margin: 10px 0;
      }
    }
  }
  .main {
    position: relative;
    #chart {
      height: 570px;
      width: 100%;
      margin: 30px 0;
      border-radius: 10px;
      border: solid #ccc 1px;
    }
    .chart-setting {
      position: absolute;
      top: 15px;
      left: 20px;
    }
  }
}
</style>
