export const AtLeastOneDigit = (value) => {
    return !!value.toString().match(/\d/i);
}
