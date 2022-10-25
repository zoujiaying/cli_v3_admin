<template>
  <div class="app-select-multiple">
    <el-select
      v-model="selectValue"
      placeholder="请选择"
      :clearable="props.clearable"
      :multiple="props.multiple"
      :collapse-tags="props.multiple"
      :value-key="props.valueKey"
    >
      <el-option
        v-for="item in props.options"
        :key="item.value"
        :label="item.label"
        :value="item[props.valueKey]"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup name="AppSelectMultiple">
  interface Props {
    modelValue: string
    options: ObjectType[]
    multiple?: boolean
    valueKey?: string
    clearable?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    options: () => [],
    multiple: true,
    valueKey: 'value',
    clearable: true,
  })
  const emits = defineEmits<{
    (e: 'update:modelValue', val: string): void
  }>()
  const selectValue = computed({
    get() {
      if (props.multiple) {
        if (props.modelValue) {
          return props.modelValue.split(',')
        } else {
          return []
        }
      } else {
        return props.modelValue
      }
    },
    set(val: any) {
      if (props.multiple) {
        emits('update:modelValue', val.join(','))
      } else {
        emits('update:modelValue', val)
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.el-select) {
    .el-select__tags-text {
      max-width: 50px !important;
      justify-content: flex-start;
    }

    .el-input--small .el-input__inner {
      height: 24px !important;
    }

    .el-icon.el-tag__close {
      position: relative;
      top: 1px;
    }
  }
</style>
