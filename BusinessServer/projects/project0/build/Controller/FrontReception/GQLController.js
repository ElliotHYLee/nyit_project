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
exports.getAllBusSchedules = exports.getUserInfo = exports.bookNewTicket = exports.createNewUser = exports.loginProcess = void 0;
var UserSessionController_1 = require("../UserSessionController");
var kc = __importStar(require("../Keycloak/Keycloak"));
var UserInfoDBHandle_1 = require("../../DBBridge/UserInfo/UserInfoDBHandle");
var GQLExit_1 = require("./GQLExit");
var SessionMan_1 = require("../../Session/SessionMan");
var TicketHandle_1 = require("../../DBBridge/Tickets/TicketHandle");
var BUSDBHandle_1 = require("../../DBBridge/Bus/BUSDBHandle");
function loginProcess(root, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UserSessionController_1.getUserToken)(args)];
                case 1:
                    result = _a.sent();
                    if (result.status == -1)
                        return [2 /*return*/, (0, GQLExit_1.GQLDrainError)()
                            // create session
                        ];
                    // create session
                    return [4 /*yield*/, (0, UserSessionController_1.createUserSession)(result.data.user_email, result.data.tokenPack)];
                case 2:
                    // create session
                    _a.sent();
                    return [2 /*return*/, (0, GQLExit_1.GQLDrain)(result.status, result.data.tokenPack)];
            }
        });
    });
}
exports.loginProcess = loginProcess;
function createNewUser(root, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var data_raw, data, res, result, user_info, xx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('create new user request being handled');
                    data_raw = args.data;
                    data = JSON.parse(data_raw);
                    console.log(data);
                    return [4 /*yield*/, kc.createUser(data.user_email, data.pw)];
                case 1:
                    res = _a.sent();
                    if (res.status == -1) {
                        console.log("err");
                        return [2 /*return*/, (0, GQLExit_1.GQLDrainError)()];
                    }
                    console.log("user created in KC");
                    return [4 /*yield*/, (0, UserSessionController_1.getUserToken)(args)];
                case 2:
                    result = _a.sent();
                    if (result.status == -1)
                        return [2 /*return*/, (0, GQLExit_1.GQLDrainError)()
                            // save user_info to mongo
                        ];
                    user_info = {
                        tokenPack: "",
                        user_email: data.user_email,
                        user_first_name: data.user_first_name,
                        user_last_name: data.user_last_name,
                        user_card: data.card,
                        user_card_name: data.user_card_name,
                    };
                    return [4 /*yield*/, (0, UserInfoDBHandle_1.createNewUserInfo)(user_info)
                        //create user session
                    ];
                case 3:
                    xx = _a.sent();
                    //create user session
                    return [4 /*yield*/, (0, UserSessionController_1.createUserSession)(result.data.user_email, result.data.tokenPack)];
                case 4:
                    //create user session
                    _a.sent();
                    return [2 /*return*/, (0, GQLExit_1.GQLDrain)(1, result.data.tokenPack)];
            }
        });
    });
}
exports.createNewUser = createNewUser;
function bookNewTicket(root, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var data_raw, data, isValid, bus_id, theBus, total_seats, booked_seats, x, travel, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data_raw = args.data;
                    data = JSON.parse(data_raw);
                    isValid = (0, UserSessionController_1.validateRequestedUser)(data.user_email, data.token);
                    if (!isValid)
                        return [2 /*return*/, (0, GQLExit_1.GQLDrainError)()
                            // console.log(isValid)
                            // check total setas and booked seats
                            // console.log(data.bus_id)
                        ];
                    bus_id = data.bus_id;
                    return [4 /*yield*/, (0, BUSDBHandle_1.findBusById)(bus_id)];
                case 1:
                    theBus = (_a.sent())[0] // asssume only one
                    ;
                    total_seats = theBus.total_seats;
                    booked_seats = theBus.booked_seats;
                    if (total_seats <= booked_seats)
                        return [2 /*return*/, (0, GQLExit_1.GQLDrain)(-1, "seat unavailable")
                            // update bus ticket remaining number
                        ];
                    return [4 /*yield*/, (0, BUSDBHandle_1.increaseBookedSeatsByBusId)(bus_id, booked_seats + 1)
                        // console.log(x)
                        // create new plan for user.
                    ];
                case 2:
                    x = _a.sent();
                    travel = {
                        user_email: data.user_email,
                        bus_id: bus_id,
                        travel_duration: theBus.travel_duration,
                        departure_city: theBus.departure_city,
                        departure_date: theBus.departure_date,
                        arrival_city: theBus.arrival_city,
                        price: theBus.price,
                    };
                    return [4 /*yield*/, (0, TicketHandle_1.createNewTicket)(travel)
                        // console.log("==========")
                        // console.log(result)
                    ];
                case 3:
                    result = _a.sent();
                    // console.log("==========")
                    // console.log(result)
                    return [2 /*return*/, (0, GQLExit_1.GQLDrain)(1, "ticket booked")];
            }
        });
    });
}
exports.bookNewTicket = bookNewTicket;
function getUserInfo(root, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var data_raw, data, isValid, user_info, x, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("am i here");
                    data_raw = args.data;
                    data = JSON.parse(data_raw);
                    isValid = (0, UserSessionController_1.validateRequestedUser)(data.user_email, data.token);
                    if (!isValid)
                        return [2 /*return*/, (0, GQLExit_1.GQLDrainError)()];
                    console.log(isValid);
                    user_info = JSON.parse(JSON.stringify(SessionMan_1.SessionManager.Instnace().getUserAt(isValid.data.userIndex).getUserInfo()));
                    console.log(user_info);
                    return [4 /*yield*/, (0, TicketHandle_1.findTicketByEmail)(user_info.user_email)];
                case 1:
                    x = _a.sent();
                    console.log(x);
                    user_info.tokenPack = {};
                    data = { user_info: user_info, travels: x };
                    // pack all and send
                    return [2 /*return*/, (0, GQLExit_1.GQLDrain)(1, data)];
            }
        });
    });
}
exports.getUserInfo = getUserInfo;
function getAllBusSchedules() {
    return __awaiter(this, void 0, void 0, function () {
        var allBusList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, BUSDBHandle_1.findAllBus)()];
                case 1:
                    allBusList = _a.sent();
                    return [2 /*return*/, (0, GQLExit_1.GQLDrain)(1, allBusList)];
            }
        });
    });
}
exports.getAllBusSchedules = getAllBusSchedules;
