export const phoneNumber = function (number) {
    number = String(number);
    if (!number || number.match(/.+@.+\..*/)) return number; // skip emails
    number = number.replace(/\D/g, ""); //Remove non-digit characters
    if (number.length > 11) {
        return number; //Probably Social media id used
    }
    if (number.length > 10) { //Remove string form start in case of length more then 10 digits (for example 13176897120)
        number = number.substr(number.length - 10);
    }
    return number;
};
