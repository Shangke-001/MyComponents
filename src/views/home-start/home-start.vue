<template>
  <div class="intro-wrapper">
    <header class="intro-header">
      <h1>尚术坊の组件简介</h1>
      <div>
        做过的项目中比较有意思的组件或者内容，脱离项目重新编写，进行了简单的实现，不涉及后端接口，用于演示与记录。
      </div>
    </header>
    <main class="intro-main">
      <el-card
        shadow="always"
        v-for="(item, index) in dataInit.cardsData"
        :key="index"
        class="card-one"
      >
        <template #header>
          <div class="header-title">{{ item.header }}</div>
        </template>
        <main class="main">
          <div class="main-one" v-for="(itemD, index) in item.main" :key="index">
            <strong class="title">{{ itemD.title }}</strong>
            <div>{{ itemD.content }}</div>
          </div>
          <br />
        </main>
        <footer class="footer">
          <el-button
            text
            @click="handleBlogBtn(item.footer.blog)"
            :disabled="item.footer.blog === -1"
            >笔记</el-button
          >
          <el-button text @click="handleComponentBtn(item.footer.componentPath)">组件</el-button>
        </footer>
      </el-card>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const dataInit = reactive({
  cardsData: [
    {
      header: 'Echarts资金流可视化',
      main: [
        {
          title: '主要功能',
          content: '链状资金流可视化，清晰地呈现资金在各账户之间流转的情况。'
        },
        {
          title: '技术实现',
          content:
            'Echarts关系图graph配置，主链计算，节点布局，节点拖拽，JSON数据展示，边折叠功能等。'
        }
      ],
      footer: {
        blog: -1,
        componentPath: '/components/echartchain'
      }
    },
    {
      header: '穿梭拖拽排序',
      main: [
        {
          title: '主要功能',
          content: '实现自动穿梭功能，且能够进行拖拽排序。'
        },
        {
          title: '技术实现',
          content: '通过图形化界面实现对左右数据列表的更改，通过Vue.Draggable实现拖拽排序功能'
        }
      ],
      footer: {
        blog: -1,
        componentPath: '/components/dragsort'
      }
    },
    {
      header: '复杂交互动画布局',
      main: [
        {
          title: '主要功能',
          content:
            '实现九宫格布局，数据横向排列。当鼠标hover某个模块时，该模块根据其中内容长度被拉伸，该列其余模块被压扁。数据过多时，内容使用滚动方式呈现。'
        },
        {
          title: '技术实现',
          content: '根据内容计算容器高度，使用动画技术让变化过程变丝滑。'
        }
      ],
      footer: {
        blog: -1,
        componentPath: '/components/animlayout'
      }
    }
  ]
})
const handleBlogBtn = (dActive) => {
  router.push({
    path: '/blogs',
    query: {
      defaultActive: dActive
    }
  })
}
const handleComponentBtn = (cPath) => {
  router.push({
    path: cPath
  })
}
</script>

<style lang="scss" scoped>
.intro-wrapper {
  padding: 20px;
  height: 730px;
  .intro-header {
    margin-bottom: 5px;
    h1 {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 35px;
    }
    div {
      margin: 10px 0;
    }
  }
  .intro-main {
    margin: 40px 0 20px 0;
    display: grid;
    font-size: 14px;
    color: $normal-color;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    .card-one {
      position: relative;
      .header-title {
        font-size: 17px;
        color: $normal-color;
        font-weight: 600;
      }
      .main {
        margin: 15px 10px;
        color: $normal-color;
        .main-one {
          margin: 10px 0;
          .title {
            font-weight: 600;
          }
        }
      }
      .footer {
        display: flex;
        justify-content: end;
        margin: 0 10px;
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>
