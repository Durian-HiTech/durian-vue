import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import('../views/Travel.vue')
  },
  {
	path: '/login',
	name: 'Login',
	component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
   },
   {
	path: '/test',
	name: 'Test',
	component: () => import('../views/Test.vue')
	},
  {
  path: '/news/:id',
  name: 'NewsDetails',
  component: () => import('../views/NewsDetails.vue')
  },
  {
  path: '/notice/:id',
  name: 'NoticeDetails',
  component: () => import('../views/NoticeDetails.vue')
  },
  {
    path: '/question',
    name: 'Question_All',
    component: () => import('../views/QuestionAll.vue')
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: () => import('../views/Subscribe.vue')
  },
  {
    path: '/policy',
    name: 'PolicyAI',
    component: () => import('../views/PolicyAI.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
