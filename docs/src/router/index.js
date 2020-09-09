import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes = [
    {path: '/home', component: Home},
    {
        path: '/components',
        component: () => import(/* webpackChunkName: "components" */ '../views/components/index'),
        children: [
            {
                path: 'action-btn',
                component: () => import(/* webpackChunkName: "action-btn" */ '../views/components/ApmActionBtnExample')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
