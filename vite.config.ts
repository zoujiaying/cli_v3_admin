import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import WindiCSS from 'vite-plugin-windicss'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL, VITE_USER_NODE_ENV } = loadEnv(mode, CWD)

  const defaultConfig: UserConfig = {
    base: VITE_BASE_URL,
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "@/assets/styles/element.scss" as *; @use "@/assets/styles/variables.scss" as *;`,
    //     },
    //   },
    // },
    plugins: [
      vue({}),
      VueSetupExtend(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: true,
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: true,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      ElementPlus({
        useSource: true,
      }),
      WindiCSS(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: '@t',
          replacement: resolve(__dirname, 'types'),
        },
      ],
    },
    build: {
      // outDir: `./dist_${VITE_USER_NODE_ENV}`, //指定输出路径（相对于 项目根目录).
      outDir: `./dist`, //指定输出路径（相对于 项目根目录).
      // cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: mode === 'sit', // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      // target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      // chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      // assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: mode === 'sit' ? false : 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true, // 生产环境去除debugger
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8989, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      force: true,

      // 设置代理
      proxy: {
        // '/api': {
        //   target: '',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, ''),
        // },
      },
    },
  }

  const devConfig: UserConfig = {
    plugins: [
      vue({}),
      VueSetupExtend(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: true,
        imports: ['vue', 'vue-router'],
      }),
      Components({
        dts: true,
      }),
      WindiCSS(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }

  if (command === 'serve') {
    return {
      ...defaultConfig,
      ...devConfig,
    }
  } else {
    return defaultConfig
  }
}
