<template>
  <div>
    <el-row :gutter="0" class="app-query-form">
      <slot></slot>
    </el-row>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppQueryForm',
  })
</script>

<style scoped lang="scss">
  @mixin panel {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    min-height: $base-input-height;
    margin: 0 0 calc(#{$base-margin} / 2) 0;

    > .el-button {
      margin: 0 10px calc(#{$base-margin} / 2) 0;
    }
  }

  :deep(.app-query-form) {
    .el-form-item {
      margin-right: calc(#{$base-margin} / 2);
    }

    .el-form-item:first-child {
      margin-bottom: calc(#{$base-margin} / 2);
    }

    .el-form-item + .el-form-item {
      margin-bottom: calc(#{$base-margin} / 2);
    }

    .el-range-editor--small {
      width: 220px;

      .el-range-separator {
        width: 30px;
      }
    }

    .el-range-editor {
      width: 260px;
    }

    .el-input {
      width: 150px;
    }

    .top-panel {
      @include panel;
    }

    .bottom-panel {
      @include panel;

      border-top: 1px solid #dcdfe6;
    }

    .left-panel {
      @include panel;
    }

    .right-panel {
      @include panel;

      justify-content: flex-end;
    }

    .el-date-editor .el-range__icon {
      display: none;
    }

    .el-date-editor .el-range-input {
      width: 100px;
    }

    .el-date-editor .el-range-separator {
      width: auto;
    }
  }
</style>
