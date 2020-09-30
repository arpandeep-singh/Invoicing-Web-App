import jwt, { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export async function generateToken(id: string): Promise<string | null> {
  try {

    if (!id) return null;
    const payload = { id }
    const token = jwt.sign(payload, 'secretkey');
    return token;

  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function verifyToken(token: string) {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, 'secretkey');
    return payload;
  } catch (error) {
    logger.error(error);
    return null;
  }

}

export async function ensureAuth(req: any, res: Response, next: NextFunction) {
  if (!req.cookies || !req.cookies.jwt ) return res.redirect('/login');

  const verfied = await verifyToken(req.cookies.jwt);
  if(!verfied) return res.redirect('/login');
  next();
}