<template>
  <el-col :span="span">
    <div class="left-panel">
      <slot></slot>
    </div>
  </el-col>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AppQueryFormLeft',
    props: {
      span: {
        type: [String, Number],
        default: 14,
      },
    },
  })
</script>

<style scoped lang="scss"></style>
