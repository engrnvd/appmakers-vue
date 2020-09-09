export const durationFilter = function (input, format) {
    var seconds = parseInt(input);

    var h = Math.floor(seconds / 3600);
    if (h < 10) h = "0" + h;

    var rem = seconds % 3600;
    var m = Math.floor(rem / 60);
    if (m < 10) m = "0" + m;

    var s = rem % 60;
    if (s < 10) s = "0" + s;
    return format.replace('%h%', h).replace('%m%', m).replace('%s%', s);
};
