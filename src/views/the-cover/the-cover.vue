<template>
  <div class="cover-wrapper">
    <header>
      <div class="cover-title">尚术坊</div>
      <div class="cover-text">基于 Vue 3 ，存放笔记与比较有意思的前端内容</div>
    </header>
    <main>
      <img src="/src/assets/svg/cover.svg" width="900px" height="900px" />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cover-wrapper {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  header {
    position: absolute;
    top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cover-title {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .cover-text {
      color: $normal-color;
    }
  }
  img {
    margin-top: 20px;
  }
}
</style>
