"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GQLDataMan = void 0;
var GQLDataMan = /** @class */ (function () {
    function GQLDataMan() {
        this.test0 = "first value";
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
