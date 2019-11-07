import {Response, Request} from "express"
import {useExpressServer} from "routing-controllers"
import express = require('express')
const app: express.Application = express()
const port = 8080

useExpressServer(app, {
    defaults: {
        nullResultCode: 404,
        undefinedResultCode: 204,
    },
    cors: {
        origin: [`http://localhost:${port}`]
    },
    // routePrefix: "/api", //
    controllers: [__dirname + "/interfaces/rest/controllers/**/*.+(js|ts)"]
})

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` )
} )