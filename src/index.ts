import express, {Request, Response} from "express"

import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: "tomatoes"}, {id: 2, title: "orange"}]
const adresses = [{id: 1, value: "Nezalezhnasti 12"}, {id: 2, value: "Pobedi 3"}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get("/products", (req: Request, res: Response) => {
    if (req.query.title) {
        const searchParams = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchParams) > -1))
    } else {
        res.send(products)
    }
})
app.post("/products", (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)

})
app.get("/products/:id", (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.put("/products/:id", (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})
app.delete("/products/:id", (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.get("/products/:productTitle", (req: Request, res: Response) => {
    const product = products.find(p => p.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get("/adresses", (req: Request, res: Response) => {
    res.send(adresses)
})
app.get("/adresses/:id", (req: Request, res: Response) => {
    const adress = adresses.find(p => p.id === +req.params.id)
    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})