export const truncateFilter = function (string, limit) {
    if (!limit) return string;

    let output = string.substring(0, limit);
    if (string.length > limit) output += ' ...';
    return output;
};
