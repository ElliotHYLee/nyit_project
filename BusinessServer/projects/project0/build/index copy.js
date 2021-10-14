"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express_1 = require("./FrontReception/REST/Express");
var GQLApp_1 = require("./FrontReception/GQL/GQLApp");
var express_app = new Express_1.ExpressApp();
express_app.runServer();
var gql_app = new GQLApp_1.GQLApp();
gql_app.runServer();
