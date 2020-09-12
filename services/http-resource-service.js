import {http} from "./http-service";

/*
* The config object basically accepts all parameters that axios does:
* https://github.com/axios/axios#axios-api
* Other than that, following parameters can be sent
* delay: To delay the execution.Type: Number. Unit: milliseconds. Default: 0
* delayFirstRequest: Whether you want to delay the first request. Type: Boolean. default: false
* pagination: Whether to request paginated data. Type: Bool. Default: false
* paginationMode: replace | append. Type: Bool. Default: 'replace'. Set to 'append' to implement "load more" feature)
* */
function Res(url, method = 'get', config = {}) {
    this.firstRequest = true;
    this.url = url;
    this.method = method;
    this.lastRequestId = null;
    this.data = [];
    this.error = '';
    this.loading = false;
    this.loaded = false;
    this.perPageOriginal = null;
    this.allLoaded = false;
    this.config = {
        delay: 0,
        delayFirstRequest: false,
    };

    // check for pagination
    if (config.pagination) {
        this.data = {data: []};
        config.params = config.params || {};
        config.params.perPage = config.params.perPage || 10;
        config.params.page = config.params.page || 1;
        config.paginationMode = config.paginationMode || 'replace';
    }

    this.mergeConfig(config);
}

Res.prototype.mergeConfig = function (config) {
    if (config) {
        for (let prop in config) {
            this.config[prop] = config[prop];
        }
    }
};

Res.prototype.send = function (config) {
    let service = this;
    service.mergeConfig(config);
    config = service.config;
    if (!service.url) return;

    // clear all pending requests
    if (this.lastRequestId) {
        clearTimeout(service.lastRequestId);
    }
    service.lastRequestId = null;

    // make request
    service.loading = true;
    if (config.paginationMode === 'append' && !service.firstRequest) {
        if (!service.perPageOriginal) service.perPageOriginal = config.params.perPage;
        config.params.perPage += service.perPageOriginal;
    }
    service.loaded = false;
    service.error = '';
    let delay = config.delay || 0;
    if (service.firstRequest && !config.delayFirstRequest) delay = 0;
    service.lastRequestId = setTimeout(() => {
        // make new request
        config.url = service.url;
        config.method = service.method;
        config.onSuccess = config.onSuccess || function (res) {
            if (config.pagination) {
                if (config.params.page !== 1 && config.paginationMode === 'append') {
                    service.data.data = service.data.data.concat(res.data.data);
                } else {
                    service.data = res.data;
                }

                if (!res.data.data || !res.data.data.length || service.data.data.length === parseInt(res.data.total)) {
                    service.allLoaded = true;
                }
            } else {
                service.data = res.data;
            }
        };
        config.onError = config.onError || function (res) {
            service.error = res.data;
            console.log("http-request-service error: ", res);
        };
        config.afterRequest = config.afterRequest || function () {
        };
        http(config)
            .then(config.onSuccess)
            .catch(config.onError)
            .finally(() => {
                service.firstRequest = false;
                service.loading = false;
                service.loaded = true;
                config.afterRequest();
            });
    }, delay);
};

Res.prototype.upload = function (config, files = [], key = 'attachments', single = false) {
    if (files.length) {
        let formData = new FormData();
        if (config.hasOwnProperty('data')) {
            for (let key in config.data) {
                formData.set(key, config.data[key]);
            }
        }
        if (single) {
            formData.append(key, files[0]);
        } else {
            files.forEach(function (f) {
                formData.append(key + '[]', f);
            });
        }

        config.data = formData;
    }
    this.send(config);
};
export const Resource = Res;
