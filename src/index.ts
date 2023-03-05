import express, {NextFunction, Request, Response} from "express"

import bodyParser from "body-parser"
import {productsRouter} from "./routers/productsRouter"
import {adressesRouter} from "./routers/adressesRouter"

const app = express()
const port = process.env.PORT || 3000

let requestCounter = 0;

const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    next()
}

const parserMiddleware = bodyParser({})

app.use(requestCounterMiddleware)
app.use(parserMiddleware)
app.use('/products', productsRouter)
app.use('/adresses', adressesRouter)

// start app
app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})