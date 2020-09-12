<template>
    <span @click="toggle()"
          class="apm-switch"
          :class="{'apm-checked': value}">
    <span class="apm-switch-inner"></span>
</span>
</template>

<script>
    export default {
        name: "ApmSwitch",
        props: {
            value: Boolean
        },
        methods: {
            toggle() {
                this.$emit('input', !this.value);
            }
        }
    }
</script>

<style scoped>

</style>
