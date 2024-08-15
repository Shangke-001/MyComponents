<template>
  <div class="layouth-wrapper">
    <header class="header-content" @click="router.push('/')">
      <img src="/logo.jpg" width="40px" height="45px" />
      <el-button link class="title">尚术坊</el-button>
    </header>
    <main class="header-main">
      <el-input
        v-model="dataInit.searchKeyword"
        style="width: 180px; margin-right: 15px"
        placeholder="搜索（施工中..."
        :prefix-icon="Search"
        clearable
        disabled
      />
      <el-button link @click="router.push('/blogs')">笔记</el-button>
      <el-button link @click="router.push('/components')">组件</el-button>
      <div>
        <img
          src="/src/assets/svg/github.svg"
          width="30"
          height="30"
          style="margin: 0 15px"
          @click="handleGithub"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const dataInit = reactive({
  searchKeyword: ''
})
const router = useRouter()
const handleGithub = () => {
  window.open('https://github.com/Shangke-001/MyComponents')
}
</script>

<style lang="scss" scoped>
.layouth-wrapper {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-content {
    display: flex;
    align-items: center;
    .title {
      margin-left: 6px;
      font-weight: 650;
      font-size: 18px;
    }
  }
  .header-main {
    display: flex;
    align-items: center;
  }
}
</style>
