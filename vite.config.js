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
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@headlessui/vue',
      '@hennge/vue3-pagination',
      '@kyvg/vue3-notification',
      '@sipec/vue3-tags-input',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/starter-kit',
      '@tiptap/vue-3',
      '@tiptap/core',
      '@vueuse/core',
      'chart.js',
      'mitt',
      'prosemirror-state',
    ],
  },
})
