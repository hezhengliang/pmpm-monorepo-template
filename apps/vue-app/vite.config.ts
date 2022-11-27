import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
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
    brotliSize: false,
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
})
