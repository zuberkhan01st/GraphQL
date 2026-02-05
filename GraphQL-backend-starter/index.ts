import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import { config } from './src/config/server';
import { typeDefs } from './src/graphql/typedef';
import { resolvers } from './src/graphql/resolvers/index';
import { errorHandler } from './src/middleware/errorHandler';
import { logger } from './src/utils/logger';

async function startServer() {
  const app = express();
const PORT = config.PORT || 4000;
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  // Health check endpoint
  app.get('/', (req, res) => {
    res.json({ message: 'Server is running!', graphql: '/graphql' });
  });


  app.get('/check_health', (req,res)=>{
    const timestamp = new Date().toISOString();
    logger.info(`Health check at ${timestamp}`);
    res.json({ status: 'ok', timestamp });
  })

  // Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📡 Health check at http://localhost:${PORT}/`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});