import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import UserService from '../components/databaseFactoryServices';
import response from '../helpers/request.helper';

class tokenValidator {
  static tokenValidate(...accessRoleParams: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        return response.helper(res, false, 'un-authorized', {}, 401);
      }
      const decipher = crypto.createDecipheriv(
        config.AUTH_ALGO,
        config.JWT_SECRET,
        config.IV
      );
      const decrypted = decipher.update(token, 'base64', 'utf8');
      const user = JSON.parse(decrypted + decipher.final('utf8'));
      if (user) {
        const userService = new UserService();
        // res.locals.jwtPayload = await userService.getUserDetails(user._id);
        if (accessRoleParams.length) {
          if (accessRoleParams.includes(user.role)) {
            next();
          } else {
            return response.helper(res, false, 'forbidden', {}, 403);
          }
        } else {
          next();
        }
      } else {
        return response.helper(res, false, 'un-authorized', {}, 401);
      }
    };
  }
  static generateToken(userData: any) {
    const cipher = crypto.createCipheriv(
      config.AUTH_ALGO,
      config.JWT_SECRET,
      config.IV
    );
    // try {
    //   let cipher = crypto.createCipheriv(
    //     config.AUTH_ALGO,
    //     config.JWT_SECRET,
    //     config.IV
    //   );
    //   let encrypted = cipher.update(userData, "utf8", "base64");
    //   encrypted += cipher.final("base64");
    //   return encrypted;
    // }catch(err){
    //   throw err
    // }
    

    let encrypted = cipher.update(userData, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }
}

export default tokenValidator;
