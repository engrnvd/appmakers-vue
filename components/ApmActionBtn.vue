<template>
    <b-button :variant="variant" :disabled="showLoader" @click="$emit('click', $event.target.value)">
        <span v-if="showLoader">
            <slot name="loader">
                <i class="mdi mdi-loading mdi-spin"></i>
            </slot>
        </span>
        <span v-else><slot></slot></span>
    </b-button>
</template>

<script>
    export default {
        name: "ApmActionBtn",
        props: {
            variant: {
                type: String,
                default: 'primary',
            },
            showLoader: Boolean
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
</style>
