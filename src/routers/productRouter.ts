import { Request, Response, Router } from "express";

const products = [{id: 1, title: "tomatoes"}, {id: 2, title: "orange"}]


export const productsRouter = Router({})

productsRouter.get("/products", (req: Request, res: Response) => {
    if (req.query.title) {
        const searchParams = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchParams) > -1))
    } else {
        res.send(products)
    }
})
productsRouter.post("/", (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)

})
productsRouter.get("/:id", (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.put("/:id", (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete("/:id", (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            res.send(204)
            return
        }
    }
    res.send(404)
})
productsRouter.get("/:productTitle", (req: Request, res: Response) => {
    const product = products.find(p => p.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})