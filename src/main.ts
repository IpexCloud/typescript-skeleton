const { createTerminus } = require('@godaddy/terminus');
import {Response, Request} from "express"
import {useExpressServer} from "routing-controllers"
import express = require('express')
const app: express.Application = express()
const port = 8080
import * as http from 'http'

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

const server = http.createServer(app);

createTerminus(server, {
    onShutdown: () => {
        console.log('server is starting cleanup');
        return Promise.all([
            // your clean logic, like closing database connections
        ])
    }
})

// start the express server
server.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` )
} )