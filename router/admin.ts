import express,{Request,Response,NextFunction} from 'express'
const router = express.Router();

router.use((req:Request, res:Response, next:NextFunction) => {
  //if (req.session.user === undefined) {
    if (req.originalUrl.includes('/admin')) {
      res.redirect('/');
    } else {
      return next();
    }
  //} else {
    if (!req.originalUrl.includes('/admin')) {
      res.redirect('/admin');
    } else {
      return next();
    }
  }
//}

);

router.get('/', (req,res) => {
    res.render('index')
    // return res.send('Hi!')
})

router.get('/login', (req, res) => {
    res.render('admin/login');
  });
  
  router.get('/firstlogin', (req, res) => {
    res.render('admin/firstLogin');
  });

export default router;