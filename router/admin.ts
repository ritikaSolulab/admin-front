import express,{Request,Response,NextFunction} from 'express'


const router = express.Router();


router.get('/dashboard', (req,res) => {
    res.render('admin/dashboard', {activeBar: 'dashboard'})   
})


export default router;