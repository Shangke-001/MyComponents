<template>
  <el-container>
    <el-aside width="300px">
      <el-menu :default-active="mdFile.activeLabel" style="border: 0px">
        <el-menu-item
          v-for="mdF in markDownFileList"
          :key="mdF.label"
          :index="mdF.label"
          @click="changeFile(mdF)"
        >
          <div style="width: 100%; text-align: end">{{ mdF.label }}</div>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="md-area">
      <div class="markdown-body"><Markdown :source="mdFile.mdSource" /></div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Markdown from 'vue3-markdown-it'
import 'github-markdown-css'
import md01 from '/src/assets/blogs-contents/前端学习与找实习阶段性总结.md?raw'
import md02 from '/src/assets/blogs-contents/test.md?raw'
const markDownFileList = [
  {
    label: '前端学习与找实习阶段性总结',
    source: md01
  },
  {
    label: 'test',
    source: md02
  }
]
const route = useRoute()
onMounted(() => {
  const dActive = (route.query.defaultActive as string) || '0'
  if (dActive) {
    changeFile(markDownFileList[parseInt(dActive)])
  }
})
const mdFile = reactive({
  mdSource: markDownFileList[0].source,
  activeLabel: markDownFileList[0].label
})
const changeFile = (mdF) => {
  mdFile.mdSource = mdF.source
  mdFile.activeLabel = mdF.label
}
</script>

<style lang="scss" scoped>
.md-area {
  height: calc(100vh - 60px);
  overflow-y: scroll;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
</style>
