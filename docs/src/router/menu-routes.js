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
        ]
    },
    {
        path: '/directives',
        component: () => import(/* webpackChunkName: "directives" */ '../views/directives/index'),
    },
];
