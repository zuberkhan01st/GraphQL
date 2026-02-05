    

export const userTypeDef = `#graphql
    type User{
        id: ID!
        name: String!
        email: String!  
        cart: [CartItem]
    }

    type Query{
        users: [User]
        user(id: ID!): User
    }
`;
