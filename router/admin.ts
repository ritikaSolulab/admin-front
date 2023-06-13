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
})

router.get('/login', (req,res) => {
  res.render('login');
})

router.get('/resend-OTP',(req,res) => {
  res.render('resendOTP');
})

router.get('/send-OTP', (req,res) => {
  res.render('sendOTP')
})

router.get('/forgot-password', (req,res) => {
  res.render('forgotPassword')
  
})

router.get('/new-password', (req,res) => {
  res.render('newPassword')
})

router.get('/password-changed', (req,res) => {
  res.render('changedPassword')
})

router.get('/dashboard', (req,res) => {
  res.render('dashboard')
 
})

export default router;