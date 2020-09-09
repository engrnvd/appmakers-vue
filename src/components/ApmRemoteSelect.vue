<template>
    <div>
        <b-form-select
            ref="monthPicker"
            v-model="selected" @input="$emit('input', selected)"
            :placeholder="placeholder" :options="options" selected>
        </b-form-select>
    </div>

</template>

<script>
    import {http} from "../services/http-service";

    export default {
        name: "ApmRemoteSelect",
        props:{
            url:'',
            ddValueField:null,
            ddTextField:null,
            placeholder:null
        },
        data() {
            return {
                selected: null,
                options: [],

            }
        },
        mounted() {
            http.get(this.url).then(response => {
                for (let user of response.data) {
                    if (this.ddValueField)
                        this.options.push({value: user[this.ddValueField], text: user[this.ddTextField]});
                    else {
                        this.options.push({value: user, text: user[this.ddTextField]})
                    }
                }
            });
        },
    }
</script>

<style scoped>

</style>
