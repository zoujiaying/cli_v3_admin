<template>
  <el-date-picker
    v-model="dateValue"
    :type="props.type"
    :range-separator="props.rangeSeparator"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    clearable
    :format="props.format"
    :value-format="props.valueFormat"
  />
</template>

<script lang="ts" setup name="AppDatePicker">
  interface Props {
    start?: string
    end?: string
    rangeSeparator?: string
    format?: string
    valueFormat?: string
    type?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    start: '',
    end: '',
    rangeSeparator: '至',
    format: 'YYYY-MM-DD',
    valueFormat: 'YYYY-MM-DD',
    type: 'daterange',
  })
  const emits = defineEmits<{
    (e: 'update:start', val: string): void
    (e: 'update:end', val: string): void
  }>()
  const dateValue = computed({
    get() {
      if (props.start || props.end) {
        return [props.start, props.end]
      } else {
        return []
      }
    },
    set(val: string[]) {
      if (val.length === 2) {
        emits('update:start', val[0])
        emits('update:end', val[1])
      } else {
        emits('update:start', '')
        emits('update:end', '')
      }
    },
  })
</script>

<style scoped lang="scss"></style>
