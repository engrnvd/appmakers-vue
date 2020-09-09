import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import {menuRoutes} from "@/router/menu-routes";

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    ...menuRoutes
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
