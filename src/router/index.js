import { createRouter,createWebHistory } from "vue-router";
import login from "../views/Login.vue"
import register from "../views/Register.vue"
import manageUser from "@/views/ManageUser";
import manageActivity from "@/views/ManageActivity";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/manageUser',
      name: 'manageUser',
      component: manageUser
    },
    {
      path:'/manageActivity',
      name:'/manageActivity',
      component:manageActivity
    }
  ]
})

export default router