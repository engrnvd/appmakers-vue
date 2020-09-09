<template>
    <div class="apm-dynamic-dashboard d-flex flex-column">
        <apm-loader v-if="config.loading">
            <div class="loading"></div>
        </apm-loader>
        <b-tabs content-class="d-flex flex-column flex-grow-1" v-if="!config.loading" v-model="activeTab">
            <b-tab v-for="tab in config.data.tabs" :key="tab.title" lazy>
                <template v-slot:title>
                    <div class="apm-dashboard-tab-title">
                        <div class="title">
                            <apm-editable
                                type="text"
                                field="title"
                                v-model="tab.title"
                                :required="true"
                                @input="save()"/>
                        </div>
                        <b-dropdown no-caret variant="link" toggle-class="apm-dashboard-tab-btn"
                                    v-if="tab.closedWidgets.length">
                            <template #button-content>
                                <span apm-tooltip="Add Widget"><i class="mdi mdi-plus"></i></span>
                            </template>
                            <b-dropdown-item
                                v-for="widget in tab.closedWidgets"
                                :key="widget.id"
                                @click="openWidget(tab, widget)">
                                {{widget.title}}
                            </b-dropdown-item>
                        </b-dropdown>
                        <button class="btn btn-link apm-dashboard-tab-btn"
                                v-if="config.data.tabs.length > 1"
                                @click="removeTab(tab)"
                                apm-tooltip="Remove Tab">
                            <i class="mdi mdi-close"></i>
                        </button>
                    </div>
                </template>

                <grid-layout
                    :layout="tab.openWidgets"
                    :col-num="config.data.layoutOptions.colNum"
                    :row-height="config.data.layoutOptions.rowHeight"
                    :is-draggable="config.data.layoutOptions.isDraggable"
                    :is-resizable="config.data.layoutOptions.isResizable"
                    :auto-size="config.data.layoutOptions.autoSize"
                    :margin="config.data.layoutOptions.margin"
                    :vertical-compact="config.data.layoutOptions.verticalCompact"
                    :use-css-transforms="config.data.layoutOptions.useCssTransforms"
                    :prevent-collision="config.data.layoutOptions.preventCollision"
                    :responsive="config.data.layoutOptions.responsive"
                    class="d-flex flex-column flex-grow-1"
                >
                    <grid-item
                        v-for="(widget, index) in tab.openWidgets"
                        :x="widget.x"
                        :y="widget.y"
                        :w="widget.w"
                        :h="widget.h"
                        :i="widget.i"
                        :key="index"
                        @resized="save"
                        @moved="save"
                        drag-allow-from=".apm-widget-title"
                        class="d-flex flex-column"
                    >
                        <apm-dashboard-widget :widget="widget" :tab="tab" @widget-closed="save" @widget-updated="save">
                            <template #header v-if="widget.header_component">
                                <component :is="widget.header_component" :widget-data="{widget: widget, tab: tab}"></component>
                            </template>

                            <template #actions v-if="widget.actions_component">
                                <component :is="widget.actions_component" :widget-data="{widget: widget, tab: tab}"></component>
                            </template>

                            <component :is="widget.component" :widget-data="{widget: widget, tab: tab}"></component>
                        </apm-dashboard-widget>
                    </grid-item>
                </grid-layout>
            </b-tab>
            <template #tabs-end>
                <b-nav-item class="add-tab-btn" href="#" @click="addTab()" apm-tooltip="New tab">
                    <i class="mdi mdi-plus"></i>
                </b-nav-item>
                <i class="mdi mdi-loading mdi-spin progress-indicator" v-if="saveRequest.loading"></i>
            </template>
        </b-tabs>
    </div>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import {Resource} from "../services/http-resource-service";

    export default {
        name: "ApmDynamicDashboard",
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        props: {
            configUrl: String
        },
        data() {
            return {
                activeTab: 0,
                config: new Resource(this.configUrl),
                saveRequest: new Resource(this.configUrl, 'post')
            }
        },
        methods: {
            load() {
                this.config.send()
            },
            save() {
                this.saveRequest.send({
                    data: {
                        config: this.config.data
                    }
                })
            },
            addTab() {
                let tab = {
                    title: 'Dashboard-' + (this.config.data.tabs.length + 1),
                    _title: 'Dashboard-' + (this.config.data.tabs.length + 1),
                    enableEditTitle: true,
                    openWidgets: [],
                    closedWidgets: [],
                };
                const widgetTypes = ['openWidgets', 'closedWidgets'];
                for (let type of widgetTypes) {
                    let widgets = this.config.data.tabs[0][type];
                    console.log('type', type);
                    console.log('widgets', widgets);
                    for (let i = 0; i < widgets.length; i++) {
                        let widget = {...widgets[i]};
                        tab.closedWidgets.push(widget);
                    }
                }
                this.config.data.tabs.push(tab);
                this.openTab(this.config.data.tabs.length - 1);
                this.save();
            },
            removeTab(tab) {
                this.config.data.tabs.splice(this.config.data.tabs.indexOf(tab), 1);
                this.save();
            },
            openTab(index) {
                setTimeout(() => this.activeTab = index, 100);
            },
            openWidget(tab, widget) {
                tab.openWidgets.unshift(widget);
                tab.closedWidgets.splice(tab.closedWidgets.indexOf(widget), 1);
                this.save();
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style lang="scss">
    .apm-dynamic-dashboard {
        position: relative;
    }

    .apm-dashboard-tab-title {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .apm-dashboard-tab-btn {
        padding: 0 !important;
        margin-left: 0.25rem;
    }

    .apm-dashboard-tab-btn::after {
        display: none;
    }

    .apm-dynamic-dashboard .progress-indicator {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    .vue-resizable-handle {
        z-index: 999;
    }

    .vue-grid-item {
        overflow: auto;
    }
</style>
