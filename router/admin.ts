import express,{Request,Response,NextFunction} from 'express'


const router = express.Router();

router.get('/', (req,res) => {
    res.render('admin/dashboard', {activeBar: 'dashboard'})   
})


router.get('/dashboard', (req,res) => {
    res.render('admin/dashboard', {activeBar: 'dashboard'})   
})

router.get('/transaction', (req,res) => {
    res.render('admin/transaction', {activeBar: 'transaction'})
})

router.get('/userManagement', (req,res) => {
    res.render('admin/userManagement', {activeBar: 'userManagement'})
})

router.get('/cms', (req,res) => {
    res.render('admin/cms', {activeBar: 'cms'})
})

router.get('/royaltiesManagement', (req,res) => {
    res.render('admin/royaltiesManagement', {activeBar: 'royaltiesManagement'})
})

router.get('/nft', (req,res) => {
    res.render('admin/nft', {activeBar: 'nft'})
})

router.get('/license', (req,res) => {
    res.render('admin/license', {activeBar: 'license'})
})

export default router;