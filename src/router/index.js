/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../modules/overview/views/OverviewView.vue'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: OverviewView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
