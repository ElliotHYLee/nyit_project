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
exports.validateRequestedUser = exports.createUserSession = exports.getUserToken = void 0;
var kc = __importStar(require("../Controller/Keycloak/Keycloak"));
var ticketAPI = __importStar(require("../DBBridge/Tickets/TicketHandle"));
var UserInfoDBHandle_1 = require("../DBBridge/UserInfo/UserInfoDBHandle");
var SessionMan_1 = require("../Session/SessionMan");
function getUserToken(raw) {
    return __awaiter(this, void 0, void 0, function () {
        var encrypted, decrypted, data, user_email, pw, result, token, now, duration_sec, expiration, tokenPack;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encrypted = raw.data;
                    decrypted = encrypted;
                    data = JSON.parse(decrypted);
                    user_email = data.user_email;
                    pw = data.pw;
                    // get keycloack user token
                    console.log("getting kc");
                    console.log(user_email);
                    return [4 /*yield*/, kc.requestClientToken(user_email, pw)
                        //   console.log(result)
                    ];
                case 1:
                    result = _a.sent();
                    //   console.log(result)
                    if (result.status == -1)
                        return [2 /*return*/, { status: -1, data: {} }];
                    token = result.data.access_token;
                    now = new Date();
                    duration_sec = 1000 * 60 * 60;
                    expiration = new Date(now.getTime() + duration_sec) // 1 hour expiration
                    ;
                    tokenPack = {
                        token: token,
                        expiration: expiration.toISOString().slice(0, 19),
                        duration: duration_sec,
                    };
                    return [2 /*return*/, { status: 1, data: { user_email: user_email, tokenPack: tokenPack } }]; //[user_email, tokenPack]
            }
        });
    });
}
exports.getUserToken = getUserToken;
function createUserSession(user_email, tokenPack) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, isLogged, index, user_info_raw, user_info, tickets, travels, x;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = SessionMan_1.SessionManager.Instnace().userIsLogged(user_email), isLogged = _a[0], index = _a[1];
                    if (isLogged) {
                        SessionMan_1.SessionManager.Instnace().endUserSessionByIndex(index);
                    }
                    return [4 /*yield*/, (0, UserInfoDBHandle_1.findUserByEmail)(user_email)];
                case 1:
                    user_info_raw = (_b.sent())[0];
                    user_info = {
                        tokenPack: tokenPack,
                        user_email: user_info_raw.user_email,
                        user_first_name: user_info_raw.user_first_name,
                        user_last_name: user_info_raw.user_last_name,
                        user_card: user_info_raw.user_card,
                        user_card_name: user_info_raw.user_card_name,
                    };
                    return [4 /*yield*/, ticketAPI.findTicketByEmail(user_info.user_email)
                        // create travels type
                    ];
                case 2:
                    tickets = _b.sent();
                    travels = [];
                    if (tickets.length > 0) {
                        tickets.forEach(function (ticket) {
                            var travel = {
                                user_email: ticket.user_email,
                                bus_id: ticket.bus_id,
                                travel_duration: ticket.travel_duration,
                                departure_city: ticket.departure_city,
                                departure_date: ticket.departure_date,
                                arrival_city: ticket.arrival_city,
                                price: ticket.price,
                            };
                            travels.push(travel);
                        });
                    }
                    // create session
                    SessionMan_1.SessionManager.Instnace().addNewUserSession(user_info, travels);
                    x = SessionMan_1.SessionManager.Instnace().getUserAt(0);
                    console.log(x);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createUserSession = createUserSession;
function validateRequestedUser(user_email, token) {
    console.log(SessionMan_1.SessionManager.Instnace().sessionList.length);
    var _a = SessionMan_1.SessionManager.Instnace().userIsLogged(user_email), isLogged = _a[0], index = _a[1];
    if (!isLogged)
        return { status: -1, data: "user not logged" };
    var user_session = SessionMan_1.SessionManager.Instnace().getUserAt(index);
    console.log(token);
    var tokenIsValid = user_session.validateToken(token);
    if (!tokenIsValid)
        return { status: -1, data: "user token not mathed" };
    else
        return { status: 1, data: { userIndex: index } };
}
exports.validateRequestedUser = validateRequestedUser;
