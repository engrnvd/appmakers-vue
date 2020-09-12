export const timeAgoFilter = function (input, calculateDifference, convertToSeconds) {
    var seconds = parseInt(input);
    if (convertToSeconds) {
        var startDate = moment(input).toDate();
        seconds = Math.floor(startDate.getTime() / 1000);
    }
    if (calculateDifference) {
        var time = Math.floor(Date.now() / 1000);
        seconds = (time > seconds) ? time - seconds : 0;
    }

    // if in invalid input is given
    if (!seconds && seconds !== 0) return input;
    if (seconds >= 86400) { //more then a day
        var date = new Date();
        date.setSeconds(date.getSeconds() - seconds);
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    }
    // if less than a minute
    if (seconds < 60) return seconds + " seconds ago";
    var value = seconds / 60;
    var ago = "minute";
    if (value > 60) {
        value = value / 60;
        ago = "hour";
    }
    value = Math.floor(value);
    return value + " " + ago + (value > 1 ? 's' : '') + " ago";
};
