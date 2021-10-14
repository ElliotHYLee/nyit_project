"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GQLDataMan = void 0;
var SessionMan_1 = require("../../Session/SessionMan");
var GQLDataMan = /** @class */ (function () {
    function GQLDataMan() {
        this.test0 = "first value";
        this.sessionman = SessionMan_1.SessionManager.Instnace();
    }
    GQLDataMan.Instance = function () {
        if (!GQLDataMan._instance) {
            GQLDataMan._instance = new GQLDataMan();
        }
        return this._instance;
    };
    return GQLDataMan;
}());
exports.GQLDataMan = GQLDataMan;
