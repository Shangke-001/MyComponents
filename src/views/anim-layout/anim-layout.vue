<template>
  <div class="anim-wrapper">
    <header class="anim-header">
      <h1>复杂交互动画布局</h1>
      <div>
        用于页面内容呈现，配合分页列表，能够在每页呈现9个模块，每个模块内部可呈现多条数据。鼠标移动上去，被hover的模块会根据其中的内容长度被拉伸，该列其余模块则被压扁。数据较多的情况下，可以通过鼠标滚轮能够上下滚动，查看其余数据。
      </div>
    </header>
    <main class="anim-main">
      <anim-column
        v-for="(col, index) in dataInit.columnList"
        :key="index"
        :columnData="col"
      ></anim-column>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import AnimColumn from './components/anim-column.vue'

let dataInit = reactive({
  allData: [],
  columnList: [[], [], []]
})
onMounted(() => {
  getData()
})
const getData = () => {
  dataInit.allData = [
    {
      id: 1,
      name: '模块1',
      data: [
        'aaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff'
      ]
    },
    {
      id: 2,
      name: '模块2',
      data: ['aaaaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccc', 'dddddddddd', 'eeeeeeee', 'fffff']
    },
    {
      id: 3,
      name: '模块3',
      data: ['aaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccc', 'dddddddddd', 'eeeeeeee', 'fffff']
    },
    {
      id: 4,
      name: '模块4',
      data: [
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff'
      ]
    },
    {
      id: 5,
      name: '模块5',
      data: [
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb'
      ]
    },
    {
      id: 6,
      name: '模块6',
      data: [
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff',
        'aaaaaaaaaa',
        'bbbbbbbbbbbbb',
        'cccccc',
        'dddddddddd',
        'eeeeeeee',
        'fffff'
      ]
    },
    {
      id: 7,
      name: '模块7',
      data: ['aaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccc', 'dddddddddd', 'eeeeeeee', 'fffff']
    },
    {
      id: 8,
      name: '模块8',
      data: ['aaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccc', 'dddddddddd', 'eeeeeeee', 'fffff']
    },
    {
      id: 9,
      name: '模块9',
      data: ['aaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccc', 'dddddddddd', 'eeeeeeee', 'fffff']
    }
  ]
  dataInit.columnList = [[], [], []]
  for (let i = 0; i < dataInit.allData.length; i++) {
    if ((i + 1) % 3 == 1) {
      dataInit.columnList[0].push(dataInit.allData[i])
    } else if ((i + 1) % 3 == 2) {
      dataInit.columnList[1].push(dataInit.allData[i])
    } else {
      dataInit.columnList[2].push(dataInit.allData[i])
    }
  }
  console.log(dataInit)
}
</script>

<style lang="scss" scoped>
.anim-wrapper {
  padding: 20px;
  height: 730px;
  .anim-header {
    margin-bottom: 5px;
    h1 {
      font-size: 25px;
      font-weight: 700;
      color: gray;
    }
    div {
      margin: 10px 0;
    }
  }
  .anim-main {
    background-color: #eee;
    border-radius: 10px;
    width: 100%;
    height: 610px;
    display: flex;
  }
}
</style>
