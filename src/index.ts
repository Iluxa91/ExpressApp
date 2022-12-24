import express, {Request, Response} from "express"

import bodyParser from "body-parser"
import { productsRouter } from "./routers/productRouter"
import { adressesRouter } from "./routers/adressesRouter"

const app = express()
const port = process.env.PORT || 3000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/adresses', adressesRouter)

// start app
app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})