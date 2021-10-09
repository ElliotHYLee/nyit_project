"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermMemory = exports.getAddress = void 0;
function getAddress(socket) {
    var temp = socket.remoteAddress.toString();
    var ip = temp.split(":")[3];
    var port = socket.remotePort;
    return [ip, port];
}
exports.getAddress = getAddress;
var ShortTermMemory = /** @class */ (function () {
    function ShortTermMemory() {
        this.ipList = new Array();
        this.idx = 0;
    }
    ShortTermMemory.Instance = function () {
        if (!ShortTermMemory._instance) {
            ShortTermMemory._instance = new ShortTermMemory();
        }
        return this._instance;
    };
    ShortTermMemory.prototype.nextIdx = function () {
        if (this.idx < 100)
            this.idx++;
        else
            this.idx = 0;
    };
    ShortTermMemory.prototype.storeIP = function (newIP) {
        this.ipList[this.idx] = newIP;
        this.nextIdx();
    };
    ShortTermMemory.prototype.checkIP = function (newIP) {
        this.storeIP(newIP);
        var cnt = 0;
        var flag = false;
        this.ipList.forEach(function (ip) {
            if (ip == newIP)
                cnt++;
            console.log(cnt);
            if (cnt >= 3)
                flag = true;
        });
        if (flag)
            return false;
        else
            return true;
    };
    return ShortTermMemory;
}());
exports.ShortTermMemory = ShortTermMemory;
