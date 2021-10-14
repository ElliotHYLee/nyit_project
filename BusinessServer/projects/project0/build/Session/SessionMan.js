"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
var UserSession_1 = require("./UserSession");
var SessionManager = /** @class */ (function () {
    function SessionManager() {
        this.sessionList = [];
    }
    SessionManager.Instnace = function () {
        if (!this._instance)
            this._instance = new SessionManager();
        return this._instance;
    };
    SessionManager.prototype.userIsLogged = function (email) {
        var result = false;
        var index = -1;
        for (var i = 0; i < this.sessionList.length; i++) {
            if (this.sessionList[i].getEmail() == email) {
                result = true;
                index = i;
                break;
            }
        }
        return [result, index];
    };
    SessionManager.prototype.getUserAt = function (index) {
        return this.sessionList[index];
    };
    SessionManager.prototype.addNewUserSession = function (user_info, travels) {
        var user = new UserSession_1.UserSession(user_info);
        for (var i = 0; i < travels.length; i++) {
            var t = {
                user_email: travels[i].user_email,
                bus_id: travels[i].bus_id,
                travel_duration: travels[i].travel_duration,
                departure_city: travels[i].departure_city,
                departure_date: travels[i].departure_date,
                arrival_city: travels[i].departure_city,
                price: travels[i].price,
            };
            user.addTravel(t);
        }
        this.sessionList.push(user);
        console.log("added new user session");
        console.log(this.sessionList.length);
    };
    SessionManager.prototype.endUserSessionByIndex = function (index) {
        this.sessionList.splice(index, 1);
    };
    SessionManager.prototype.endUserSessionByUserInfo = function (user_info) {
        var _a = this.userIsLogged(user_info.user_email), hasUser = _a[0], index = _a[1];
        if (hasUser)
            this.sessionList.splice(index, 1);
        else {
            console.log("user isn't logged in");
        }
    };
    return SessionManager;
}());
exports.SessionManager = SessionManager;
