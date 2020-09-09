<template>
    <b-nav-item-dropdown dropleft no-caret toggle-class="p-0">
        <template v-slot:button-content>
            <slot name="action-btn"><i class="mdi mdi-dots-vertical apm-actions-icon"></i></slot>
        </template>
        <slot></slot>
    </b-nav-item-dropdown>
</template>

<script>
    export default {
        name: "ApmActionsMenu",
        props: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .nav-item {
        list-style: none;
    }

    .apm-actions-icon {
        font-size: 2em;
    }
</style>
