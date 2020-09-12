<template>
    <div class="apm-fab" @click="$emit('click', $event)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ApmFab",
        props: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    $dark: #17a2b8;
    $light: #fff;
    .apm-fab {
        position: absolute;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        min-width: 3rem;
        padding: 0 0.5rem;
        border-radius: 1.5rem;
        cursor: pointer;
        border: 1px solid $dark;
        background-color: $dark;
        color: $light;
        box-shadow: 1px 1px 5px #777;
        bottom: 1rem;
        right: 1rem;

        i::before {
            margin: 0;
        }
    }

    .apm-fab:hover {
        border-color: $light;
        background-color: $light;
        color: $dark;
    }
</style>
