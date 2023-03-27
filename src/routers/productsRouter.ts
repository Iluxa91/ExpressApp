import {Request, Response, Router} from "express";
import {productsRepository, ProductType} from "../repositories/products-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 15
}).withMessage('Title length should be from 3 till 10 symbols')


productsRouter.get("/", async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const product = await productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

// productsRouter.get("/:productTitle", (req: Request, res: Response) => {
//     const product = productsRepository.getProductByTitle(req.params.productTitle)
//     if (product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })

productsRouter.post("/",
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })

productsRouter.put("/:id",
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            const product = await productsRepository.getProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })

productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const isDeleted = await productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})