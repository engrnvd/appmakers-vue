<template>
    <span>
        <input type="file" :multiple="multiple" hidden
               @change="selectFiles"
               ref="filesAttachment">
        <b-link @click="onSelecting" class="position-relative">
            <slot>
                <i class="mdi mdi-paperclip mdi-24px"></i>
                <span v-show="value.length" class="apm-count">{{ value.length }}</span>
            </slot>
        </b-link>
        <b-modal
                scrollable
                v-model="showModal"
                size="sm"
                title="Attachments"
                header-class="p-3"
                footer-class="p-3"
                body-class="p-2">
            <div v-for="(file, index) in value" :key="index" class="d-flex flex-row attached-file">
                <div class="attachment-icon w-20 text-primary">
                    <i class="mdi mdi-36px" :class="attachmentIcon(file.type)"></i>
                </div>
                <div class="position-relative p-3">
                    <p class="font-weight-bolder mb-0 truncate">{{file.name | truncate(20)}}</p>
                    <p class="text-primary mb-0 text-small">{{file.size | byteConversion}}</p>
                </div>
                <b-link class="position-absolute remove-btn" @click="removeFile(index)">
                    <i class="mdi mdi-trash-can mdi-24px"></i>
                </b-link>
            </div>
            <template v-slot:modal-footer>
                <apm-file-attachment v-model="attachMore" class="mr-auto"
                                     @input="addMoreFiles"
                                     v-if="multiple"
                                     :multiple="multiple"
                                     tooltip-placement="right"
                                     apm-tooltip="Add more files">
                    <i class="mdi mdi-plus-box mdi-24px"></i>
                </apm-file-attachment>
                <div class="w-30">
                    <b-link @click="removeAllAttachments()">Remove All</b-link>
                    <b-button size="sm" variant="primary" @click="hide()" class="mt-2">
                        Attach
                    </b-button>
                </div>
            </template>
        </b-modal>
    </span>
</template>

<script>

    export default {
        name: "ApmFileAttachment",
        props: {
            value: Array,
            multiple: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                showModal: false,
                attachMore: [],
            }
        },
        methods: {
            addMoreFiles(input) {
                this.$emit('input', [...this.value, ...input]);
                this.attachMore = [];
            },
            hide() {
                this.showModal = false;
            },
            selectFiles($event) {
                this.$emit('input', Array.from($event.target.files));
            },
            onSelecting() {
                if (this.value.length) {
                    this.showModal = true;
                } else {
                    this.$refs.filesAttachment.click();
                }
            },
            removeFile(index) {
                this.value.splice(index, 1);
                if (!this.value.length) this.hide();
            },
            removeAllAttachments() {
                this.$emit('input', []);
                this.hide();
            },
            attachmentIcon(type) {
                let icon = "file";
                switch (type) {
                    case "audio/mp3":
                    case "audio/mpeg":
                    case "audio/wav":
                    case "audio/webm":
                        icon = "file-music";
                        break;
                    case "image/bmp":
                    case "image/gif":
                    case "image/jpeg":
                    case "image/png":
                        icon = "file-image";
                        break;
                    case "application/pdf":
                        icon = "file-pdf";
                        break;
                    case "application/vnd.ms-excel":
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    case "text/csv":
                        icon = "file-excel";
                        break;
                    case "application/vnd.ms-powerpoint":
                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                        icon = "file-powerpoint";
                        break;
                    case "application/msword":
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        icon = "file-word";
                        break;
                    case "application/gzip":
                    case "application/zip":
                    case "application/x-7z-compressed":
                    case "application/x-zip-compressed":
                    case "application/vnd.rar":
                        icon = "zip-box";
                        break;
                    case "text/plain":
                        icon = "file-document";
                        break;
                }
                return "mdi-" + icon;
            },
        },
    }
</script>

<style scoped lang="scss">
    .apm-count {
        font-size: 0.8em;
        top: -1.5em;
    }

    .attached-file {
        border: 1px solid #d7d7d7;
        border-radius: .1rem;
        background: #fff;
        color: #212121;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }

        .attachment-icon {
            margin: auto 0;
        }

        .remove-btn {
            align-self: center;
            right: 22px;
        }
    }
</style>