import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vaccine from '../views/Vaccine.vue'
//import News from '../views/News.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vaccine',
    name: 'Vaccine',
    component: Vaccine
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
    path: '/question/all',
    name: 'Question_All',
    component: () => import('../views/QuestionAll.vue')
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/Info',
    name: 'Info',
    component: () => import('../views/Info.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
