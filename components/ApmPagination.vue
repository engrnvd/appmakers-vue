<template>
    <b-pagination
        v-model="resource.config.params.page"
        :total-rows="resource.data.total"
        :per-page="resource.config.params.perPage">
        <template v-slot:next-text>
            <i class="simple-icon-arrow-right"/>
        </template>
        <template v-slot:prev-text>
            <i class="simple-icon-arrow-left"/>
        </template>
        <template v-slot:first-text>
            <i class="simple-icon-control-start"/>
        </template>
        <template v-slot:last-text>
            <i class="simple-icon-control-end"/>
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
