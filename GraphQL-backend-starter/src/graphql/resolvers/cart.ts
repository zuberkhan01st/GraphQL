import { cartService } from "../../services/cart.services";

export const cartResolvers = {

    Query: {
        cartItems: () => cartService.getAllCartItems(),
        cart: (_: any, args: {userId: string}) => cartService.getCartItemsByUserId(args.userId)
    }

}