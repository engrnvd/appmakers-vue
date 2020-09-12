<template>
    <div class="form-group" :class="{'has-error': errors,'has-float-label':floating}">
        <label v-if="label && !floating">
            <slot name="label">{{ label }}</slot>
        </label>
        <slot></slot>
        <span class="help-block text-danger" v-if="errors" v-for="msg in errors">{{msg}}</span>
        <span v-if="floating">{{ label?label:field }}</span>
    </div>
</template>

<script>
    export default {
        name: "ApmFormElement",
        props: {
            model: Object,
            field: String,
            label: String,
            floating: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            errors() {
                if (this.model && this.model.$errors && this.model.$errors.hasOwnProperty([this.field]))
                    return this.model.$errors[this.field];
                return "";
            }
        }
    }
</script>

<style scoped>
    .vue-switcher {
        display: block;
    }
</style>
