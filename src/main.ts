import {Response, Request} from "express"
import express = require('express');
const app: express.Application = express()
const port = 8080

// define a route handler for the default home page
app.get( "/", (_: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
    res.send(Buffer.from('<p>hello world!</p>'))
} )

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` )
} )