"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ShortTermMemory = void 0;
var Utils_1 = require("./Utils");
var BlackListDBHandles_1 = require("../../DBBridge/Gateway/BlackListDBHandles");
var policy_bl = __importStar(require("./GateWayPolicy"));
var ShortTermMemory = /** @class */ (function () {
    function ShortTermMemory() {
        this.ipList = new Array();
        this.idx = 0;
        this.refresher();
    }
    ShortTermMemory.Instance = function () {
        if (!ShortTermMemory._instance) {
            ShortTermMemory._instance = new ShortTermMemory();
        }
        return this._instance;
    };
    ShortTermMemory.prototype.refresher = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        this.ipList = new Array();
                        return [4 /*yield*/, (0, Utils_1.delaySeconds)(policy_bl.shortTermMemoryRefresherTimeSecond)];
                    case 1:
                        _a.sent();
                        console.log("refreshed");
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
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
            if (cnt >= policy_bl.blackListTolereanceFrequency) {
                flag = true;
                (0, BlackListDBHandles_1.saveBlackList)(newIP);
            }
        });
        if (flag)
            return false;
        else
            return true;
    };
    return ShortTermMemory;
}());
exports.ShortTermMemory = ShortTermMemory;
