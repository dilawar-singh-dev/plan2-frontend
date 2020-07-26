import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)
import router from './router'

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('authToken')) {
    next();
    return;
  }
  router.push({
    name: 'login'
  });
 };

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/tasks',
          name: 'tasks',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tasks/tasks-list.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/task/create',
          name: 'create-task',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tasks/create-task.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import(/* webpackChunkName: "demo" */ './views/Categories/categories-list.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/category/create',
          name: 'create-category',
          component: () => import(/* webpackChunkName: "demo" */ './views/Categories/create-category.vue'),
          beforeEnter: ifAuthenticated
        }
        
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
