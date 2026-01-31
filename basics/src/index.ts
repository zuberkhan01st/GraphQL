import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'

import typeDefs from './schema';

import db from './_db';

const resolvers = {
    Query: {
        authors() {
            return db.authors
        },
        review(_: any, args: {id: string}) {
            return db.reviews.find(review => review.id ===args.id)
        },
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers


    
});

const {url } = await startStandaloneServer(server,{
    listen:{port: 4000},
})

console.log('Server ready at port: ',4000)