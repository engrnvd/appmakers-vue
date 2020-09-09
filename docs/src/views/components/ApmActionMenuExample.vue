<template>
    <div>
        <div class="d-flex align-items-center parent px-4 mb-4">
            <div class="flex-grow-1">
                A nice component to create mobile style menus
            </div>
            <apm-actions-menu>
                <b-dropdown-item to="/">First</b-dropdown-item>
                <b-dropdown-item to="/">Second</b-dropdown-item>
            </apm-actions-menu>
        </div>

        <h3>Code</h3>
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
.parent {
    width: 500px;
    border: 1px solid #eee;
    border-radius: 5px;
}
</style>
