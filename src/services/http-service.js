let axios = require('axios');
import {setupCache} from 'axios-cache-adapter'

axios.interceptors.request.use(function (config) {
    config.headers = config.headers || {};
    if (localStorage.getItem('token')) {
        config.headers.Authorization = "Bearer " + localStorage.getItem('token');
    }

    if (!config.dontCache) {
        const cache = setupCache({
            maxAge: 2 * 60 * 1000
        });

        config.adapter = cache.adapter;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(async function (response) {
    return response;
}, function (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error = error.response;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        error = error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        error = error.message
    }

    const logoutErrors = ["Wrong number of segments", "logged out"];
    if (error.data && logoutErrors.includes(error.data)) {
        window.location.reload();
    }

    return Promise.reject(error);
});

export const http = axios;
