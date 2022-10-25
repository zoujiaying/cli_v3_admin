import request from '@/utils/request'
import download from 'downloadjs'
import { ElMessage } from 'element-plus'
import { Ref } from 'vue'
interface ExportTable {
  exportLoading: Ref<boolean>
  exportTable: (apiUrl: string, params?: ObjectType) => void
}
export default function (): ExportTable {
  const exportLoading = ref(false)
  const exportTable = (apiUrl: string, params?: ObjectType) => {
    exportLoading.value = true
    return new Promise((resolve, reject) => {
      let fileName = ''
      request({
        url: apiUrl,
        method: 'GET',
        params,
      })
        .then(res => {
          fileName = res.data
          return request({
            url: `/gift/quantity/fill/importExcel/download`,
            method: 'GET',
            params: {
              fileName,
            },
            responseType: 'blob',
          })
        })
        .then(res => {
          exportLoading.value = false
          download(new Blob([res as any]), fileName)
          ElMessage.success(`已成功下载 ${fileName}`)
          resolve(fileName)
        })
        .catch(err => {
          exportLoading.value = false
          ElMessage.error(err)
          reject(err)
        })
    })
  }

  return {
    exportLoading,
    exportTable,
  }
}
