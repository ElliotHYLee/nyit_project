"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.delaySeconds = exports.delayMinutes = exports.delayHours = exports.getAddress = void 0;
function getAddress(socket) {
    var temp = socket.remoteAddress.toString();
    var ip = temp.split(":")[3];
    var port = socket.remotePort;
    return [ip, port];
}
exports.getAddress = getAddress;
function delayHours(h) {
    return delayMinutes(h * 60);
}
exports.delayHours = delayHours;
function delayMinutes(m) {
    return delaySeconds(m * 60);
}
exports.delayMinutes = delayMinutes;
function delaySeconds(s) {
    return delay(s * 1000);
}
exports.delaySeconds = delaySeconds;
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.delay = delay;
