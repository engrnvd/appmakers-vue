<template>
    <div>
        <h2>components / apm-remote-select</h2>

        <div class="d-flex">
            <div style="width: 400px" class="mr-5">
                <apm-remote-select
                    v-model="form.city"
                    url="http://hg.local/cities"
                    value-field="name"
                    label-field="name"
                    pre-load-options
                />
            </div>
            <div>
                <pre>{{form}}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApmRemoteSelectExample",
    data() {
        return {
            form: {
                city: ''
            }
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="scss"></style>
