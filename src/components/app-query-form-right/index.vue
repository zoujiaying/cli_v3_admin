<template>
  <el-col :span="span">
    <div class="right-panel">
      <slot></slot>
    </div>
  </el-col>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AppQueryFormRight',
    props: {
      span: {
        type: [String, Number],
        default: 14,
      },
    },
  })
</script>

<style scoped lang="scss"></style>
