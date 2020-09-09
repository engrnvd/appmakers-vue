import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {AppMakersVue} from "appmakers-vue";

Vue.use(AppMakersVue);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
