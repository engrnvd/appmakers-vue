<template>
    <div class="apm-editable"
         @mouseenter="showIcon = true"
         @mouseleave="showIcon = false">
        <div class="form" v-if="editMode">
            <div class="input">
                <template v-if="type === 'textarea'">
                    <textarea
                        class="form-control"
                        v-model="currentValue"
                        v-autofocus
                        @keyup.enter="onEnter()"
                        @keyup.esc="cancel()"></textarea>
                </template>
                <template v-else-if="type === 'number'">
                    <input
                        type="number"
                        class="form-control"
                        v-model="currentValue"
                        v-autofocus
                        @keyup.enter="save()"
                        @keyup.esc="cancel()">
                </template>
                <template v-else-if="type === 'select'">
                    <v-select
                        class="form-control"
                        :options="options"
                        :label="ddLabelField"
                        :get-option-key="getOptionKey"
                        :reduce="option => option[ddValueField]"
                        v-model="currentValue"
                        v-autofocus
                        @keyup.enter="onEnter()"
                        @keyup.esc="cancel()"/>
                </template>
                <template v-else-if="type === 'date'">
                    <v-date-picker mode="single"
                                   :input-props="{class:'form-control'}"
                                   v-model="currentValue"
                                   v-autofocus
                                   @keyup.enter="onEnter()"
                                   @keyup.esc="cancel()"
                    ></v-date-picker>
                </template>
                <template v-else-if="type === 'time'">
                    <b-form-timepicker
                            @keyup.enter="onEnter()"
                            @keyup.esc="cancel()"
                            v-model="currentValue"></b-form-timepicker>
                </template>
                <template v-else-if="type === 'checkbox'">
                    <b-form-checkbox v-model="currentValue"
                                     v-autofocus
                                     @keyup.enter="save()"
                                     @keyup.esc="cancel()">{{checkboxLabel}}</b-form-checkbox>
                </template>
                <template v-else>
                    <input
                        type="text"
                        class="form-control"
                        v-model="currentValue"
                        v-autofocus
                        @keyup.enter="save()"
                        @keyup.esc="cancel()">
                </template>

                <span class="text-danger" v-if="error">{{ error }}</span>
            </div>
            <div class="actions">
                <i class="mdi mdi-loading mdi-spin action" v-if="saving"></i>
                <a href @click.prevent="save()" v-if="!saving" class="action action-ok text-primary">
                    <i class="mdi mdi-check-circle"></i>
                </a>
                <a href @click.prevent="cancel()" class="action action-cancel">
                    <i class="mdi mdi mdi-close-circle-outline"></i>
                </a>
            </div>
        </div>
        <div class="front" v-if="!editMode"
             @dblclick="editMode = true">
            <span v-if="type === 'checkbox'">
                <span v-if="saving">
                    <i class="mdi mdi-loading mdi-spin color-theme-1"></i> {{checkboxLabel}}
                </span>
                <b-form-checkbox v-model="value" v-else @click.native.prevent="onCheckboxClick">
                    {{checkboxLabel}}
                </b-form-checkbox>
            </span>

            <span v-else>
                <span :class="{'text-muted': !valueToShow}">
                    {{ (valueToShow ? valueToShow : 'not set') | truncate(charLimit) }}
                </span>
                <a href @click.prevent="editMode = true" v-if="showIcon" class="edit-icon">
                    <i class="mdi mdi-lead-pencil"></i>
                </a>
            </span>
        </div>
    </div>
