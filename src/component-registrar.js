import ApmActionBtn from "./components/ApmActionBtn";
import ApmActionsMenu from "./components/ApmActionsMenu";
import ApmCsvDownloader from "./components/ApmCsvDownloader";
import ApmDeleteBtn from "./components/ApmDeleteBtn";
import ApmDynamicDashboard from "./components/ApmDynamicDashboard";
import ApmDashboardWidget from "./components/ApmDashboardWidget";
import ApmEditable from "./components/ApmEditable";
import ApmFab from "./components/ApmFab";
import ApmFilter from "./components/ApmFilter";
import ApmForm from "./components/ApmForm";
import ApmFormElement from "./components/ApmFormElement";
import ApmLoader from "./components/ApmLoader";
import ApmLoadMoreBtn from "./components/ApmLoadMoreBtn";
import ApmPagination from "./components/ApmPagination";
import ApmPaginationInfo from "./components/ApmPaginationInfo";
import ApmSearch from "./components/ApmSearch";
import ApmStatusDot from "./components/ApmStatusDot";
import ApmSwitch from "./components/ApmSwitch";
import Switches from 'vue-switches'
import vSelect from 'vue-select';
import ApmRemoteSelect from "./components/ApmRemoteSelect";
import ApmSocialIcon from "./components/ApmSocialIcon";
import 'vue-select/dist/vue-select.css';
import ApmEmojis from "./components/ApmEmojis";
import ApmSignature from "./components/ApmSignature";
import ApmConfirm from "./components/ApmConfirm";
import ApmFileAttachment from "./components/ApmFileAttachment";

export const ComponentRegistrar = {
    components: {
        ApmActionBtn,
        ApmActionsMenu,
        ApmCsvDownloader,
        ApmDeleteBtn,
        ApmDynamicDashboard,
        ApmDashboardWidget,
        ApmEditable,
        ApmFab,
        ApmFilter,
        ApmForm,
        ApmFormElement,
        ApmLoader,
        ApmLoadMoreBtn,
        ApmPagination,
        ApmPaginationInfo,
        ApmSearch,
        ApmSocialIcon,
        ApmStatusDot,
        ApmSwitch,
        Switches,
        ApmRemoteSelect,
        vSelect,
        ApmEmojis,
        ApmSignature,
        ApmConfirm,
        ApmFileAttachment,
    }, register(Vue) {
        Object.keys(this.components).forEach(component => Vue.component(component, this.components[component]));
    }
};
