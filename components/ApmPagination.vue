<template>
    <b-pagination
        v-model="resource.config.params.page"
        :total-rows="resource.data.total"
        :per-page="resource.config.params.perPage">
        <template v-slot:next-text>
            <i class="mdi mdi-chevron-right mdi-18px"/>
        </template>
        <template v-slot:prev-text>
            <i class="mdi mdi-chevron-left mdi-18px"/>
        </template>
        <template v-slot:first-text>
            <i class="mdi mdi-skip-previous mdi-18px"/>
        </template>
        <template v-slot:last-text>
            <i class="mdi mdi-skip-next mdi-18px"/>
        </template>
    </b-pagination>
</template>

<script>
    export default {
        name: "ApmPagination",
        props: {
            resource: Object
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
