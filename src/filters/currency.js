export const currency = function (input,format) {
    return format + parseFloat(input).toFixed(2);
};
