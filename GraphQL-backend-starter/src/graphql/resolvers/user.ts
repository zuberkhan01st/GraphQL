import { UserService } from "../../services/user.service";
import { cartService } from "../../services/cart.services";
import type { CartItem } from "../../types";

export const userResolvers = {
    Query:{
        users : ()=> UserService.getAllUsers(),
        user: (_: any, args: {id: string}) => UserService.getUserById(args.id)
    },
    User:{
        cart: (parent: {id: string}): CartItem[] => cartService.getCartItemsByUserId(parent.id)
    }
    
}

