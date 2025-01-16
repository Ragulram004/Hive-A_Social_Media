import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  server:{
    port:3000,
    //Get rid of CORS error
    proxy:{
      "/api":{
        target:"https://hive-server-psi.vercel.app",
        changeOrigin:true,
        secure:false,
      }
    }
  }
})
