export const strToMySqlDateFilter = function (str) {
    let date = new Date(str);
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return date.getFullYear() + '-' + mm + '-' + dd;
};
