import { userResolvers } from "./user";
import { cartResolvers } from "./cart";

export const resolvers = {
   
  Query:  { ...userResolvers.Query,
    ...cartResolvers.Query},

    User: userResolvers.User,
    CartItem: cartResolvers.CartItem,   

}