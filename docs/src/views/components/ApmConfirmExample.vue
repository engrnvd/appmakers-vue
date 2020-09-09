<template>
    <div>
        <apm-confirm
            message="Are you out of your mind????"
            title="Destroy"
            :options="options"
            @click="destroy()"
            class="btn btn-danger"
        >Destroy Everything</apm-confirm>
    </div>
</template>

<script>
export default {
    name: "ApmConfirmExample",
    data() {
        return {
            options: {
                okTitle: 'Yes',
                cancelTitle: 'No'
            }
        }
    },
    methods: {
        destroy() {
            document.body.style.transition = "opacity 2s";
            document.body.style.opacity = 0;
        }
    }
}
</script>
