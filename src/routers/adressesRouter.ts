import { Router, Request, Response } from "express";
import { adressesRepository } from "../repositories/adresses-repository";

const adresses = [{id: 1, street: "Nezalezhnasti 12"}, {id: 2, street: "Pobedi 3"}]

export const adressesRouter = Router()

adressesRouter.get("/", async (req: Request, res: Response) => {
    const adresses = await adressesRepository.findAdresses(req.query.title?.toString())
    res.send(adresses)
})
adressesRouter.get("/:id", (req: Request, res: Response) => {
    const adress = adresses.find(p => p.id === +req.params.id)
    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
})