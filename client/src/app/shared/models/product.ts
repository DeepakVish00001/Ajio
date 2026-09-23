export type Product = {

    id: number;
    name: string;
    originalPrice: number;
    price: number;
    discountPercentage: number;
    quantityInStock: number;
    rating: number;
    totalReviews: number;
    likes: number;
    productCategory: string;
    productBrand: string;
    imageUrl: string;

    picture: string[];
}