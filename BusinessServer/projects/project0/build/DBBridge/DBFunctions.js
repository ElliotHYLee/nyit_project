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
exports.deleteByIP = exports.deleteAll = exports.logConn = exports.findAll = exports.connect = void 0;
var Schemas_1 = require("./Schemas");
var mongoose = require("mongoose");
function connect() {
    mongoose
        .connect("mongodb://admin:admin@mongo:27017", {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 3000,
    })
        .then(function () { return console.log("MongoDB Connected"); })
        .catch(function (err) { return console.log(err); });
}
exports.connect = connect;
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Schemas_1.ConnLog.find()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAll = findAll;
function logConn(ip, port, accepted) {
    return __awaiter(this, void 0, void 0, function () {
        var newLog;
        return __generator(this, function (_a) {
            newLog = new Schemas_1.ConnLog({
                ip: ip,
                port: port,
                accept: accepted,
            });
            newLog.save().then(function (item) {
                console.log(item);
            });
            return [2 /*return*/];
        });
    });
}
exports.logConn = logConn;
function deleteAll() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            mongoose.connection.db.dropCollection("connlogs", function (err, result) {
                console.log(err);
            });
            return [2 /*return*/];
        });
    });
}
exports.deleteAll = deleteAll;
function deleteByIP(ip) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Schemas_1.ConnLog.deleteOne({ ip: ip }, function (err) {
                console.log(err);
            });
            return [2 /*return*/];
        });
    });
}
exports.deleteByIP = deleteByIP;
