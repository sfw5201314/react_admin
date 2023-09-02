import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', //解决vite use--host to expose
    port: 8080, //配置端口
    open: true //配置默认打开浏览器
  },
  resolve: {
    // 配置路径别名
    alias: {
      // '@': resolve('src')
      '@': path.resolve(__dirname, './src')
    }
  },
  //全局引入
  css: {
    preprocessorOptions: {
      scss: {
        // /**如果引入多个文件，可以使用
        //  * '@import "@/assets/scss/globalVariable1.scss";
        //  * @import"@/assets/scss/globalVariable2.scss";'
        //  **/
        // additionalData: '@import "@/assets/style/globalVar.scss";'
      }
    }
  }
});
