import { addressesCollection, AddressType } from "./db";

export const adressesRepository = {
    async findAdresses(title: string | null | undefined): Promise<AddressType[]> {
        const filter: any = {}
        if (title) filter.title = {$regex: title};
        return addressesCollection.find(filter).toArray();
    },
}