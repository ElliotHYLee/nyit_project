"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
var UserSession = /** @class */ (function () {
    function UserSession(user_info) {
        this.user_info = user_info;
        this.travels = [];
    }
    UserSession.prototype.addTravel = function (travel) {
        this.travels.push(travel);
    };
    UserSession.prototype.getEmail = function () {
        return this.user_info.user_email;
    };
    UserSession.prototype.getUserInfo = function () {
        return this.user_info;
    };
    UserSession.prototype.getTravels = function () {
        return this.travels;
    };
    UserSession.prototype.validateToken = function (token) {
        console.log(token);
        console.log(this.user_info.tokenPack);
        console.log("=========");
        if (token == this.user_info.tokenPack.token)
            return true;
        else
            return false;
    };
    return UserSession;
}());
exports.UserSession = UserSession;
