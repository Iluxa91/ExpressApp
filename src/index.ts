import express, {Request, Response} from 'express'


const app = express()
const port = process.env.PORT || 3000

const products = [{title: "tomatoes"}, {title: "orange"}]
const adresses = [{value: "Nezalezhnasti 12"}, {value: "Pobedi 3"}]

app.get('/products', (req:Request, res: Response)=>{
    res.send(products)
})

app.get('/adresses',(req:Request, res: Response)=>{
    res.send(adresses)
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})