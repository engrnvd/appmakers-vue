import {ComponentRegistrar} from "./component-registrar";
import {DirectiveRegistrar} from "./directive-registrar";
import {FilterRegistrar} from "./filter-registrar";
import './utilities/apmFunctions';
import './styles/appmakers.scss';

export const AppMakersVue = {
    install(Vue, options) {
        ComponentRegistrar.register(Vue);
        DirectiveRegistrar.register(Vue);
        FilterRegistrar.register(Vue);
    }
};
