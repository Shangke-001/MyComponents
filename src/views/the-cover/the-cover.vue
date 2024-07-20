<template>
  <div class="cover-wrapper">
    <header>
      <div class="cover-title">尚可の组件</div>
      <div style="color: gray">基于 Vue 3 ，自定义组件</div>
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
  }
  img {
    margin-top: 20px;
  }
}
</style>
