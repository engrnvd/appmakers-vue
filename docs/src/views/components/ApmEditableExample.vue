<template>
    <div>
        <h2>components / apm-editable</h2>
        <div class="d-flex">
            <div class="mr-5" style="width: 300px">
                <apm-editable
                    type="text"
                    field="name"
                    :url="`/menu-items/1`"
                    v-model="form.name"
                 />

                <apm-editable
                    type="checkbox"
                    field="active"
                    checkbox-switch
                    :url="`/menu-items/1`"
                    v-model="form.active"
                />
            </div>
            <div class="ml-5">
                <pre>{{ form }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApmEditableExample",
    data() {
        return {
            form: {
                name: '',
                active: false
            }
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="scss"></style>
