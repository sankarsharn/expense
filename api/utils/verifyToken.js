import jwt from 'jsonwebtoken';
import {errorHandler} from './errorHandler.js';

export const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if(!token) {
       const error = new Error('Token not found');
       error.statusCode = 401;
       return errorHandler(error, next);
   }
   
    jwt.verify(token, process.env.JWT_SIGNIN_KEY, (err, user) => {
        if(err) {
            err.statusCode = 401;
            return errorHandler(err, next);
        }
        req.user = user;
        next();
    });
   
}