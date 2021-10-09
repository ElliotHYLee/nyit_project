import { ExpressApp } from "./Receptors/REST/Express"
import { GQLApp } from "./Receptors/GQL/GQLApp"

var express_app = new ExpressApp()
express_app.runServer()

var gql_app = new GQLApp()
gql_app.runServer()
