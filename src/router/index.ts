import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
	{
	  path: '/',
	  redirect: '/home'
	},
	{
	path: '/home',
	name: 'Home',
	component: HomePage
	},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
