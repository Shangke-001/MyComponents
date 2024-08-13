<template>
  <div class="wrapper">
    <header class="header">
      <h1>穿梭拖拽排序</h1>
      <div>类似穿梭框的组件，实现了自动穿梭，并且用户可以对选择的内容进行拖拽排序。</div>
    </header>
    <main class="main">
      <div class="drag-sort">
        <div class="choose-list">
          <h2>可选列表</h2>
          <div class="tips">tips: 可新增选择等</div>
          <div class="add-item">
            <el-form ref="ruleFormRef" :model="dataInit" :rules="rules">
              <el-form-item prop="additem">
                <div class="add-input">
                  <el-input
                    v-model="dataInit.additem"
                    :validate-event="false"
                    style="margin-right: 10px"
                  />
                  <el-button type="primary" plain @click="handleAddItem">新增</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="list-content">
            <el-scrollbar height="390">
              <div class="left-item" v-for="leftItem in dataInit.leftList" :key="leftItem.id">
                <span class="item-text">{{ leftItem.title }}</span>
                <el-checkbox
                  v-model="leftItem.isCheck"
                  @change="handleLeftChange(leftItem)"
                  style="margin-right: 7px"
                />
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="choose-list">
          <h2>已选排序列表</h2>
          <div class="tips">tips: 拖拽排序</div>
          <div class="list-content">
            <draggable v-model="dataInit.rightList" item-key="id">
              <template #item="{ element, index }">
                <div class="right-item">
                  <div style="display: flex; align-items: center">
                    <el-icon :size="20" color="#ccc" style="margin-right: 10px; margin-top: 5px">
                      <Grid />
                    </el-icon>
                    <span class="item-text">{{ element.title }}</span>
                  </div>
                  <el-icon :size="20" color="#c45656" @click="handleRightChange(index, element.id)">
                    <CircleCloseFilled />
                  </el-icon>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="sort-effect">
        <div class="effect-item" v-for="rightItem in dataInit.rightList" :key="rightItem.id">
          {{ rightItem.title }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'
const dataInit = reactive({
  additem: '',
  leftList: [
    { id: '1', title: '模块1', isCheck: false },
    { id: '2', title: '模块2', isCheck: false },
    { id: '3', title: '模块3', isCheck: false },
    { id: '4', title: '模块4', isCheck: false }
  ],
  rightList: [
    { id: '1', title: '模块1' },
    { id: '2', title: '模块2' }
  ]
})
const rules = {
  additem: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('模块名称不能为空'))
        } else if (dataInit.leftList.find((item) => item.title === value)) {
          callback(new Error('模块名称重复'))
        } else {
          callback()
        }
      }
    }
  ]
}
const ruleFormRef = ref()
onMounted(() => {
  dataInit.leftList.forEach((item) => {
    if (dataInit.rightList.find((i) => i.id === item.id)) {
      item.isCheck = true
    }
  })
})
const handleAddItem = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      dataInit.leftList.push({ id: nanoid(), title: dataInit.additem, isCheck: false })
      dataInit.additem = ''
    }
  })
}
const handleLeftChange = (leftItem) => {
  if (leftItem.isCheck) {
    if (dataInit.rightList.length < 10) {
      dataInit.rightList.push({ id: leftItem.id, title: leftItem.title })
    } else {
      ElMessage.error('最多选择10个模块')
    }
  } else {
    dataInit.rightList.splice(
      dataInit.rightList.findIndex((item) => item.id === leftItem.id),
      1
    )
  }
}
const handleRightChange = (index, rightItemId) => {
  dataInit.rightList.splice(index, 1)
  dataInit.leftList[dataInit.leftList.findIndex((item) => item.id === rightItemId)].isCheck = false
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  height: 730px;
  .header {
    margin-bottom: 5px;
    h1 {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 35px;
    }
    div {
      margin: 10px 0;
      p {
        margin: 10px 0;
      }
    }
  }
  .main {
    background-color: #eee;
    border-radius: 10px;
    height: 610px;
    min-width: 1040px;
    display: flex;
    gap: 20px;
    padding: 10px;
    .drag-sort {
      flex: 2;
      min-width: 700px;
      background-color: #fff;
      height: 100%;
      border-radius: 10px;
      display: flex;
      padding: 20px 0;
      .choose-list {
        padding: 10px 30px;
        flex: 1;
        h2 {
          font-size: 18px;
          font-weight: 550;
          margin-bottom: 10px;
        }
        .tips {
          font-size: 13px;
        }
        .add-item {
          margin: 15px 0 0 0;
          .add-input {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
        .list-content {
          padding: 15px 0;
          .left-item {
            height: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            padding: 0 5px;
          }
          .right-item {
            height: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            padding: 0 5px;
          }
          .left-item:hover {
            background-color: #eee;
          }
          .right-item:hover {
            background-color: #eee;
          }
          .item-text {
            margin: 0 5px;
          }
        }
      }
    }
    .sort-effect {
      min-width: 300px;
      background-color: #fff;
      height: 100%;
      border-radius: 10px;
      padding: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(5, 1fr);
      gap: 10px;
      .effect-item {
        border-radius: 10px;
        background-color: #eee;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
