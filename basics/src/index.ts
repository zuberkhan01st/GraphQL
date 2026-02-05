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
        },

        game(_:any, args: {id:string}){
            return db.games.find(game=> game.id===args.id)
        },

        author(_:any, args: {id:string}){
            return db.authors.find((author)=> author.id===args.id)
        }
    },
    Game:{
        reviews(parent:any){
            return db.reviews.filter((r)=> r.game_id === parent.id)
        },

    },
    Review:{
        author(parent:any){
            return db.authors.find((a)=> a.id === parent.author_id)
        },
        game(parent:any){
            return db.games.find((g)=> g.id === parent.game_id)
        }
    },
    Author:{
        reviews(parent: any){
            return db.reviews.filter((r)=> r.author_id === parent.id)
        },
        games(parent:any){
            return db.games.find((g)=>g.id === parent.game_id)
        }
    },
    Mutation:{
        addGame(_: any, arg: {game: {title:string, platform:string[], authorIds:string[]}}){
            const newGame = {
                ...arg.game,
                id: String(db.games.length +1),
               
            }
            db.games.push(newGame)
            return newGame
        },

        updateGame(_:any, args:{id:string, game:{title?:string, platform?:string[], authorIds?:string[]}}){
            const gameIndex = db.games.findIndex((g)=> g.id === args.id)
            if(gameIndex === -1){
                return null
            }
            const existingGame = db.games[gameIndex]!
            const updatedGame = {
                id: existingGame.id,
                title: args.game.title ?? existingGame.title,
                platform: args.game.platform ?? existingGame.platform,
            }
            
            db.games[gameIndex] = updatedGame
            return updatedGame
            },
        
        deleteGame(_:any, args:{id:string}){
            const gameIndex = db.games.findIndex((g)=> g.id === args.id)
            if(gameIndex === -1){
                return false
            }
            db.games.splice(gameIndex, 1)
            return true
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