import { productsCollection, ProductType } from "./db";

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}
        if (title) filter.title = {$regex: title};
        return productsCollection.find(filter).toArray();
    },

    // async getProductByTitle(title: string): Promise<ProductType | null> {
    //     const product = __products.find(p => p.title === title);
    //     return product ? product : null
    // },

    async getProductById(id: number): Promise<ProductType | null> {
        const product: ProductType | null = await productsCollection.findOne({id});
        return product ? product : null
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const result = await productsCollection.insertOne(newProduct);
        return newProduct
    },

    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id}, {$set: {title}});
        return result.matchedCount === 1;
    },

    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id});
        return result.deletedCount === 1;
    }
}