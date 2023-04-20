import {ProductType} from "../repositories/db";
import {productsRepository} from "../repositories/products-db-repository";

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(title);
    },

    // async getProductByTitle(title: string): Promise<ProductType | null> {
    //     const product = __products.find(p => p.title === title);
    //     return product ? product : null
    // },

    async getProductById(id: number): Promise<ProductType | null> {
        return productsRepository.getProductById(id);
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const createdProduct = productsRepository.createProduct(newProduct);
        return createdProduct
    },

    async updateProduct(id: number, title: string): Promise<boolean> {
        return productsRepository.updateProduct(id, title)
    },

    async deleteProduct(id: number): Promise<boolean> {
        return productsRepository.deleteProduct(id)
    }
}