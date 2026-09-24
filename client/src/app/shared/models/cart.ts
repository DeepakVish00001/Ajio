import { nanoid } from 'nanoid';

export type CartType = {
    id: string;
    items: CartItems[];
}

export type CartItems = {
    productId: number;
    productName: string;
    originalPrice: number;
    price: number;
    quantityInStock: number;
    productCategory: string;
    productBrand: string;
    imageUrl: string;
}

export class Cart implements CartType {
    id = nanoid();
    items: CartItems[] = [];
}