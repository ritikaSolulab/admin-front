import session from "express-session";

declare namespace Express {
    export interface Request {
        user?: any;
    }
}
interface SessionData {
  cookie: Cookie;
}