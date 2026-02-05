import { userTypeDef } from "./user";
import { cartTypeDef } from "./cart";

export const typeDefs = `#graphql
    
   
    ${userTypeDef}
    ${cartTypeDef}

`;