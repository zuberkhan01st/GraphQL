import type { CartItem } from "../types";

// Mock data - replace with database calls
const cartItems: CartItem[] = [
  { id: '1', productId: '101', quantity: 2, userId: '1' },
  { id: '2', productId: '102', quantity: 1, userId: '1' },
  { id: '3', productId: '103', quantity: 3, userId: '2' },
];

export class cartService {
    static getCartItemsByUserId(userId: string): CartItem[] {
        return cartItems.filter(item => item.userId === userId);
    }
    static getAllCartItems(): CartItem[] {
        return cartItems;
    }
}