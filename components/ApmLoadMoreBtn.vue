<template>
    <div class="d-flex justify-content-center align-items-center mt-4" v-if="!request.allLoaded">
        <button class="btn btn-light apm-load-more-btn" @click="request.send({paginationMode: 'append'})" v-if="!request.loading">
            <slot>Load More</slot>
        </button>
        <i class="mdi mdi-loading mdi-spin text-large load-more-working" v-else></i>
    </div>
</template>

<script>
    export default {
        name: "ApmLoadMoreBtn",
        props: ['request'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="scss">

</style>
