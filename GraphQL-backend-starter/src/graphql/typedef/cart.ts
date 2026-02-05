export const cartTypeDef = `#graphql
    type CartItem {
        id: ID!
        productId: ID!
        quantity: Int!
    }

    type Query{
        cartItems: [CartItem]
        cart(userId: ID!): [CartItem]
    }
`;