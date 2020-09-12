import {byteConversionFilter} from "./filters/byteConversion";
import {groupByFilter} from "./filters/group-by";
import {truncateFilter} from "./filters/truncate";
import {searchFilter} from "./filters/search";
import {strToMySqlDateFilter} from "./filters/str-to-mysql-date";
import {monthFilter} from "./filters/monthFilter";
import {durationFilter} from "./filters/duration";
import {wordsFilter} from "./filters/words";
import {relativeDate} from "./filters/relativeDate";
import {timeAgoFilter} from "./filters/timeAgo";
import {usPhone} from "./filters/usPhone";
import {phoneNumber} from "./filters/phoneNumber";
import {currency} from "./filters/currency";

export const FilterRegistrar = {
    register(Vue) {
        Vue.filter('byteConversion', byteConversionFilter);
        Vue.filter('groupBy', groupByFilter);
        Vue.filter('search', searchFilter);
        Vue.filter('truncate', truncateFilter);
        Vue.filter('strToMySqlDate', strToMySqlDateFilter);
        Vue.filter('month', monthFilter);
        Vue.filter('duration', durationFilter);
        Vue.filter('words', wordsFilter);
        Vue.filter('relativeDate', relativeDate);
        Vue.filter('timeAgo', timeAgoFilter);
        Vue.filter('usPhone', usPhone);
        Vue.filter('phoneNumber', phoneNumber);
        Vue.filter('currency', currency);
    }
};
