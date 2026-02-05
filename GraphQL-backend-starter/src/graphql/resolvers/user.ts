import { UserService } from "../../services/user.service";
import { cartService } from "../../services/cart.services";
import type { CartItem } from "../../types";

export const userResolvers = {
    Query:{
        users : ()=> UserService.getAllUsers(),
        user: (_: any, args: {id: string}) => UserService.getUserById(args.id)
    },
    User:{
        cart: async (parent: {id: string}): Promise<CartItem[]> => {
            const items = await cartService.getCartItemsByUserId(parent.id);
            return items.map(item => ({
                id: item._id.toString(),
                productId: item.productId,
                quantity: item.quantity,
                userId: item.userId.toString()
            }));
        }
    }
    
}

