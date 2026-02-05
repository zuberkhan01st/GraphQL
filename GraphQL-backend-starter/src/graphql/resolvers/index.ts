import { userResolvers } from "./user";
import { cartResolvers } from "./cart";

export const resolvers = {
   
    ...userResolvers,
    ...cartResolvers
}