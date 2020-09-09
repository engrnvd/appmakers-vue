export const menuRoutes = [
    {
        path: '/components',
        component: () => import(/* webpackChunkName: "components" */ '../views/components/index'),
        children: [
            {
                path: 'apm-action-btn',
                component: () => import(/* webpackChunkName: "action-btn" */ '../views/components/ApmActionBtnExample')
            },
            {
                path: 'apm-actions-menu',
                component: () => import(/* webpackChunkName: "action-menu" */ '../views/components/ApmActionMenuExample')
            },
            {
                path: 'apm-confirm',
                component: () => import(/* webpackChunkName: "apm-confirm" */ '../views/components/ApmConfirmExample')
            },
        ]
    },
    {
        path: '/directives',
        component: () => import(/* webpackChunkName: "directives" */ '../views/directives/index'),
    },
];
