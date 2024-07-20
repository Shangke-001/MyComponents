<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header class="layout-header">
        <layout-header></layout-header>
      </el-header>
      <el-container>
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from './layout-header/layout-header.vue'
</script>

<style lang="scss">
.layout-wrapper {
  height: 100vh;
  .layout-header {
    background-color: #fff;
    border-bottom: #eee 2px solid;
  }
}
</style>
