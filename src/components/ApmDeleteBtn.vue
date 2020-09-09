<template>
    <span>
        <apm-confirm :message="message"
                     @click="remove"
                     class="text-danger"
                     v-if="message">
            <slot><i class="mdi mdi-delete"></i></slot>
        </apm-confirm>
        <a v-else href class="text-danger" @click.prevent="confirmAndRemove()">
            <slot><i class="mdi mdi-delete"></i></slot>
        </a>
    </span>
</template>

<script>
    import {http} from '../services/http-service';

    export default {
        name: "ApmDeleteBtn",
        props: {
            message: {
                type: String,
                default: ''
            },
            url: String
        },
        data() {
            return {}
        },
        methods: {
            confirmAndRemove() {
                if (!confirm('Are you sure?')) return;
                this.remove();
            },
            remove() {
                http.delete(this.url).then(response => {
                    this.$emit('on-success', response);
                }).catch(response => {
                    this.$emit('on-error', response);
                });
            }
        }
    }
</script>

<style scoped>

</style>
