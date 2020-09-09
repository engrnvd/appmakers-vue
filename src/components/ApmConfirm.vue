<template>
    <b-link @click="showMsgBox">
        <slot></slot>
    </b-link>
</template>

<script>
    export default {
        name: "ApmConfirm",
        props: {
            message: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: "Are you sure?"
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        hideBackdrop: true,
                    }
                }
            }
        },
        data() {
            return {};
        },
        computed: {
            boxConfig() {
                return {...this.options, ...{title: this.title}};
            },
        },
        methods: {
            showMsgBox() {
                this.$bvModal.msgBoxConfirm(this.message, this.boxConfig).then(value => {
                    if (value) this.$emit('click');
                }).catch(err => {
                    console.error("Error: ApmConfirm", err);
                });
            },
        }
    }
</script>
