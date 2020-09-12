<template>
    <span :apm-tooltip="label" class="apm-status-dot">
        <i :class="'mdi mdi-checkbox-blank-circle text-' + status"></i>
    </span>
</template>

<script>
    export default {
        name: "ApmStatusDot",
        props: ['status', 'label'],
    }
</script>

