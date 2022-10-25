import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import commonRoutes from '@/router/common'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: 'index页面',
      name: 'Index',
      icon: undefined,
      // 是否支持缓存
      keepAlive: true,
      link: null,
      // 是否隐藏当前路由
      hiddenInMenu: true,
      activeMenu: undefined,
      hideChildrenInMenu: true,
      // 当前模块是否需要跳过验证权限，true: 不需要，false： 需要
      commonRoute: true,
    },
  },
]
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫,  当前并未进行拦截，后根据项目场景自定义拦截
router.beforeEach((to, form, next) => {
  next()
  // to.meta.matched?.some(v => {
  //   if (v.name === from.name) {
  //     v.path = from.path
  //     return true
  //   } else {
  //     return false
  //   }
  // })
  //   // to表示将要访问的路径
  //   // form表示从那个页面跳转而来
  //   // next表示允许跳转到指定位置
  //   if (to.path === '/login') return next()
  //   if (token) {
  //     return next()
  //   } else {
  //     return next('/login')
  //   }
})

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
export default router
