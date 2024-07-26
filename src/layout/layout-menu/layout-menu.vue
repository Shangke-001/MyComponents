<template>
  <template v-for="routeMenu of menuRoutes" :key="routeMenu.path">
    <template v-if="!routeMenu.children">
      <el-menu-item v-if="!routeMenu.meta.hidden" :index="routeMenu.path">
        <template #title>
          <span>{{ routeMenu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else>
      <el-sub-menu v-if="!routeMenu.meta.hidden" :index="routeMenu.path">
        <template #title>
          <span>{{ routeMenu.meta.title }}</span>
        </template>
        <Menu :menuRoutes="routeMenu.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
const { menuRoutes } = defineProps(['menuRoutes'])
</script>

<style lang="scss" scoped></style>
