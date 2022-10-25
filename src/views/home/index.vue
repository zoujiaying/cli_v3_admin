<template>
  <div>
    <h1>欢迎您！</h1>
    <h1>当前-index页面</h1>
  </div>
</template>
<script lang="ts" name="Index"></script>
<style lang="scss" scoped>
div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  font-size: 40px;
  &:nth-of-type(1) {
    color: rgb(0, 149, 255);
  }
}
</style>
