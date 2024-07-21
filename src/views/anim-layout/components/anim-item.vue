<template>
  <div
    class="item-wrapper"
    :style="{ height: heightItem + 'px' }"
    @mouseenter="$emit('isHoverChange', true)"
    @mouseleave="$emit('isHoverChange', false)"
  >
    <header class="item-header">{{ itemData.name }}</header>
    <main class="item-data">
      <el-scrollbar height="285px">
        <div style="font-size: 14px" v-for="(dataOne, index) in itemData.data" :key="index">
          {{ dataOne }}
        </div>
      </el-scrollbar>
    </main>
    <footer class="item-footer">
      <div v-if="ifDot">···</div>
      <el-button type="primary" plain class="item-btn">查看</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps(['itemData', 'heightItem'])
let ifDot = computed(() => {
  return Math.round((props.heightItem - 90) / 19) < props.itemData.data.length
})
</script>

<style lang="scss" scoped>
.item-wrapper {
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  padding: 10px 15px;
  overflow: hidden;
  transition: height 0.5s ease;
  position: relative;
  .item-header {
    font-size: 17px;
    font-weight: 550;
    margin: 5px 0 10px 5px;
  }
  .item-data {
    color: gray;
    padding: 0 15px;
  }
  .item-footer {
    background-color: #fff;
    position: absolute;
    bottom: 0px;
    width: calc(100% - 30px);
    height: 40px;
    padding: 0 15px;
    .item-btn {
      position: absolute;
      right: 10px;
      bottom: 15px;
    }
  }
}
</style>
