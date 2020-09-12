export const menuRoutes = [
    {
        path: '/components',
        component: () => import(/* webpackChunkName: "components" */ '../views/components/index'),
        children: [
            {
                path: 'apm-action-btn',
                component: () => import(/* webpackChunkName: "apm-action-btn" */ '../views/components/ApmActionBtnExample')
            },
            {
                path: 'apm-actions-menu',
                component: () => import(/* webpackChunkName: "apm-actions-menu" */ '../views/components/ApmActionsMenuExample')
            },
            {
                path: 'apm-confirm',
                component: () => import(/* webpackChunkName: "apm-confirm" */ '../views/components/ApmConfirmExample')
            },
            {
                path: 'apm-copy-to-clipboard',
                component: () => import(/* webpackChunkName: "apm-copy-to-clipboard" */ '../views/components/ApmCopyToClipboardExample')
            },
            {
                path: 'apm-csv-downloader',
                component: () => import(/* webpackChunkName: "apm-csv-downloader" */ '../views/components/ApmCsvDownloaderExample')
            },
            {
                path: 'apm-dashboard-widget',
                component: () => import(/* webpackChunkName: "apm-dashboard-widget" */ '../views/components/ApmDashboardWidgetExample')
            },
            {
                path: 'apm-delete-btn',
                component: () => import(/* webpackChunkName: "apm-delete-btn" */ '../views/components/ApmDeleteBtnExample')
            },
            {
                path: 'apm-dynamic-dashboard',
                component: () => import(/* webpackChunkName: "apm-dynamic-dashboard" */ '../views/components/ApmDynamicDashboardExample')
            },
            {
                path: 'apm-editable',
                component: () => import(/* webpackChunkName: "apm-editable" */ '../views/components/ApmEditableExample')
            },
            {
                path: 'apm-emojis',
                component: () => import(/* webpackChunkName: "apm-emojis" */ '../views/components/ApmEmojisExample')
            },
            {
                path: 'apm-fab',
                component: () => import(/* webpackChunkName: "apm-fab" */ '../views/components/ApmFabExample')
            },
            {
                path: 'apm-file-attachment',
                component: () => import(/* webpackChunkName: "apm-file-attachment" */ '../views/components/ApmFileAttachmentExample')
            },
            {
                path: 'apm-filter',
                component: () => import(/* webpackChunkName: "apm-filter" */ '../views/components/ApmFilterExample')
            },
            {
                path: 'apm-form',
                component: () => import(/* webpackChunkName: "apm-form" */ '../views/components/ApmFormExample')
            },
            {
                path: 'apm-form-element',
                component: () => import(/* webpackChunkName: "apm-form-element" */ '../views/components/ApmFormElementExample')
            },
            {
                path: 'apm-load-more-btn',
                component: () => import(/* webpackChunkName: "apm-load-more-btn" */ '../views/components/ApmLoadMoreBtnExample')
            },
            {
                path: 'apm-loader',
                component: () => import(/* webpackChunkName: "apm-loader" */ '../views/components/ApmLoaderExample')
            },
            {
                path: 'apm-pagination',
                component: () => import(/* webpackChunkName: "apm-pagination" */ '../views/components/ApmPaginationExample')
            },
            {
                path: 'apm-pagination-info',
                component: () => import(/* webpackChunkName: "apm-pagination-info" */ '../views/components/ApmPaginationInfoExample')
            },
            {
                path: 'apm-remote-select',
                component: () => import(/* webpackChunkName: "apm-remote-select" */ '../views/components/ApmRemoteSelectExample')
            },
            {
                path: 'apm-search',
                component: () => import(/* webpackChunkName: "apm-search" */ '../views/components/ApmSearchExample')
            },
            {
                path: 'apm-signature',
                component: () => import(/* webpackChunkName: "apm-signature" */ '../views/components/ApmSignatureExample')
            },
            {
                path: 'apm-social-icon',
                component: () => import(/* webpackChunkName: "apm-social-icon" */ '../views/components/ApmSocialIconExample')
            },
            {
                path: 'apm-status-dot',
                component: () => import(/* webpackChunkName: "apm-status-dot" */ '../views/components/ApmStatusDotExample')
            },
            {
                path: 'apm-switch',
                component: () => import(/* webpackChunkName: "apm-switch" */ '../views/components/ApmSwitchExample')
            },
        ]
    },
    {
        path: '/directives',
        component: () => import(/* webpackChunkName: "directives" */ '../views/directives/index'),
        children: [
            {
                path: 'autofocus',
                component: () => import(/* webpackChunkName: "autofocus" */ '../views/directives/autofocusExample')
            },
            {
                path: 'flex-height',
                component: () => import(/* webpackChunkName: "flex-height" */ '../views/directives/flex-heightExample')
            },
            {
                path: 'top-scrollbar',
                component: () => import(/* webpackChunkName: "top-scrollbar" */ '../views/directives/top-scrollbarExample')
            },
        ]
    },
    {
        path: '/filters',
        component: () => import(/* webpackChunkName: "filters" */ '../views/filters/index'),
        children: [
            {
                path: 'byte-conversion',
                component: () => import(/* webpackChunkName: "byte-conversion" */ '../views/filters/byteConversionExample')
            },
            {
                path: 'currency',
                component: () => import(/* webpackChunkName: "currency" */ '../views/filters/currencyExample')
            },
            {
                path: 'duration',
                component: () => import(/* webpackChunkName: "duration" */ '../views/filters/durationExample')
            },
            {
                path: 'group-by',
                component: () => import(/* webpackChunkName: "group-by" */ '../views/filters/group-byExample')
            },
            {
                path: 'month-filter',
                component: () => import(/* webpackChunkName: "month-filter" */ '../views/filters/monthFilterExample')
            },
            {
                path: 'phone-number',
                component: () => import(/* webpackChunkName: "phone-number" */ '../views/filters/phoneNumberExample')
            },
            {
                path: 'relative-date',
                component: () => import(/* webpackChunkName: "relative-date" */ '../views/filters/relativeDateExample')
            },
            {
                path: 'search',
                component: () => import(/* webpackChunkName: "search" */ '../views/filters/searchExample')
            },
            {
                path: 'str-to-mysql-date',
                component: () => import(/* webpackChunkName: "str-to-mysql-date" */ '../views/filters/str-to-mysql-dateExample')
            },
            {
                path: 'time-ago',
                component: () => import(/* webpackChunkName: "time-ago" */ '../views/filters/timeAgoExample')
            },
            {
                path: 'truncate',
                component: () => import(/* webpackChunkName: "truncate" */ '../views/filters/truncateExample')
            },
            {
                path: 'us-phone',
                component: () => import(/* webpackChunkName: "us-phone" */ '../views/filters/usPhoneExample')
            },
            {
                path: 'words',
                component: () => import(/* webpackChunkName: "words" */ '../views/filters/wordsExample')
            },
        ]
    },
    {
        path: '/services',
        component: () => import(/* webpackChunkName: "services" */ '../views/services/index'),
        children: [
            {
                path: 'browser-notification',
                component: () => import(/* webpackChunkName: "browser-notification" */ '../views/services/browser-notificationExample')
            },
            {
                path: 'emoji-service',
                component: () => import(/* webpackChunkName: "emoji-service" */ '../views/services/emoji-serviceExample')
            },
            {
                path: 'http-resource-service',
                component: () => import(/* webpackChunkName: "http-resource-service" */ '../views/services/http-resource-serviceExample')
            },
            {
                path: 'http-service',
                component: () => import(/* webpackChunkName: "http-service" */ '../views/services/http-serviceExample')
            },
        ]
    },
    {
        path: '/styles',
        component: () => import(/* webpackChunkName: "styles" */ '../views/styles/index'),
        children: [
            {
                path: 'apm-clickable',
                component: () => import(/* webpackChunkName: "apm-clickable" */ '../views/styles/apm-clickableExample')
            },
            {
                path: 'apm-count',
                component: () => import(/* webpackChunkName: "apm-count" */ '../views/styles/apm-countExample')
            },
            {
                path: 'appmakers',
                component: () => import(/* webpackChunkName: "appmakers" */ '../views/styles/appmakersExample')
            },
            {
                path: 'scrollbar',
                component: () => import(/* webpackChunkName: "scrollbar" */ '../views/styles/scrollbarExample')
            },
            {
                path: 'text-with-line',
                component: () => import(/* webpackChunkName: "text-with-line" */ '../views/styles/text-with-lineExample')
            },
            {
                path: 'tooltip',
                component: () => import(/* webpackChunkName: "tooltip" */ '../views/styles/tooltipExample')
            },
        ]
    },
    {
        path: '/utilities',
        component: () => import(/* webpackChunkName: "utilities" */ '../views/utilities/index'),
        children: [
            {
                path: 'apm-functions',
                component: () => import(/* webpackChunkName: "apm-functions" */ '../views/utilities/apmFunctionsExample')
            },
        ]
    },
];
