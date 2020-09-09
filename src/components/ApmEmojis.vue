<template>
    <div class="apm-emoji">
        <b-dropdown dropup variant="link" no-caret ref="dropdown" open>
            <template v-slot:button-content>
                <div apm-tooltip="emojis"><i class="mdi mdi-emoticon-happy-outline mdi-24px"></i></div>
            </template>
            <b-dropdown-form>
                <div class="emojis">
                    <b-tabs>
                        <b-tab v-for="(type,heading) in service.emojis"
                               :key="heading">
                            <template v-slot:title>
                                <span style="font-size: 14px;">{{type.icon}}</span>
                            </template>

                            <apm-search class="mt-4"  :value="searchEmoji"
                                        v-on:input="updateSearch"></apm-search>
                            <div class="px-3 overflow-auto section">
                                <!--Frequently used emojis-->
                                <p class="mt-3 mb-2" v-if="userEmoji.length">Frequently Used</p>
                                <span
                                    class="emoji"
                                    v-if="userEmoji.length"
                                    v-for="(emoji,index) in userEmoji.slice(0, 10)"
                                    @click="insertEmoji(emoji.emoji)"
                                    style="cursor:pointer;font-size: 20px"
                                    :key="emoji.emoji">{{emoji.emoji}}
                                </span>
                                <!--Search emojis or Emojis-->
                                <p class="mt-3 mb-2" v-if="searchEmoji">Search Results</p>
                                <p class="mt-3 mb-2" v-else>{{type.title}}</p>
                                <span
                                    class="emoji"
                                    v-for="(emoji,index) in searchEmoji?search():type.data"
                                    @click="insertEmoji(emoji.icon)"
                                    style="cursor:pointer;font-size: 20px"
                                    :key="index">{{emoji.icon}}
                                </span>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-dropdown-form>
        </b-dropdown>
    </div>
</template>

<script>
    import {emojiService} from "../services/emoji-service";
    import ApmSearch from "./ApmSearch";
    import _ from "lodash";

    export default {
        components: {ApmSearch},
        props: {
            targetId: String,
            target: String,
        },
        name: "ApmEmojis",
        data() {
            return {
                service: emojiService,
                searchEmoji: null,
                userEmoji: JSON.parse(localStorage.getItem('emoji')) ? JSON.parse(localStorage.getItem('emoji')) : [],
            }
        },
        methods: {
            updateSearch(data) {
                this.searchEmoji = data;
            },
            insertEmoji(emoji) {
                this.saveEmoji(emoji);
                if (!this.target) this.target = '';
                let myElement = document.getElementById(this.targetId);
                let carrot = myElement.selectionStart + emoji.length;
                this.$emit('insert', this.target.splice(myElement.selectionStart, 0, emoji));
                this.$refs.dropdown.hide();
                setTimeout(function () {
                    myElement.setSelectionRange(carrot, carrot);
                    myElement.focus();
                }, 10);
            },
            saveEmoji(emoji) {
                let old = this.userEmoji.filter((i) => i.emoji === emoji);
                if (old.length) {
                    this.userEmoji[this.userEmoji.indexOf(old[0])].count++;
                } else {
                    this.userEmoji.push({emoji: emoji, count: 1});
                }
                this.userEmoji.sort(function (a, b) {
                    return a.count - b.count;
                });
                localStorage.setItem("emoji", JSON.stringify(_.reverse(this.userEmoji)));
            },
            search() {
                let filter = this.searchEmoji.toUpperCase();
                let searchedRecords = [];
                for (let prop in this.service.emojis) {
                    for (let emoji of this.service.emojis[prop].data) {
                        if (emoji.description.toUpperCase().indexOf(filter) > -1) {
                            searchedRecords.push(emoji);
                        }
                    }
                }
                return searchedRecords;
            }
        },
    }
</script>
<style scoped>
    .emojis {
        width: 26rem;
        color: black !important;
        height: 25em;
        text-align: justify;
    }

    .apm-emoji i {
        color: black !important;
    }

    .emoji:hover {
        background-color: #c5daef;
    }

    .section {
        height: 15rem;
    }
</style>

<style>
    .apm-emoji .dropdown-toggle {
        padding: 0;
    }
</style>
