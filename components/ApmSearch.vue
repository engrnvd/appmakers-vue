<template>
    <div class="apm-search">
        <input
            class="form-control search-input"
            :value="value"
            @input="$emit('input', $event.target.value)">
        <i class="mdi mdi-24px mdi-magnify search-icon" v-if="!value"></i>
        <i class="mdi mdi-24px mdi-close clear-icon" v-else @click="$emit('input', '')"></i>
    </div>
</template>

<script>
    export default {
        name: "ApmSearch",
        props: ['value'],
    }
</script>

<style scoped lang="scss">
    .apm-search {
        position: relative;
    }

    .search-input {
        padding-right: 2.5rem;
    }

    .search-icon, .clear-icon {
        position: absolute;
        right: 0.5rem;
        top: 0.25rem;
        color: #777;
    }

    .clear-icon {
        cursor: pointer;
    }
</style>
