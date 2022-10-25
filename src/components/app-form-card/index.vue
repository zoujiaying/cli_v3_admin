<template>
  <el-row>
    <el-col :lg="18" :md="24" :xl="12" :sm="24" :xs="24">
      <el-card class="box-card">
        <slot></slot>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AppFormCard',
  })
</script>

<style scoped lang="scss">
  .box-card {
    min-height: calc(#{$base-keep-alive-height} - #{$base-padding} * 3);
    padding-top: $base-padding;
    box-sizing: border-box;
  }
</style>
