import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
// unplugin-icon
import Icons from 'unplugin-icons/vite'
// 自動引入 icon
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 在 vite 中可解析所有 @ 開頭之路徑
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      dirs: [
        'src/components',
        'src/sections',
      ],
      resolvers: [
        IconsResolver({
          prefix: false,
          // 自動引入時只拿到哪些套件，此處使用 heroicons-outline
          enabledCollections: ['heroicons-outline'],
        }),
        HeadlessUiResolver()
      ]
    }),
    Icons()
  ],
})
