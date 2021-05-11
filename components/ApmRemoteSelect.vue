<template>
    <v-select
        class="form-control"
        :options="options"
        :label="labelField"
        :get-option-label="getOptionLabel"
        :reduce="option => option[valueField]"
        :value="value"
        @input="onInput"
        @search="fetchOptions">
        <template slot="no-options">{{ placeholder || (preLoadOptions ? 'Select an option' : 'Type to search...') }}</template>
    </v-select>
</template>

<script>
import {Resource} from "../services/http-resource-service";

export default {
    name: "ApmRemoteSelect",
    props: {
        url: String,
        value: {},
        valueField: {
            type: String,
            default: '_id'
        },
        labelField: String,
        getOptionLabel: {
            type: Function,
            default(option) {
                if (typeof option === 'object') {
                    if (!option.hasOwnProperty(this.label)) {
                        return console.warn(
                            `[vue-select warn]: Label key "option.${this.label}" does not` +
                            ` exist in options object ${JSON.stringify(option)}.\n` +
                            'https://vue-select.org/api/props.html#getoptionlabel'
                        )
                    }
                    return option[this.label]
                }
                return option;
            }
        },
        minSearchLength: {
            type: Number,
            default: 2
        },
        dataProp: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        preLoadOptions: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            options: [],
            req: new Resource(this.url, 'get', {
                delay: 300,
                delayFirstRequest: true,
            })
        }
    },
    methods: {
        fetchOptions(searchValue, loading) {
            if (this.preLoadOptions) return;

            if (!searchValue || searchValue.length < this.minSearchLength) {
                return;
            }

            loading(true);

            this.req.url = this.url + '?search=' + searchValue;
            this.req.send({
                onSuccess: (res) => {
                    this.options = this.dataProp ? res.data[this.dataProp] : res.data;
                },
                afterRequest: () => {
                    loading(false);
                },
            });
        },
        onInput(val) {
            this.$emit('input', val);
        },
        loadOptions() {
            this.req.url = this.preLoadOptions ? this.url : `${this.url}?${this.valueField}=${this.value}`;
            this.req.send({
                onSuccess: (res) => {
                    this.options = this.dataProp ? res.data[this.dataProp] : res.data;
                },
            });
        },
        populatePreSelectedValue() {
            if (this.value && !this.options.length) {
                this.loadOptions();
            }
        },
    },
    updated() {
        this.populatePreSelectedValue();
    },
    mounted() {
        if (this.preLoadOptions) {
            this.loadOptions();
        }
    }
}
</script>

<style scoped>

</style>
