import mongoose from 'mongoose';
import logger from './src/logging/logger';
import app from './src/app';
import { ENV } from './src/configs/env';
import { connectToDb } from './src/db/db';
import http from 'http';
import { initializeSocket } from './src/utils/socket';

const PORT = ENV.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

const startServer = async () => {
  try {
    await connectToDb();
    server.listen(PORT, () => {
      logger.info(`server is running on port ${PORT} ⚡️`);
    });
  } catch (error) {
    logger.error(`internal server error => ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
