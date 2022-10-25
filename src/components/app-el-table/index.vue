<template>
  <div class="table-content">
    <el-table
      :data="tableData"
      ref="multipleTableRef"
      v-loading="loading"
      max-height="300px"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '10px 0' }"
      :header-cell-style="{ background: '#fafafa' }"
      style="border: 1px solid #ebeef5"
      fix
      size="small"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选 -->
      <el-table-column v-if="selectionIsNeed" type="selection" width="55" />
      <el-table-column
        v-if="serialNumberNeed"
        type="index"
        label="序号"
        width="50"
        :align="tableLocation"
      />
      <!-- 表头 -->
      <el-table-column
        v-if="columns"
        v-for="column in columns"
        :align="tableLocation"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      >
        <template v-if="column.prop == 'type'">
          <span>赠品报量</span>
        </template>
        <template v-if="column.prop == 'updateTime'" #default="scope">
          <span>{{ isSafari() ? replaceTime(scope.row.updateTime) : scope.row.updateTime }}</span>
        </template>
        <template v-if="column.prop == 'createTime'" #default="scope">
          {{ isSafari() ? replaceTime(scope.row.createTime) : scope.row.createTime }}
        </template>
        <template v-if="column.prop == 'endTime'" #default="scope">
          {{ isSafari() ? replaceTime(scope.row.endTime) : scope.row.endTime }}
        </template>
        <template v-if="column.prop == 'startTime'" #default="scope">
          {{ isSafari() ? replaceTime(scope.row.startTime) : scope.row.startTime }}
        </template>
        <template v-if="column.prop == 'status'" #default="scope">
          <span v-if="scope.row.status == '1'">草稿</span>
          <span v-else-if="scope.row.status == '2'">报量中</span>
          <span v-else-if="scope.row.status == '3'">审核中</span>
          <span v-else-if="scope.row.status == '4'">已驳回</span>
          <span v-else-if="scope.row.status == '7'">采购中</span>
          <span v-else-if="scope.row.status == '8'">已完成</span>
        </template>
        <template v-if="column.prop == 'isLimit'" #default="scope">
          <span v-if="scope.row.isLimit == '1'">是</span>
          <span v-else>否</span>
        </template>
        <template v-if="column.prop == 'goodType'" #default="scope">
          <span>{{ scope.row.goodType == 1 ? '新品' : '非新品' }}</span>
        </template>
        <template v-if="column.prop == 'storeNature'" #default="scope">
          <span>{{ scope.row.storeNature == 1 ? '自营' : '加盟' }}</span>
        </template>
        <template v-if="column.prop == 'goodPics'" #default="scope">
          <div
            v-if="
              scope.row.goodPics &&
              getPics(scope.row.goodPics).length > 0 &&
              Array.isArray(getPics(scope.row.goodPics))
            "
          >
            <el-image
              v-for="(item, index) in getPics(scope.row.goodPics)"
              :key="index"
              :preview-teleported="true"
              style="width: 70px; height: 70px; margin-right: 10px"
              :src="item"
              :preview-src-list="[item]"
              fit="cover"
            />
          </div>
          <!-- <div v-else>
            <el-image :preview-teleported="true"
                      style="width: 70px; height: 70px"
                      :src="getPics(scope.row.goodPics)"
                      :preview-src-list="[getPics(scope.row.goodPics)]"
                      fit="cover" />
          </div> -->
        </template>
        <template v-if="column.prop == 'giftInfoList'" #default="scope">
          <div style="display: flex;">
            <div v-for="item in scope.row.giftInfoList" :key="item.id">
              <el-popover placement="bottom" :width="420" trigger="hover">
                <template #reference>
                  <span
                    style="
                      cursor: pointer;
                      color: #1890ff;
                      margin-right: 20px;
                    "
                    >{{ setGoodName(item.goodName) }}</span
                  >
                </template>
                <div slot="content">
                  <el-form
                    label-position="right"
                    label-width="120px"
                    :model="item"
                    style="width: 400px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="赠品类型：">
                          <span>{{ item.goodType == 1 ? '新品' : '非新品' }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="商品名称：">
                          <span>{{ item.goodName }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="赠品规格：">
                          <span>{{ item.goodSpec }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="商品单位：">
                          <span>{{ item.goodUnit }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="每箱数量：">
                          <span>{{ item.goodNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="商品编码：">
                          <span>{{ item.goodCode }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="是否限量赠品：">
                          <span>{{ item.isLimit == 1 ? '是' : '否' }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="商品图片：">
                          <div
                            v-if="
                              item.goodPics &&
                              getPics(item.goodPics).length > 0 &&
                              Array.isArray(getPics(item.goodPics))
                            "
                          >
                            <el-image
                              v-for="(item, index) in getPics(item.goodPics)"
                              :key="index"
                              :preview-teleported="true"
                              style="width: 70px; height: 70px; margin-right: 10px"
                              :src="item"
                              :preview-src-list="[item]"
                              fit="cover"
                            />
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-popover>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        v-if="optionIsNeed"
        :align="operationLocation"
        fixed="right"
        label="操作"
        :min-width="optionWidth"
      >
        <template #default="scope">
          <slot name="button" :scope="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isToggleSelection" style="margin-top: 20px; float: left">
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">全选</el-button> -->
      <el-button @click="toggleSelection()">全选</el-button>
      <el-button @click="toggleInverseAllSelection">反选</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTable } from 'element-plus'
import { formatDateTime } from '@/utils/constTypes'
import { isSafari } from '@/utils/isSafari'

export default defineComponent({
  name: 'AppElTable',
  props: {
    columns: {
      type: Array,
    },
    serialNumberNeed: {
      type: Boolean,
      default: true,
    },
    selectionIsNeed: {
      type: Boolean,
      default: false,
    },
    optionIsNeed: {
      type: Boolean,
      default: true,
    },
    editIsNeed: {
      type: Boolean,
      default: true,
    },
    deleteIsNeed: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    optionWidth: {
      type: Number,
      default: 120,
    },
    operationLocation: {
      type: String,
      default: 'center',
    },
    tableLocation: {
      type: String,
      default: 'center',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    isToggleSelection: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const multipleSelection = ref<User[]>([])
    const handleSelectionChange = val => {
      multipleSelection.value = val
      emit('handleChange', multipleSelection.value)
    }
    const getPics = row => {
      return row.split(',')
    }
    // const getFormatDateTime = row => {
    //   return formatDateTime(row)
    // }

    interface User {
      date: string
      name: string
      address: string
    }
    const multipleTableRef = ref<InstanceType<typeof ElTable>>()
    // const toggleSelection = (rows?: User[]) => {
    //   if (rows) {
    //     rows.forEach(row => {
    //       // TODO: improvement typing when refactor table
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-expect-error
    //       multipleTableRef.value!.toggleRowSelection(row, undefined)
    //     })
    //   } else {
    //     multipleTableRef.value!.clearSelection()
    //   }
    // }
    /**
     * 全选
     */
    const toggleSelection = () => {
      multipleTableRef.value!.toggleAllSelection()
    }
    /**
     * 反选
     */
    const toggleInverseAllSelection = () => {
      props.tableData.forEach(item => {
        multipleTableRef.value!.toggleRowSelection(item)
      })
    }
    const replaceTime = (row: any) => {
      let time = ''
      time = row.replaceAll('-', '/')
      return time
    }

    const setGoodName = (name: string | number) => {
      if (name?.length >= 6) {
        return name.substr(0, 6) + '...'
      }
      return name
    }
    return {
      handleSelectionChange,
      getPics,
      toggleSelection,
      toggleInverseAllSelection,
      formatDateTime,
      multipleTableRef,
      isSafari,
      replaceTime,
      setGoodName,
    }
  },
})
</script>

<style lang="scss" scoped>
.table-content {
  width: 100%;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 42px;
}
</style>
