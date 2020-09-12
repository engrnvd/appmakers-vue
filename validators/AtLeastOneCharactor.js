export const AtLeastOneCharacter = (value) => {
    return !!value.toString().match(/[a-zA-Z]/i);
}
