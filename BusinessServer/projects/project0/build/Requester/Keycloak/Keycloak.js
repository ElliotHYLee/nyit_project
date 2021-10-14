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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUserByUsername = exports.getUsersAt = exports.hasUserName = void 0;
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var Options_1 = require("./Options");
var http_1 = __importDefault(require("http"));
function nativeRequest(options, postData) {
    var req = http_1.default.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            // console.log(body.toString())
            return body.toString();
        });
        res.on("error", function (error) {
            console.error(error);
        });
    });
    req.write(postData);
    var x = req.end();
    return x;
}
function axiosRequest(config) {
    return __awaiter(this, void 0, void 0, function () {
        var x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, axios_1.default)(config)
                        .then(function (res) {
                        return res.data;
                    })
                        .catch(function (error) {
                        return error;
                    })];
                case 1:
                    x = _a.sent();
                    return [2 /*return*/, x];
            }
        });
    });
}
function requestNewClientToken() {
    return __awaiter(this, void 0, void 0, function () {
        var config, x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = JSON.parse(JSON.stringify(Options_1.baseConfig));
                    config.method = "post";
                    config.url += "/realms/master/protocol/openid-connect/token";
                    config.data = qs_1.default.stringify({
                        username: Options_1.opt.adminID,
                        password: Options_1.opt.adminPW,
                        grant_type: "password",
                        client_id: "course1",
                    });
                    return [4 /*yield*/, axiosRequest(config)];
                case 1:
                    x = _a.sent();
                    return [2 /*return*/, x.access_token];
            }
        });
    });
}
function hasUserName(courseName, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUsersAt(courseName)];
                case 1:
                    users = _a.sent();
                    result = { userName: "none", userId: "-1" };
                    users.forEach(function (user) {
                        var x = user.username;
                        if (x == userName) {
                            result.userName = user.username;
                            result.userId = user.id;
                        }
                    });
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.hasUserName = hasUserName;
function getUsersAt(coursName) {
    return __awaiter(this, void 0, void 0, function () {
        var token, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestNewClientToken()];
                case 1:
                    token = _a.sent();
                    config = JSON.parse(JSON.stringify(Options_1.baseConfig));
                    config.method = "get";
                    config.url += "/admin/realms/" + coursName + "/users";
                    config.headers = {
                        Authorization: "Bearer " + token,
                    };
                    return [2 /*return*/, axiosRequest(config)];
            }
        });
    });
}
exports.getUsersAt = getUsersAt;
function deleteUserByUsername(courseName, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userName == "instructor") {
                        return [2 /*return*/, "can't delete instructor"];
                    }
                    return [4 /*yield*/, hasUserName(courseName, userName)];
                case 1:
                    x = _a.sent();
                    if (!(x.userName == userName)) return [3 /*break*/, 3];
                    return [4 /*yield*/, deleteUserById(courseName, x.userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "user deletion done"];
                case 3: return [2 /*return*/, "no user exists"];
            }
        });
    });
}
exports.deleteUserByUsername = deleteUserByUsername;
function deleteUserById(courseName, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestNewClientToken()];
                case 1:
                    token = _a.sent();
                    config = {
                        method: "delete",
                        url: "http://54.176.129.155/auth/admin/realms/" + courseName + "/users/" + userId,
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    };
                    return [2 /*return*/, axiosRequest(config)];
            }
        });
    });
}
function createUser(courseName, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var token, x, options, data, result, x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestNewClientToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, hasUserName(courseName, userName)];
                case 2:
                    x = _a.sent();
                    if (x.userName == userName)
                        return [2 /*return*/, "user already exists"];
                    options = {
                        method: "POST",
                        hostname: "54.176.129.155",
                        path: "/auth/admin/realms/" + courseName + "/users",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        maxRedirects: 20,
                    };
                    data = JSON.stringify({
                        createdTimestamp: 1588880747548,
                        username: userName,
                        credentials: [
                            {
                                type: "password",
                                value: "test123",
                                temporary: false,
                            },
                        ],
                        enabled: true,
                        totp: false,
                        firstName: "",
                        lastName: "",
                        email: "",
                        disableableCredentialTypes: [],
                        requiredActions: [],
                        notBefore: 0,
                    });
                    result = nativeRequest(options, data);
                    return [4 /*yield*/, hasUserName(courseName, userName)];
                case 3:
                    x = _a.sent();
                    if (x.userName == userName)
                        return [2 /*return*/, "user addition done"];
                    return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
