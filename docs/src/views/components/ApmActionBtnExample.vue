<template>
    <div>
        <apm-action-btn :show-loader="true">
            Button
            <template #loader><i class="mdi mdi-loading mdi-spin"></i></template>
        </apm-action-btn>
        <apm-action-btn :show-loader="false">
            Default
            <template #loader><i class="mdi mdi-loading mdi-spin"></i></template>
        </apm-action-btn>
        <apm-action-btn :show-loader="false" variant="success">
            Success Variant
            <template #loader><i class="mdi mdi-loading mdi-spin"></i></template>
        </apm-action-btn>
    </div>
</template>

<script>
export default {
    name: "ApmActionBtnExample",
    props: {},
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.btn {
    display: block;
    margin-bottom: 1rem;
}
</style>
