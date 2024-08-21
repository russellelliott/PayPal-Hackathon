export interface StoreItem {
    id: number;
    name: string;
    price: number;
    imgName: string;
}

export interface ShoppingCartItem {
    id: number;
    itemId: number;
    quantity: number;
}