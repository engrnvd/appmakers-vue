<template>
    <form name="apmForm" @submit.prevent.stop="saveForm" novalidate method="post">
        <div v-if="errorResponse" class="alert alert-danger error-message">{{errorResponse}}</div>
        <apm-loader v-if="res.loading"><slot name="loader"><div class="loading"></div></slot></apm-loader>
        <slot></slot>
    </form>
</template>

<script>
    import {Resource} from "../services/http-resource-service";

    export default {
        name: "ApmForm",
        props: {
            action: String,
            attachments: {
                type: Array,
                default: function () {
                    return []
                }
            },
            attachmentsKey: {
                type: String,
                default: 'attachments'
            },
            value: Object,
            retainValues: {
                type: Boolean,
                default: false
            },
            beforeSend: Function,
        },
        data() {
            return {
                res: new Resource(this.action, 'post'),
                errorResponse: ''
            }
        },
        methods: {
            saveForm() {
                this.errorResponse = '';
                this.updateModel('$errors', '');

                // get data to post
                let data = null;
                if (this.beforeSend) {
                    data = this.beforeSend();
                }
                if (!data) data = this.value;
                delete data.$errors;
                return this.res.upload({
                    data: data,
                    onSuccess: response => {
                        if (!this.retainValues) this.$emit('input', {});
                        this.$emit('on-success', response);
                    },
                    onError: response => {
                        let data = response.data;
                        if (typeof data == 'string') {
                            this.errorResponse = data;
                        } else {
                            let errors = data.errors || data;
                            this.updateModel('$errors', errors);
                        }
                        this.$emit('on-error', response);
                    }
                }, this.attachments, this.attachmentsKey);
            },
            updateModel(key, val) {
                let value = {...this.value};
                value[key] = val;
                this.$emit('input', value);
            }
        }
    }
</script>

<style scoped>
    .error-message {
        margin-top: 1em;
    }

    form {
        position: relative;
    }
</style>
