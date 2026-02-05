export const cartTypeDef = `#graphql
    type CartItem {
        id: ID!
        productId: ID!
        quantity: Int!,
        userId: ID!
        user: User
    }

    type Query{
        cartItems: [CartItem]
        cart(userId: ID!): [CartItem]
    }
`;