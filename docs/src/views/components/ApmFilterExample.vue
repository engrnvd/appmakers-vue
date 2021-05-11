<template>
    <div>
        <h2>components / apm-filter</h2>

        <div class="d-flex">
            <div class="mr-5" style="width: 300px">
                <apm-filter
                    field-name="_id"
                    field-label="ID"
                    v-model="params"/>
            </div>

            <pre class="ml-5">{{ params }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApmFilterExample",
    data() {
        return {
            params: {}
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="scss"></style>
