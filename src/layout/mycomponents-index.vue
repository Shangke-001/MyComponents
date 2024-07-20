<template>
  <el-aside width="250px" class="layout-aside">
    <el-scrollbar>
      <el-menu class="home-menu-items" :router="true" :default-active="route.path">
        <layout-menu :menuRoutes="routes[0].children[0].children"></layout-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
  <el-main>
    <RouterView />
  </el-main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import LayoutMenu from './layout-menu/layout-menu.vue'
import { routes } from '@/router//routes'
const route = useRoute()
</script>

<style lang="scss">
.layout-wrapper {
  height: 100vh;
  .layout-header {
    background-color: #fff;
    border-bottom: #eee 2px solid;
  }
  .layout-aside {
  }
}
</style>
