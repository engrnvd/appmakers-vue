<template>
    <div class="parent">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ApmLoader"
    }
</script>

<style scoped>
    .parent {
        position: fixed;
        z-index: 9999;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .icon {
        font-size: 5em;
        color: white;
    }
</style>
