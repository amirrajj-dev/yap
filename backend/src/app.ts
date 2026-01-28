import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import logger from './logging/logger';
import helmet from 'helmet';
import { ApiResponseHelper } from './helpers/api.helper';

const app = express();

app.use(express.json());
app.use(morgan('dev', { stream: { write: (msg) => logger.http(msg.trim()) } }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.get('/api/health', (req: Request, res: Response) => {
  logger.info('Health Check');
  return res.status(200).json(ApiResponseHelper.success('OK', null, req.url));
});

export default app;
