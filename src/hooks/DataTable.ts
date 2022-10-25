import { computed, ComputedRef, reactive, Ref, ref, shallowReactive } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { useSettingsStore } from '@/store/settings'
import { pinia } from '@/store/plugins'
import _ from 'lodash'
import { formatDateTime } from '@/utils/constTypes'

/**
 * @desc: 数据类型
 * @name: sww
 * @date: 2022-02-10
 */
export type PageDataListParams = {
  api?: (params: any) => Promise<any>
  loading: boolean // 是否正在加载
  init: boolean // 是否已初始化
  total: number // 数据总条数
  page: number // 当前页码
  pageSize: number // 每页展示数量
  params?: any
}

type PageDataListOptions = {
  callback?: (res: any) => any
  lastCallback?: (res: any) => void
  clearSelect?: boolean
}

interface TableConfig {
  stripe?: boolean
  border?: boolean
  size?: 'small' | 'large'
}

interface UserDataTable<T> {
  dataList: T[]
  pageConfig: PageDataListParams
  initData: (api: any, params?: any, opts?: PageDataListOptions) => void
  loadData: (opts?: PageDataListOptions) => void
  selectRows: Ref<any[]>
  tableConfig: TableConfig
  tableSelect: (rows: Array<any>) => void
  setIndex: (index: number) => number
  columnWidth: ComputedRef<(smallWidth: number, defaultWidth: number) => number>
  tableRef: any
  rowKey: Ref<string>
}
export default function <T>(): UserDataTable<T> {
  const settingStore = useSettingsStore(pinia)
  const dataList = shallowReactive([]) as Array<any>

  const selectRows = ref<Array<any>>([])

  const tableRef = ref<InstanceType<typeof ElTable>>()

  const rowKey = ref('')

  const tableConfig = reactive<TableConfig>({
    stripe: true,
    border: true,
    size: 'small',
  })

  const tableSelect = (rows: Array<any>) => {
    selectRows.value = rows
  }

  const pageConfig = reactive<PageDataListParams>({
    api: undefined,
    loading: false, // 是否正在加载
    init: false, // 是否已初始化
    total: 0, // 数据总条数
    page: 1, // 当前页码
    pageSize: 12, // 每页展示数量
    params: {},
  })

  const initData = (api: any, params?: any, opts?: PageDataListOptions) => {
    pageConfig.api = api
    pageConfig.loading = false
    pageConfig.init = false
    pageConfig.params = params
    loadData(opts)
  }

  const loadData = (opts: PageDataListOptions = {}) => {
    if (pageConfig.loading) return
    if (!pageConfig.api) return
    pageConfig.loading = true
    if (opts.clearSelect) {
      tableRef.value?.clearSelection()
      selectRows.value = []
    }
    pageConfig
      .api({
        pageNo: pageConfig.page,
        pageSize: pageConfig.pageSize,
        ...pageConfig.params,
      })
      .then((res: any) => {
        if (opts.callback && typeof opts.callback === 'function') {
          res = opts.callback(res)
        }
        res.data.list.forEach(item => {
          if (item.createTime) {
            item.createTime = formatDateTime(item.createTime)
          }
          if (item.startTime) {
            item.startTime = formatDateTime(item.startTime)
          }
          if (item.endTime) {
            item.endTime = formatDateTime(item.endTime)
          }
          if (item.updateTime) {
            item.updateTime = formatDateTime(item.updateTime)
          }
        })
        dataList.length = 0
        if (rowKey.value) {
          nextTick().then(() => {
            dataList.push(..._.unionBy(selectRows.value, res.data.list, rowKey.value))
          })
        } else {
          nextTick().then(() => {
            dataList.push(...res.data.list)
          })
        }

        pageConfig.init = true
        pageConfig.total = res.data.totalCount

        pageConfig.loading = false
        nextTick().then(() => {
          selectRows.value.forEach(row => {
            tableRef.value?.toggleRowSelection(row, true)
          })
        })
      })
      .catch((err: string) => {
        console.log(err, 'err')
        pageConfig.init = true
        pageConfig.loading = false
        dataList.length = 0
        if (typeof err === 'string') {
          err ? ElMessage.error(err) : null
        }
      })
  }

  const setIndex = index => {
    return (pageConfig.page - 1) * pageConfig.pageSize + index + 1
  }

  const columnWidth = computed(() => {
    return (smallWidth, defaultWidth) => {
      if (settingStore.themeSize === 'small') {
        return smallWidth
      } else {
        return defaultWidth
      }
    }
  })

  return {
    dataList,
    selectRows,
    tableConfig,
    pageConfig,
    initData,
    loadData,
    tableSelect,
    setIndex,
    columnWidth,
    tableRef,
    rowKey,
  }
}
