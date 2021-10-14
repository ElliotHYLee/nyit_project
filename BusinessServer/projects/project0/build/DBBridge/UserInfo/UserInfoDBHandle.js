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
exports.deleteAllUserInfo = exports.createNewUserInfo = exports.createDummyUserInfo = exports.findUserByEmail = exports.findAllUserInfo = exports.connect2userinfodb = void 0;
var UserInfoSchema_1 = require("./UserInfoSchema");
var DummyUserInfo_1 = require("./DummyUserInfo");
var mongoose = require("mongoose");
var userinfo_conn;
function connect2userinfodb() {
    try {
        userinfo_conn = mongoose.createConnection("mongodb://admin:admin@userinfo_mongo:27017", {
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 3000,
        });
        console.log("User Info DB Connected");
    }
    catch (err) {
        console.log(err);
    }
}
exports.connect2userinfodb = connect2userinfodb;
function findAllUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var x, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    x = userinfo_conn.model("user_info", UserInfoSchema_1.UserInfoSchema);
                    _a = { status: "1" };
                    return [4 /*yield*/, x.find()];
                case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
                case 2:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [2 /*return*/, { status: "-1" }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAllUserInfo = findAllUserInfo;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var x, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x = userinfo_conn.model("user_info", UserInfoSchema_1.UserInfoSchema);
                    return [4 /*yield*/, x.find({ user_email: email })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.findUserByEmail = findUserByEmail;
function createDummyUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            DummyUserInfo_1.DummyUserInfo.forEach(function (userinfo) {
                createNewUserInfo(userinfo);
            });
            return [2 /*return*/];
        });
    });
}
exports.createDummyUserInfo = createDummyUserInfo;
function createNewUserInfo(userinfo) {
    return __awaiter(this, void 0, void 0, function () {
        var UserInfoModel, NewUserInfo, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    UserInfoModel = userinfo_conn.model("user_info", UserInfoSchema_1.UserInfoSchema);
                    NewUserInfo = new UserInfoModel(userinfo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, NewUserInfo.save()];
                case 2:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/, result];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, e_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createNewUserInfo = createNewUserInfo;
function deleteAllUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userinfo_conn.model("user_info", UserInfoSchema_1.UserInfoSchema);
            userinfo_conn.dropCollection("user_infos");
            return [2 /*return*/];
        });
    });
}
exports.deleteAllUserInfo = deleteAllUserInfo;
