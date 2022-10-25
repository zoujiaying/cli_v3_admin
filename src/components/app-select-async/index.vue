<template>
  <div class="app-select-async">
    <el-select
      v-model="searchKey"
      :multiple="multiple"
      filterable
      :size="themeSize"
      remote
      reserve-keyword
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :loading="loading"
      :value-key="valueKey"
      :collapse-tags="collapseTags"
      clearable
      :style="width ? `width:${width}px` : `width:200px`"
      :disabled="disabled"
      @focus="initSelect"
    >
      <el-option
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[valueLabel]"
        :value="getVal(item[valueKey])"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'pinia'
  import { defineComponent } from 'vue'
  import request from '@/utils/request'
  import { ElMessage } from 'element-plus'
  import { useSettingsStore } from '@/store/settings'
  export default defineComponent({
    name: 'AppSelectAsync',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      api: {
        type: String,
        required: true,
      },
      paramsName: {
        type: String,
        required: true,
      },
      valueKey: {
        type: String,
        default: 'id',
      },
      valueLabel: {
        type: String,
        default: 'name',
      },      
      placeholder: {
        type: String,
        default: '请选择',
      },
      multiple: {
        type: Boolean,
        default: true,
      },
      collapseTags: {
        type: Boolean,
        default: true,
      },
      width: {
        type: Number,
        default: 0,
      },
      disabled: {
        type: Boolean,
        default: false,
      },      
    },
    emits: ['update:modelValue'],
    data() {
      return {
        loading: false,
        options: [] as ObjectType[],
        isInit: false,
        initData: [] as ObjectType[],
      }
    },
    computed: {
      ...mapState(useSettingsStore, ['themeSize']),
      searchKey: {
        get() {
          if (this.modelValue) {
            return this.multiple ? this.modelValue.split(',') : this.modelValue
          } else {
            return this.multiple ? [] : ''
          }
        },
        set(val) {
          this.$emit('update:modelValue', this.multiple ? val.join(',') : val)
        },
      },
    },
    methods: {
      init(list: any) {
        this.initData = list
        this.isInit = true
        this.options = [...list]
      },
      /*聚焦*/
      initSelect() {
        if (!this.isInit) {
          this.isInit = true
          this.remoteMethod('', true, 10)
        }
      },
      /*远程搜索*/
      remoteMethod(query: string, firstLoad = false, pageSize = 20) {
        if (firstLoad || query) {
          if(query) {
            let filterOptions = this.options.filter(option => {
              return option[this.valueLabel].toLowerCase().includes(query.toLowerCase())
            })
            this.options = filterOptions
            return            
          }
          this.loading = true
          request({
            url: this.api,
            method: 'GET',
            params: {
              [this.paramsName]: query,
              // pageSize,
              // pageNum: 1,
            },
          })
            .then((res) => {
              this.loading = false
              this.options = res.data
              console.log(res.data, 'res.data.data')

              if (firstLoad) {
                this.initData = res.data
              }
            })
            .catch((err) => {
              this.loading = false
              if(typeof err === 'string' ) {
                err ? ElMessage.error(err) : null
              }
            })
        } else {
          this.options = this.initData
        }
      },
      getVal(item: any) {
        // 处理el-option value属性值为number数据类型时导致的BUG
        let val = typeof item == 'number' ? item.toString() : item
        return val        
      }
    },
    mounted() {
      this.initSelect()
    }
  })
</script>
<style lang="scss" scoped>
  :deep(.el-select) {
    .el-select__tags-text {
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
