import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Books from '../views/Books.vue'
import Members from '../views/Members.vue'
import CheckMember from '../views/CheckMember.vue'
import Search from '../views/Search.vue'
import Table from '../views/Table.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
    {
      path: '/check-member',
      name: 'check-member',
      component: CheckMember
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})

export default router
