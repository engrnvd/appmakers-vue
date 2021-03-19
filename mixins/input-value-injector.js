export const inputInjector = {
    props: {
        targetId: {
            type: String,
            required: true,
        },
        replace: {
            type: Boolean,
            default: false,
        },
        prefix: {
            type: String,
            default: '',
        },
        postfix: {
            type: String,
            default: '',
        },
    },
    methods: {
        insert(content) {
            const element = document.getElementById(this.targetId);
            const value = this.replace ? content : this.prefix + content + this.postfix;
            const carrot = element.selectionStart + value.length;
            if (this.replace) {
                element.value = value;
            } else {
                element.value = element.value.splice(element.selectionStart, 0, value);
                element.setSelectionRange(carrot, carrot);
            }
            element.dispatchEvent(new Event('input'));
            element.focus();
        },
    },
};
