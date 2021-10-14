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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var LogDBHandles_1 = require("../../DBBridge/LogDBHandles");
var rest = __importStar(require("../../Controller/RESTController"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
        this.app = (0, express_1.default)();
        this.port = 3000;
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        (0, LogDBHandles_1.connect2mdb)();
        this.app.get("/", rest.basicConnection);
        this.app.get("/show", rest.showLogs);
        this.app.get("/deleteall", rest.deleteAllLogs);
        this.app.get("/deletebyip", rest.deleteIP);
        this.app.get("/showbl", rest.getAllBlackList);
        this.app.get("/deleteallbl", rest.deleteAllBlackList);
    }
    ExpressApp.prototype.runServer = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("server started at http://localhost:" + _this.port);
        });
    };
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
