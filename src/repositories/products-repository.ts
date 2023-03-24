export type ProductType = {
    id: number
    title: string
}

const products = [{id: 1, title: "tomatoes"}, {id: 2, title: "orange"}]

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },

    async getProductByTitle(title: string) {
        return products.find(p => p.title === title)
    },

    async getProductById(id: number) {
        return products.find(p => p.id === id)
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },

    async updateProduct(id: number, title: string): Promise<boolean> {
        const product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },

    async deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}