import { cartService } from "../../services/cart.services";
import { UserService } from "../../services/user.service";
import type { CartItem } from "../../types";
import type { User } from "../../types";


export const cartResolvers = {

    Query: {
        cartItems: () => cartService.getAllCartItems(),
        cart: (_: any, args: {userId: string}) => cartService.getCartItemsByUserId(args.userId)
    },

    CartItem :{
        user: async (parent: CartItem): Promise<User> => {
            const dbUser = await UserService.getUserById(parent.userId);
            return {
                id: dbUser!._id.toString(),
                name: dbUser!.name,
                email: dbUser!.email
            };
        },
        
    }

}