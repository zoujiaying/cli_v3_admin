import dataTable from './DataTable'
import exportTable from '@/hooks/ExportTable'
import checkAuth from '@/hooks/checkAuth'

export function useDataTable() {
  return dataTable()
}

export function useExportTable() {
  return exportTable()
}

export function useAuth(list: string[]) {
  return checkAuth(list)
}
