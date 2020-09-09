<template>
    <div class="pagination-info d-flex align-items-center">
        <div class="text-muted text-small mr-2">
            Showing {{resource.data.from}} - {{resource.data.to}} of {{ resource.data.total }}
        </div>
        <b-dropdown id="ddown2" right
                    apm-tooltip="Results per page"
                    tooltip-placement="left"
                    :text="`${resource.config.params.perPage}`"
                    variant="outline-dark"
                    size="xs">
            <b-dropdown-item v-for="(size,index) in [10, 20, 30, 50]" :key="index"
                             @click="resource.send({params: {perPage: size}})">{{size}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default {
        name: "ApmPaginationInfo",
        props: {resource: Object},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
