/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../modules/overview/views/OverviewView.vue'
import DetailView from '../modules/detail/views/DetailView.vue'
import AnalyticsView from '../modules/analytics/views/AnalyticsView.vue'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: OverviewView,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: DetailView,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
