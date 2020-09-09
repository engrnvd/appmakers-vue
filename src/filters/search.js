export const objectSearchFilter = function (obj, search, keys = []) {
    for (const property in obj) {
        if (keys.length && !keys.includes(property)) continue;
        let data = obj[property];
        switch (typeof data) {
            case "bigint":
            case "number":
                data = data.toString();
            //Let's fall in string case
            case "string":
                if (data.toLowerCase().indexOf(search) > -1) return true;
                break;
            case "object":
                if (data instanceof Array) {
                    return data.find(arr => objectSearchFilter(arr, search, keys));
                } else if (data instanceof Object) {
                    return objectSearchFilter(data, search, keys);
                }
                break;
            case "boolean":
                if (search === data) return true;
                break;
        }
    }
    return false;
};
export const searchFilter = function (data, query, keys = []) {
    query = query ? query.toLowerCase().trim() : null;
    if (!query) return data;
    if (data instanceof Array) return data.filter(obj => objectSearchFilter(obj, query, keys));
    return objectSearchFilter(data, query, keys);
};