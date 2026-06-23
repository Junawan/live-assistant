import { COLLECTIONS } from "./collections";

export const FirestorePaths = {

    companies: () =>
        COLLECTIONS.COMPANIES,

    company: (companyId: string) =>
        `${COLLECTIONS.COMPANIES}/${companyId}`,

    products: (companyId: string) =>
        `${COLLECTIONS.COMPANIES}/${companyId}/${COLLECTIONS.PRODUCTS}`,

    product: (
        companyId: string,
        productId: string
    ) =>
        `${COLLECTIONS.COMPANIES}/${companyId}/${COLLECTIONS.PRODUCTS}/${productId}`,

};