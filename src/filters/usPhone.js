export const usPhone = function (input, format) {
    if (!input) return '';
    return input.replace(/.+(\d{10})$/, '$1');
};
