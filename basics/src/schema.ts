const typeDefs: string = `#graphql
	type Game{
        id: ID!,
        title : String!,
        platform: [String!]!,
        authors: [Author!],
        reviews: [Review!],
    }

    type Review{
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author!,

    }

    type Author{
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!],
        games: [Game!]!,
    }

    type Query{
        reviews : [Review!]!,
        review(id: ID!): Review,
        games:[Game!]!,
        game(id: ID!): Game,
        authors : [Author!]!,
        author(id: ID!): Author,
    }
    type Mutation{
        addGame(game: NewGameInput!): Game!,
        updateGame(id: ID!, game: updateGameInput!): Game!,
        deleteGame(id:ID!): Boolean!,
    }

    input NewGameInput{
        title : String!,
        platform: [String!]!,
        authorIds: [ID!],
    }
    input updateGameInput{
        title : String,
        platform: [String!],
        authorIds: [ID!],
    }

`

export default typeDefs;