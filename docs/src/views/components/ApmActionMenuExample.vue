<template>
    <div>
        <div class="d-flex">
            <div class="flex-grow-1">
                A nice component to create mobile style menus
            </div>
            <apm-actions-menu>
                <b-dropdown-item to="/">First</b-dropdown-item>
                <b-dropdown-item to="/">Second</b-dropdown-item>
            </apm-actions-menu>
        </div>

        <pre>
            <code>
            &lt;apm-actions-menu>
                &lt;b-dropdown-item to="/">First&lt;/b-dropdown-item>
                &lt;b-dropdown-item to="/">Second&lt;/b-dropdown-item>
            &lt;/apm-actions-menu>
            </code>
        </pre>
    </div>
</template>

<script>
export default {
    name: "ApmActionMenuExample",
    props: {},
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">

</style>
