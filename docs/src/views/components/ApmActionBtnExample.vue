<template>
    <div>
        <apm-action-btn :show-loader="true">
            Button
        </apm-action-btn>
        <apm-action-btn :show-loader="true">
            Button
            <template #loader><i class="mdi mdi-gamepad-circle-outline mdi-spin"></i></template>
        </apm-action-btn>
        <apm-action-btn :show-loader="false" variant="success">
            Success Variant
        </apm-action-btn>
        <apm-action-btn :show-loader="loading" @click="load">
            Load Quote of the Day
        </apm-action-btn>

        <div v-if="quote && !loading">
            <h4>{{ quote.title }}</h4>
            <div class="quote">
                <img :src="quote.background">
                {{ quote.quote }}
                <br>
                {{ quote.author }}
            </div>
        </div>
        <div class="alert alert-danger" v-if="error && !loading">{{ error }}</div>
    </div>
</template>

<script>
import {http} from "../../../../services/http-service";

export default {
    name: "ApmActionBtnExample",
    props: {},
    data() {
        return {
            loading: false,
            quote: null,
            error: '',
        }
    },
    methods: {
        load() {
            this.loading = true;
            setTimeout(() => {
                http.get('https://quotes.rest/qod').then(res => {
                    this.quote = res.data.contents.quotes[0];
                }).catch(res => {
                    this.error = res.data;
                }).finally(() => {
                    this.loading = false;
                });
            }, 500);
        }
    }
}
</script>

<style scoped lang="scss">
.btn {
    display: block;
    margin-bottom: 1rem;
}

.quote {
    width: 475px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #fff;
    text-align: center;
    text-shadow: 0 0 3px #000;

    img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
}
</style>
