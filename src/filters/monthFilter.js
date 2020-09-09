export const monthFilter = function (input, format) {
    var MonthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MonthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (input < 13 && input != 0) {
        if (format == 'short')
            return MonthsShort[input - 1];
        return MonthsFull[input - 1];
    }

    return "";
};
