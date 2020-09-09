<template>
    <b-button :variant="variant" @click="copy">
        <slot>
            <i class="mdi mdi-content-copy"></i> Copy to clipboard
        </slot>
    </b-button>
</template>

<script>
    export default {
        name: "ApmCopyToClipboard",
        props: {
            elementId: {
                type: String,
                required: true
            },
            variant: {
                type: String,
                default: 'primary',
            },
        },
        methods: {
            selectText(element) {
                console.log('element', element);
                let range;
                if (document.selection) {
                    // IE
                    range = document.body.createTextRange();
                    range.moveToElementText(element);
                    range.select();
                } else if (window.getSelection) {
                    range = document.createRange();
                    range.selectNode(element);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
            },
            copy() {
                this.selectText(document.getElementById(this.elementId));
                document.execCommand("copy");
            },
        }
    }
</script>
