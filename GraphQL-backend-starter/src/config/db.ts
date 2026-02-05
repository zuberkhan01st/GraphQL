import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql_app';

export async function connectDB(): Promise<typeof mongoose> {
    // Return if already connected
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        logger.info(`✅ Connected to MongoDB: ${conn.connection.host}`);
        logger.info(`📦 Database: ${conn.connection.name}`);
        
        return conn;
    } catch (error) {
        logger.error(`❌ MongoDB connection failed: ${error}`);
        throw new Error('Failed to connect to MongoDB');
    }
}

export async function closeDB(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        logger.info('❌ Disconnected from MongoDB');
    }
}

// Connection event listeners
mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDB();
    process.exit(0);
});