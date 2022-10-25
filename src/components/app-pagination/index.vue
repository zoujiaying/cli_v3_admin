<template>
  <el-pagination v-model:currentPage="params.page"
                 v-model:page-size="params.pageSize"
                 :page-sizes="[10, 12, 20, 50, 100]"
                 background
                 small
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="params.total"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PageDataListParams } from '@/hooks/DataTable'

export default defineComponent({
  name: 'AppPagination',
  props: {
    config: {
      type: Object as PropType<PageDataListParams>,
      required: true,
    },
    load: {
      type: Function,
      required: true,
    },
  },
  emits: ['update:config'],
  computed: {
    params: {
      get(): PageDataListParams {
        return this.config
      },
      set(obj: PageDataListParams) {
        this.$emit('update:config', obj)
      },
    },
  },
  mounted() {},
  methods: {
    handleSizeChange() {
      this.load()
    },
    handleCurrentChange() {
      this.load()
    },
  },
})
</script>
