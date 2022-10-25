import { createApp } from 'vue'
import App from './App.vue'
// 对后端返回的用户权限进行路由处理，就这样引入@/router，否则@/router/routes
// import router from '@/router'
import router from '@/router/routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ELIcons from '@element-plus/icons-vue'

import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'normalize.css'
import 'virtual:svg-icons-register'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App)

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

function useTable(app: App) {
	app.use(VXETable)
}

for (const name in ELIcons) {
	app.component(name, (ELIcons as any)[name])
}
if (import.meta.env.MODE === 'development') {
	app.use(ElementPlus)
}
app.use(useTable)
app.use(router)
app.mount('#app')
