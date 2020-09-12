String.prototype.splice = function (startIndex, deleteCount, stringToInsert) {
    return this.slice(0, startIndex) + stringToInsert + this.slice(startIndex + Math.abs(deleteCount));
};

String.random = String.random || function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

