import {flexHeight} from "./directives/flex-height";
import {autoFocus} from "./directives/autofocus";
import {topScrollBar, topScrollBarContent} from "./directives/top-scrollbar";

export const DirectiveRegistrar = {
    register(Vue) {
        Vue.directive('flex-height', flexHeight);
        Vue.directive('autofocus', autoFocus);
        Vue.directive('top-scrollbar', topScrollBar);
        Vue.directive('top-scrollbar-content', topScrollBarContent);
    }
};
