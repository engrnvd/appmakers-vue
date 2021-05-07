<template>
    <div class="apm-filter">
        <b-nav-item-dropdown @hide="onDropDownHide">
            <template v-slot:button-content>
                <span class="sort-icon" v-if="isSorted">
                    <i class="mdi mdi-sort-descending" v-if="isDesc"></i>
                    <i class="mdi mdi-sort-ascending" v-else></i>
                </span>
                <i class="mdi mdi-filter" v-if="isFiltered"></i>
                <span class="label">{{ fieldLabel }}</span>
            </template>

            <template v-if="!hideSorting">
                <b-dropdown-item @click="sort(fieldName)" :active="isSorted && isAsc">
                    <slot name="asc-label">Sort Ascending</slot>
                </b-dropdown-item>
                <b-dropdown-item @click="sort(fieldName, 'desc')" :active="isSorted && isDesc">
                    <slot name="desc-label">Sort Descending</slot>
                </b-dropdown-item>
                <b-dropdown-divider v-if="!hideSearching"></b-dropdown-divider>
            </template>

            <b-dropdown-form v-if="this.fieldType === 'text' && !hideSearching">
                <apm-search v-model="value[fieldName]"></apm-search>
            </b-dropdown-form>

            <v-select v-if="this.fieldType === 'select'"
                      class="form-control"
                      :options="selectOptions"
                      :label="optionLabelField"
                      :reduce="option => option[optionValueField]"
                      v-model="value[fieldName]"
                      v-autofocus
            />

            <span v-if="this.fieldType === 'date'">
                <v-select
                        v-model="dateFilter.selected"
                        @input="setDateFilter"
                        :options="dateRangeOptions"></v-select>
                <v-date-picker mode="range"
                               v-if="dateFilter.selected == 'Date Range'"
                               v-model="dateRange"
                               :input-props="{ class:'form-control', placeholder: 'Select Range'}"></v-date-picker>
            </span>
        </b-nav-item-dropdown>
    </div>
</template>

<script>
    import {http} from '../services/http-service';

    export default {
        name: "ApmFilter",
        props: {
            /*
            * Name of the field to be displayed
            * */
            fieldLabel: {
                type: String,
                required: true
            },
            /*
            * name to be sent to onChange() (to the server e.g.)
            * */
            fieldName: {
                type: String,
                required: true
            },
            /*
            * Type of the field e.g. text, number, date, select, date
            * */
            fieldType: {
                type: String,
                default: 'text'
            },
            /*
            * Following options apply only to 'select' type
            * */
            optionsUrl: String, // url to fetch options from
            optionLabelField: String, // field to be displayed for an option
            optionValueField: String, // field whose value is to be set for the selected option
            options: { // will be preferred over optionsUrl
                type: Array,
                default: function () {
                    return []
                }
            },
            /*
            * Standard v-model
            * */
            value: {
                required: true
            },
            /*
            * sometimes you don't want to allow sorting via a field e.g. Tone Analysis on Sms Conversations page
            * */
            hideSorting: {
                type: Boolean,
                default: false
            },
            hideSearching: {
                type: Boolean,
                default: false
            },
            dateFilterOptions: {
                type: Array,
                default: false
            },
        },
        data() {
            return {
                selectOptions: [],
                dateFilter: {
                    options: [
                        'Today',
                        'This Week',
                        'Last 2 Weeks',
                        'This Month',
                        'Last 1 Month',
                        'Date Range',
                    ],
                    selected: null,
                },
            }
        },
        mounted() {
            switch (this.fieldType) {
                case 'select':
                    if (this.options.length) {
                        this.setOptions(this.options);
                    } else if (this.optionsUrl) {
                        this.fetchOptions();
                    }
                    break;
            }
        },
        methods: {
            onDropDownHide(e) {
                if (this.fieldType === 'date' && this.dateFilter.selected === "Date Range") {
                    if (!this.value[this.fieldName] || !this.value[this.fieldName].start) {
                        e.preventDefault();
                    }
                }
            },
            setDateFilter(filter) {
                console.log('setDateFilter', filter);
                this.dateFilter.selected = filter;
                let date = new Date();
                switch (filter) {
                    case 'Today':
                        break;
                    case 'This Week':
                        date.setDate(date.getDate() - 7);
                        break;
                    case 'Last 2 Weeks':
                        date.setDate(date.getDate() - 14);
                        break;
                    case 'Last 30 Days':
                        date.setDate(date.getDate() - 30);
                        break;
                    case 'This Month':
                        date.setDate(1);
                        break;
                    case 'Last 1 Month':
                        date.setMonth(date.getMonth() - 1);
                        break;
                    case 'Date Range':
                        return;
                    default:
                        this.applyDate(null, null);
                        return;
                }
                this.applyDate(date, new Date());
            },
            applyDate(start, end) {
                this.value[this.fieldName] = {
                    start: start ? this.$options.filters.strToMySqlDate(start) : start,
                    end: end ? this.$options.filters.strToMySqlDate(end) : end,
                };
                this.$emit('input', {...this.value});
            },
            setOptions(options) {
                this.selectOptions = options;
            },
            fetchOptions() {
                http.get(this.optionsUrl).then(response => {
                    this.setOptions(response.data);
                }).catch(response => {
                    console.warn('Error while loading options', response.data);
                });
            },
            sort(fieldName, sortType = 'asc') {
                this.value.sort = fieldName;
                this.value.sortType = sortType;
                this.$emit('change', this.value);
                this.$emit('input', {...this.value});
            }
        },
        computed: {
            dateRangeOptions() {
                if (this.dateFilterOptions) return this.dateFilterOptions;
                return this.dateRange.options;
            },
            dateRange: {
                get() {
                    return this.dateFilter;
                },
                set(value) {
                    this.applyDate(value.start, value.end);
                },
            },
            isFiltered() {
                let value = this.value[this.fieldName];
                if (this.fieldType === 'date') {
                    return value && value.start && value.end;
                }
                return value && value.length;
            },
            isSorted() {
                return this.value.sort === this.fieldName;
            },
            isAsc() {
                return this.value.sortType === 'asc';
            },
            isDesc() {
                return this.value.sortType === 'desc';
            },

        }
    }
</script>

<style lang="scss">
    .apm-filter {

        .dropdown {
            list-style: none;

            .dropdown-toggle {
                padding: 0;
            }
        }
    }
</style>
