import moment from 'moment';

export const relativeDate = function (input, formats = {
    sameDay: '[Today] hh:mm a',
    nextDay: '[Tomorrow] hh:mm a',
    nextWeek: 'dddd hh:mm a',
    lastDay: '[Yesterday] hh:mm a',
    lastWeek: '[Last] dddd hh:mm a',
    sameElse: 'DD MMM YYYY hh:mm a'
}) {
    return moment(input).calendar(null, formats)
};
