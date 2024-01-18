import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import Notifications from '@kyvg/vue3-notification'
// 分頁器
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
// chart.js
import Chart from 'chart.js/auto';

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
// 使用 .use 匯入 plugin
.use(router)
.use(Notifications)
.mount('#app')
