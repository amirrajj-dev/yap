import mongoose from 'mongoose';
import logger from '../logging/logger';
import { ENV } from '../configs/env';

export const connectToDb = async () => {
  try {
    if (mongoose.connections[0]?.readyState) {
      logger.info('already connected to the db 🤓☝️');
      return;
    }
    if (ENV.MONGO_URL) {
      await mongoose.connect(ENV.MONGO_URL).then(() => {
        logger.info('connected to the db succesfully ✅');
      });
    } else {
      logger.error('missing mongo url 🥸');
      return;
    }
  } catch (error) {
    logger.error(
      `something goes wrong connecting to the db ✖️  => ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }
};
