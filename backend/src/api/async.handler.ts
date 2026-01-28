import type { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => any,
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req as any, res, next)).catch(next);
