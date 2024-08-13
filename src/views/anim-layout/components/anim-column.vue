<template>
  <div class="column-wrapper">
    <anim-item
      v-for="(item, index) in columnData"
      :key="index"
      :itemData="item"
      :heightItem="styleList[index].height"
      @isHoverChange="handleHoverChange(index, $event)"
    ></anim-item>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import AnimItem from './anim-item.vue'
const props = defineProps(['columnData'])
const styleList = reactive([
  { height: 190, isHover: false },
  { height: 190, isHover: false },
  { height: 190, isHover: false }
])
const handleHoverChange = (index, isHover) => {
  styleList[index].isHover = isHover
  calculateHeight()
}
const calculateHeight = () => {
  let hoverIndex = styleList.findIndex((item) => item.isHover)
  if (hoverIndex === -1) {
    styleList.forEach((item) => {
      item.height = 190
    })
  } else {
    let hoverHeight = Math.min(
      190 * 3 - 2 * 90,
      Math.max(190, 90 + 19 * props.columnData[hoverIndex]?.data.length)
    )
    styleList[hoverIndex].height = hoverHeight
    styleList.forEach((item, index) => {
      if (index != hoverIndex) {
        item.height = (190 * 3 - hoverHeight) / 2
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.column-wrapper {
  flex: 1;
}
</style>
