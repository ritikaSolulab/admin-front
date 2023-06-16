import express,{Request,Response,NextFunction} from 'express'
const router = express.Router();



router.use((req: Request, res, next) => {
  if (req.session?.user === undefined) {

    if (req.originalUrl.includes('/admin')) {
      res.redirect('/');
    } else {
      return next();
    }
  } else {
    if (!req.originalUrl.includes('/admin')) {
      res.redirect('/admin');
    } else {
      return next();
    }
  }
}

);

router.get('/', (req,res) => {
    res.render('index', {layout: 'auth/login'})
})

router.get('/login', (req,res) => {
  res.render('auth/login', {layout: 'auth/login'});
})

router.get('/resend-OTP',(req,res) => {
  res.render('resendOTP');
})

router.get('/send-OTP', (req,res) => {
  res.render('sendOTP')
})

router.get('/forgot-password', (req,res) => {
  res.render('auth/forgotPassword', { layout: 'auth/forgotPassword'})
  
})

router.get('/new-password', (req,res) => {
  res.render('newPassword')
})

router.get('/password-changed', (req,res) => {
  res.render('changedPassword')
})

router.post('/create-session', (req, res) => {
  if(req.session) {
    req.session.user = req.body.user;
    req.session.token = req.body.token;  
  }
  res.redirect('/admin');
});

export default router;