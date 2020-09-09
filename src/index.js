import {ComponentRegistrar} from "./component-registrar";
import {DirectiveRegistrar} from "./directive-registrar";
import {FilterRegistrar} from "./filter-registrar";
import './utilities/apmFunctions';
import './styles/appmakers.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from "bootstrap-vue";

export const AppMakersVue = {
    install(Vue, options) {
        Vue.use(BootstrapVue);
        ComponentRegistrar.register(Vue);
        DirectiveRegistrar.register(Vue);
        FilterRegistrar.register(Vue);
    }
};
