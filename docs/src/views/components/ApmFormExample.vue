<template>
    <div>
        <h2>components / apm-form</h2>
        <div class="d-flex">
            <div class="mr-5" style="width: 300px">
                <apm-form
                    action="/menu-items"
                    v-model="form"
                    :attachments="form.file"
                    post-single-attachment>

                    <apm-form-element field="name" label="Name" :model="form" :floating="false">
                        <b-form-input v-model="form.name"/>
                    </apm-form-element>

                    <apm-form-element field="file" label="Img File" :model="form" :floating="false">
                        <b-form-file v-model="form.file" accept="image/*"/>
                    </apm-form-element>

                    <b-button variant="primary" type="submit" class="mr-1">Save</b-button>
                </apm-form>
            </div>
            <div class="ml-5">
                <pre>{{ form }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ApmFormExample",
    data() {
        return {
            form: {
                file: '',
                name: ''
            }
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss"></style>
