import { nanoid } from 'nanoid';

export type CartType = {
    id: string;
    items: CartItems[];
}

export type CartItems = {
    productId: number;
    productName: string;
   // originalPrice: number;
    price: number;
    quantity: number;
    category: string;
    brand: string;
    imageUrl: string;
}

export class Cart implements CartType {
    id = nanoid();
    items: CartItems[] = [];
}