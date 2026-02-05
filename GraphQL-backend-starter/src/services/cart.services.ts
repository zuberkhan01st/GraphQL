import { CartItem } from '../models/Cart';

export class cartService {
    
    static async getAllCartItems() {
        try {
            return await CartItem.find()
                .populate('userId', 'name email')
                .sort({ createdAt: -1 })
                .lean();
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error}`);
        }
    }

    static async getCartItemsByUserId(userId: string) {
        try {
            return await CartItem.find({ userId })
                .sort({ createdAt: -1 })
                .lean();
        } catch (error) {
            throw new Error(`Failed to get cart items for user: ${error}`);
        }
    }

    static async getCartItemById(id: string) {
        try {
            return await CartItem.findById(id).lean();
        } catch (error) {
            throw new Error(`Failed to get cart item: ${error}`);
        }
    }

    static async addCartItem(userId: string, productId: string, quantity: number, price?: number) {
        try {
            const existingItem = await CartItem.findOne({ userId, productId });
            
            if (existingItem) {
                existingItem.quantity += quantity;
                return await existingItem.save();
            }

            const cartItem = new CartItem({ 
                userId, 
                productId, 
                quantity,
                ...(price && { price })
            });
            return await cartItem.save();
        } catch (error) {
            throw new Error(`Failed to add cart item: ${error}`);
        }
    }

    static async updateCartItem(id: string, quantity: number) {
        try {
            return await CartItem.findByIdAndUpdate(
                id,
                { quantity },
                { new: true, runValidators: true }
            ).lean();
        } catch (error) {
            throw new Error(`Failed to update cart item: ${error}`);
        }
    }

    static async deleteCartItem(id: string) {
        try {
            const result = await CartItem.findByIdAndDelete(id);
            return !!result;
        } catch (error) {
            throw new Error(`Failed to delete cart item: ${error}`);
        }
    }

    static async clearCart(userId: string) {
        try {
            const result = await CartItem.deleteMany({ userId });
            return result.deletedCount || 0;
        } catch (error) {
            throw new Error(`Failed to clear cart: ${error}`);
        }
    }
}