<template>
  <div class="layouth-wrapper">
    <header class="header-content" @click="router.push('/')">
      <img src="/logo.jpg" width="40px" height="45px" />
      <div>尚可の个人网站</div>
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
      <div @click="router.push('/blogs')">博客</div>
      <div @click="router.push('/components')">组件</div>
      <div>
        <img src="/src/assets/svg/github.svg" width="30" height="30" />
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
    div {
      margin-left: 6px;
      font-weight: 650;
      font-size: 18px;
    }
  }
  .header-main {
    display: flex;
    align-items: center;
    div {
      margin-left: 15px;
    }
  }
}
</style>
