import { App } from 'vue'
import { createPinia } from 'pinia'
import devalue from '@nuxt/devalue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

export const painaInstall = (app: App) => {
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  devalue(pinia.state.value)
}
