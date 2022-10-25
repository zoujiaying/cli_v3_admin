<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'"
                mode="out-in">
      <keep-alive :include="list">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup name="AppKeepAlive">
import { useUserStore } from '@/store/user'

const useStore = useUserStore()

const list = computed(() => useStore.keepAliveNames)
</script>
<style lang="scss" scoped>
.keep-component {
  height: 100%;
}
</style>
