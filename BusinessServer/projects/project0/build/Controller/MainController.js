"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIP = exports.filterBadIP = void 0;
var Utils_1 = require("./DBBridge/Gateway/Utils");
var BlackListDBHandles_1 = require("../DBBridge/Gateway/BlackListDBHandles");
var ShortTermMemory_1 = require("./DBBridge/Gateway/ShortTermMemory");
var LogDBHandles_1 = require("../DBBridge/Gateway/LogDBHandles");
function filterBadIP(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, ip, port, good2go, blackList, i, blackIP;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = (0, Utils_1.getAddress)(socket), ip = _a[0], port = _a[1];
                    console.log(ip);
                    good2go = true;
                    if (!(ip != "172.17.0.1")) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, BlackListDBHandles_1.findAllBL)()];
                case 1:
                    blackList = _b.sent();
                    for (i = 0; i < blackList.length; i++) {
                        blackIP = blackList[i].ip;
                        if (blackIP == ip) {
                            good2go = false;
                            break;
                        }
                    }
                    // check short term memeory IP
                    if (good2go)
                        good2go && (good2go = ShortTermMemory_1.ShortTermMemory.Instance().checkIP(ip));
                    _b.label = 2;
                case 2: return [2 /*return*/, [ip, port, good2go]];
            }
        });
    });
}
exports.filterBadIP = filterBadIP;
function logIP(ip, port, good2go) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            result = true;
            try {
                (0, LogDBHandles_1.logConn)(ip, port, good2go);
            }
            catch (_b) {
                result = false;
            }
            return [2 /*return*/, result];
        });
    });
}
exports.logIP = logIP;
