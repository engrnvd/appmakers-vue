<template>
    <div class="parent">
        <div
            v-if="user.loaded && user.data.signature"
            @click="insertSignature()"
            apm-tooltip="Insert Your Signature">
            <i class="mdi mdi-pencil-plus mdi-24px"></i>
        </div>
        <div v-else apm-tooltip="Insert Your Signature">
            <b-link @click.prevent="showSignatureModal=!showSignatureModal">
                <i class="mdi mdi-pencil-plus mdi-24px"></i>
            </b-link>
            <b-modal :hide-footer="true"
                     title="Insert Signature"
                     centered
                     size="md"
                     v-model="showSignatureModal">

                <b-textarea id="signature" v-model="signature" placeholder="signature"></b-textarea>

                <b-button @click="setSignature()" class="primary mt-2" :disabled="!signature">Insert Signature</b-button>
            </b-modal>
        </div>
    </div>

</template>

<script>
    import {Resource} from "../services/http-resource-service";

    export default {
        name: "ApmSignature",
        props: {
            targetId: String,
            target: String,
        },
        data() {
            return {
                user: new Resource('api/user', 'get'),
                signature: null,
                showSignatureModal: false
            }
        },
        methods: {
            insertSignature() {
                if (this.user.loaded && this.user.data.signature) {
                    this.updateText();
                }
            },
            updateText() {
                if (!this.target) this.target = '';
                let text = this.target + '\n--\n' + this.user.data.signature;
                this.$emit('insert', text);
                let textarea = document.getElementById(this.targetId);
                let height = parseFloat(getComputedStyle(textarea).height);
                let fontSize = parseFloat(getComputedStyle(textarea).fontSize);
                textarea.style.height = height + 3 * fontSize + 'px';
                textarea.focus();
            },
            setSignature() {
                let data = {name: 'signature', value: this.signature};
                this.signature = null;
                let signature = new Resource('api/update-user/' + this.user.data._id, 'put');
                signature.send({
                    data: data,
                    onSuccess: (res) => {
                        this.user.data.signature = res.data.signature;
                        this.updateText();
                        this.showSignatureModal = false;
                    }
                });
            }
        }, mounted() {
            this.user.send();
        }
    }
</script>

<style scoped>
    i {
        cursor: pointer;
    }
</style>
