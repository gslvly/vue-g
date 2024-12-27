import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    Vue({
      "template": {
        "compilerOptions": {
          "isCustomElement": (tag) =>{
            console.log(tag)
            if(tag.startsWith('g-')) return true
          }
        }
      }
    }),
  ],
});
