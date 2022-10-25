/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站标题 */
  readonly VITE_APP_TITLE: string
  /** 基础路径 */
  readonly VITE_BASE_URL: string
  /** API基础路径 */
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
