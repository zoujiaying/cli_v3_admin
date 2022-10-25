import 'vue-router'

interface RouteMatched {
  title?: string
  path?: string
  icon?: string
  name?: string
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /** 标题 */
    title?: string
    /** 是否需要缓存 */
    keepAlive?: boolean
    /** 当前路由所在的完整路径 */
    fullPath?: string
    /** 菜单图标 */
    icon?: string
    /** 隐藏子菜单*/
    hideChildrenInMenu?: boolean
    /** 隐藏自己和子菜单 */
    hiddenInMenu?: boolean
    /** 设置当前路由高亮的菜单项，值为route fullPath或route name,一般用于详情页 */
    activeMenu?: string
    /** 当前路径 */
    matched?: RouteMatched[]
  }
}
