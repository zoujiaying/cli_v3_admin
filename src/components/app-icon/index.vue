<template>
  <svg aria-hidden="true" :style="iconStyle">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { isNumber } from '@/utils/validate'

  export default defineComponent({
    name: 'AppIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      size: {
        type: [String, Number],
        default: '1em',
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)
      const iconStyle = reactive({
        width: isNumber(props.size) ? `${props.size}px` : props.size,
        height: isNumber(props.size) ? `${props.size}px` : props.size,
      })
      return { symbolId, iconStyle }
    },
  })
</script>
<style scoped lang="scss">
  svg {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    fill: currentcolor;
  }
</style>
