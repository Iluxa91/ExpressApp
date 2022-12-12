import express, {Request, Response} from "express"


const app = express()
const port = process.env.PORT || 3000

const products = [{title: "tomatoes"}, {title: "orange"}]
const adresses = [{id: 1, value: "Nezalezhnasti 12"}, {id: 2, value: "Pobedi 3"}]

app.get("/products", (req: Request, res: Response) => {
    if (req.query.title) {
        const searchParams = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchParams) > -1))
    } else {
        res.send(products)
    }
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