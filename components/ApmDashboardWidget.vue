<template>
    <b-card
        class="apm-dashboard-widget flex-grow-1 d-flex flex-column overflow-auto"
        :header-bg-variant="widget.color"
        :header-class="headerTextColor"
        body-class="apm-dashboard-widget-card-body flex-grow-1 d-flex flex-column overflow-auto"
        header-tag="header">
        <template #header>
            <div class="apm-widget-header d-flex">
                <div class="apm-widget-title">
                    <slot name="header"><h4>{{widget.title}}</h4></slot>
                </div>
                <div class="apm-widget-actions">
                    <slot name="actions"></slot>
                    <b-nav-item-dropdown
                        class="apm-widget-action"
                        no-caret
                        dropleft
                        :toggle-class="'apm-widget-action-icon ' + headerTextColor">
                        <template #button-content>
                            <span apm-tooltip="Widget Theme" tooltip-placement="left">
                            <i class="mdi mdi-format-color-fill"></i>
                                </span>
                        </template>
                        <b-dropdown-form>
                            <span
                                class="widget-color"
                                v-for="(color, index) in colors"
                                :key="index"
                                :class="['bg-' + color, color === widget.color ? 'active' : '']"
                                @click="changeColor(color)"
                            ></span>
                        </b-dropdown-form>
                    </b-nav-item-dropdown>
                    <a href="#" :class="'apm-widget-action-icon ' + headerTextColor" @click="close()">
                        <i class="mdi mdi-close"></i>
                    </a>
                </div>
            </div>
        </template>

        <slot></slot>
    </b-card>
</template>

<script>
    export default {
        name: "ApmDashboardWidget",
        props: {
            widget: Object,
            tab: Object,
        },
        data() {
            return {
                colors: ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'light', 'dark']
            }
        },
        computed: {
            headerTextColor() {
                return ['light', 'warning'].includes(this.widget.color) ? 'text-dark' : 'text-light';
            }
        },
        methods: {
            close() {
                this.tab.openWidgets.splice(this.tab.openWidgets.indexOf(this.widget), 1);
                this.tab.closedWidgets.push(this.widget);
                this.$emit('widget-closed', this.widget);
            },
            changeColor(color) {
                this.widget.color = color;
                this.$emit('widget-updated', this.widget);
            }
        }
    }
</script>

<style scoped lang="scss">
    .card-header {
        padding: 0.6rem 1rem 0.6rem 1rem;
        border-bottom: 1px solid #eee;
        line-height: 1;

        h1, h2, h3, h4, h5, h6 {
            margin: 0;
        }
    }

    .apm-widget-header {
        font-size: 1.5rem;
    }

    .apm-widget-title {
        flex-grow: 1;
    }

    .apm-widget-actions {
        flex-grow: 0;
        display: flex;
    }

    .nav-item {
        list-style: none;
    }

    .widget-color {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .widget-color.active {
        border-width: 2px;
        cursor: default;
    }

</style>
<style>
    .vue-grid-item {
        overflow: auto;
    }

    .apm-dashboard-widget .card-header {
        padding: 0.6rem 1rem 0.4rem 1rem;
    }

    .apm-dashboard-widget .card-body {
        padding: 0;
    }


    .apm-widget-actions .nav-item {
        padding-top: 2px;
    }

    .apm-widget-action-icon {
        padding: 0 !important;
        border-radius: 0.1rem;
        margin-left: 0.5rem;
        cursor: pointer;
        display: inline-block;
    }

    .apm-widget-action-icon.text-light:active, .apm-widget-action-icon.text-light:hover, .apm-widget-action-icon.text-light:focus {
        color: #fff !important;
    }

</style>
