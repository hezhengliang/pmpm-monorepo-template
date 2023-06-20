/*
 * @Date: 2022-11-26 14:35:49
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-06-20 20:23:19
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path';
import { buildPostPlugin } from './build/vite/plugins/buildPostPlugin'
function pathResolve(dir: string) {
  return resolve( process.cwd(), '.', dir);
}
function getAllPath(path){
return join(__dirname, path)
}
function loadPlugins(command, mode: string) {
  let plugins = [vue()]
  if(!['local', 'development'].includes(mode)){
    plugins.push(buildPostPlugin({
      mode,
      envConfPath: getAllPath('./env.yaml')
    }))
  }
  return plugins
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode } ) => {

  return {
    plugins: loadPlugins(command, mode),
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      port: 3000
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSiz: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      // __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        // '@vue/runtime-core',
      ],
    },
  }
})
