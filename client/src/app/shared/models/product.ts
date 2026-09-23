export type Product = {

    id: number;
    name: string;
    description: string;
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
    stockStatus: string;

    picture: string[];

    ratingBreakdown: {
        [key: number]: number
    }

    comment:ProductComment[];
}

export interface ProductComment {
  id: number;
  comment: string;
  rating: number;
  userId: string;
  createAt: string;
}