</template>
<script>
    import {http} from '../services/http-service'

    export default {
        name: "ApmEditable",
        props: {
            type: {
                type: String,
                default: 'text',
            },
            field: {
                type: String,
                required: true,
            },
            value: {
                required: true,
            },
            saveOnChange: {
                type: Boolean,
                default: false,
            },
            url: String,
            checkboxLabel: String, // for checkbox only
            ddOptionsUrl: String, // for select only
            ddOptions: Array, // for select only (will be preferred over ddOptionsUrl)
            ddValueField: String, // for select only
            ddLabelField: String, // for select only
            charLimit: [String, Number], // for textarea only
            // validators
            required: Boolean
        },
        data() {
            return {
                showIcon: false,
                editMode: false,
                saving: false,
                currentValue: '',
                error: '',
                options: []
            }
        },
        methods: {
            save() {
                if (this.saving) return;

                if (this.value === this.currentValue) {
                    this.editMode = false;
                    return;
                }

                this.error = '';
                // validate
                if (this.required && !this.currentValue) {
                    this.error = 'Please provide some value';
                    return;
                }

                if (!this.url) {
                    this.afterSave();
                    return;
                }

                this.saving = true;

                let data = {
                    name: this.field,
                    value: this.valueToPost,
                    token:localStorage.getItem('token')
                };


                return http.put(this.url, data).then(response => {
                    this.afterSave();
                    this.$emit('on-success', response);
                }).catch(response => {
                    this.error = response.data;
                    this.$emit('on-error', response);
                }).finally(response => {
                    this.saving = false;
                });
            },
            cancel() {
                this.currentValue = this.value;
                this.editMode = false;
            },
            afterSave() {
                this.$emit('input', this.valueToPost);
                this.editMode = false;
            },
            onEnter() {
                if (this.type === 'textarea') return;
                this.save();
            },
            getOptionKey(option) {
                if (this.ddValueField) return option[this.ddValueField];
                if (typeof option === 'object' && option.id) {
                    return option.id;
                } else {
                    try {
                        return JSON.stringify(option);
                    } catch (e) {
                        return console.warn(
                            `[vue-select warn]: Could not stringify option ` +
                            `to generate unique key. Please provide 'getOptionKey' prop ` +
                            `to return a unique key for each option.\n` +
                            'https://vue-select.org/api/props.html#getoptionkey'
                        );
                        return null;
                    }
                }
            },
            fetchOptions() {
                http.get(this.ddOptionsUrl).then(response => {
                    this.options = response.data;
                }).catch(response => {
                    console.warn('Error while loading options', response.data);
                });
            },
            onCheckboxClick(event) {
                this.currentValue = !this.value;
                if (this.saveOnChange) {
                    this.save();
                } else {
                    this.editMode = true;
                }
            },
        },
        computed: {
            valueToPost() {
                if (this.type === 'select' && this.ddValueField && this.currentValue && this.currentValue.hasOwnProperty(this.ddValueField)) {
                    return this.currentValue[this.ddValueField];
                }

                if (this.type === 'date' && this.currentValue.getDate) {
                    let dd = this.currentValue.getDate();
                    let mm = this.currentValue.getMonth() + 1; //January is 0!
                    let yyyy = this.currentValue.getFullYear();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    return yyyy + '-' + mm + '-' + dd;
                }

                return this.currentValue;
            },
            valueToShow() {
                switch (this.type) {
                    case 'select':
                        if (!this.options || !this.options.length) return;
                        let option = this.options.find(option => {
                            return option[this.ddValueField] === this.value;
                        });
                        if (option) {
                            return option[this.ddLabelField];
                        }
                        return this.value;
                    case 'time':
                        let time = new Date(new Date().toDateString() + ' ' + this.value);
                        let hours = time.getHours(), minutes = time.getMinutes(), meridiem = "AM";
                        if (hours >= 13) {
                            meridiem = "PM";
                            hours = hours - 12;
                        }
                        if (hours === 0) hours = 12;
                        if (hours < 10) hours = "0" + hours;
                        if (minutes < 10) minutes = "0" + minutes;
                        return hours + ":" + minutes + " " + meridiem;
                    default:
                        return this.value;
                }
            }
        },
        mounted() {
            switch (this.type) {
                case 'date':
                    this.currentValue = new Date(this.value);
                    break;
                case 'select':
                    this.options = this.ddOptions;
                    if (this.ddOptionsUrl) {
                        this.fetchOptions();
                    }
                default:
                    this.currentValue = this.value;
            }
        },
    }
</script>


<style scoped lang="scss">
    .apm-editable, .front {
        position: relative;
        min-width: 100%;
        min-height: 1rem;
    }

    .form-control {
        min-width: 15rem;
    }

    .edit-icon {
        display: inline-block;
        font-size: 1em;
        line-height: 1;
    }

    .form {
        display: flex;
        align-items: center;

        .input {
            flex: 1;
        }

        .actions {
            display: flex;
            align-items: center;

            .action {
                display: block;
                font-size: 25px;
            }
        }
    }
</style>
