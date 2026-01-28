import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import logger from './logging/logger';
import helmet from 'helmet';
import { ApiResponseHelper } from './helpers/api.helper';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';

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

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

export default app;
