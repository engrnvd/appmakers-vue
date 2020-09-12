<template>
    <span :class="'social-icon ' + variant + ' ' + typeSlug" :apm-tooltip="type">
        <i :class="classes"></i>
    </span>
</template>

<script>
    export default {
        name: "ApmSocialIcon",
        props: {
            type: String,
            variant: {
                type: String,
                required: false,
                default: 'default'
            }
        },
        data() {
            return {}
        },
        computed: {
            classes() {
                let icon = 'mdi mdi-';
                switch (this.typeSlug) {
                    case 'facebook':
                        icon += 'facebook-box';
                        break;
                    case 'whatsapp':
                        icon += 'whatsapp';
                        break;
                    case 'email':
                        icon += 'email-variant';
                        break;
                    case 'live-chat':
                        icon += 'wechat';
                        break;
                    case 'mobile':
                    case 'sms':
                        icon += 'cellphone';
                        break;
                    case 'office':
                        icon += 'briefcase';
                        break;
                    default:
                        icon += 'phone';
                        break;
                }
                return icon;
            },
            typeSlug() {
                if (!this.type) return '';
                return this.type.toLowerCase().replace(' ', '-');
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    $defaultColor: #333;
    $channels:
        whatsapp #24cd63,
        facebook #395793,
        sms #19a2b4,
        call #b33122,
        live-chat #395793,
        email #b33122;

    .social-icon {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        background-color: #666;
        width: 1.6em;
        height: 1.6em;
        border-radius: 50%;
        border: 0.15em solid #fff;
        color: #fff;

        .mdi {
            text-align: center;
            line-height: 1;

            &::before {
                margin-left: 0;
            }
        }
    }

    /* variants */
    .simple {
        background-color: transparent;
        color: $defaultColor;
        border: none;
        width: auto;
        height: auto;
    }

    /* channels css */
    @each $channel, $color in $channels {
        .#{$channel} {
            background-color: $color;
        }
        .#{$channel}.simple {
            color: $color;
            background-color: transparent;
        }
    }
</style>
