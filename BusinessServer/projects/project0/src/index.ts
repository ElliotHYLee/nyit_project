import { ExpressApp } from "./FrontReception/REST/Express"
import { GQLApp } from "./FrontReception/GQL/GQLApp"
import { connect2mdb } from "./DBBridge/Gateway/LogDBHandles"
import { connect2busdb } from "./DBBridge/Bus/BUSDBHandle"
import { connect2userinfodb } from "./DBBridge/UserInfo/UserInfoDBHandle"
import { connect2ticketdb } from "./DBBridge/Tickets/TicketHandle"

connect2mdb()
connect2busdb()
connect2userinfodb()
connect2ticketdb()

var express_app = new ExpressApp()
express_app.runServer()

var gql_app = new GQLApp()
gql_app.runServer()
