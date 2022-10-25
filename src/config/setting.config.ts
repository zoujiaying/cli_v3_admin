// 标题分隔符
export const titleSeparator = ' - '
// 标题是否反转
// 如果为false: "page - title"
// 如果为ture : "title - page"
export const titleReverse = true
// 缓存路由的最大数量
export const keepAliveMaxNum = 20
// 路由模式，可选值为 history 或 hash
export const routerMode: 'hash' | 'history' = 'hash'
// 不经过token校验的路由
export const routesWhiteList: string[] = [
    '/login',
    '/404',
    '/403',
    '/redirect',
    '/password',
    '/sso',
    '/ticket',
]
// 是否开启登录拦截
export const loginInterception = false
