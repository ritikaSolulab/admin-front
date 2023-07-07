import express,{Request,Response,NextFunction} from 'express'


const router = express.Router();

router.get('/', (req,res) => {
    res.render('dashboard/index', {activeBar: 'dashboard'})   
})


router.get('/dashboard', (req,res) => {
    res.render('dashboard/index', {activeBar: 'dashboard'})   
})

router.get('/transaction', (req,res) => {
    res.render('transaction-management/index', {activeBar: 'transaction'})
})

router.get('/super-admin-controls', (req,res) => {
    res.render('sub-admin-management/index', {activeBar: 'adminManagement'})
})

router.get('/cms', (req,res) => {
    res.render('content-management/index', {activeBar: 'cms'})
})

router.get('/royaltiesManagement', (req,res) => {
    res.render('royalty-management/index', {activeBar: 'royaltiesManagement'})
})

router.get('/nft', (req,res) => {
    res.render('nft-management/index', {activeBar: 'nft'})
})

router.get('/license', (req,res) => {
    res.render('membership-management/index', {activeBar: 'license'})
})
router.get('/feature', (req,res) => {
    res.render('feature/index', {activeBar: 'feature'})
})
router.get('/infatuation', (req,res) => {
    const { collection } = req.query
    collection ? res.render('infatuation/details', {activeBar: 'infatuation', collection }):
    res.render('infatuation/index', {activeBar: 'infatuation'})
})
router.get('/curated', (req,res) => {
    res.render('curated/index', {activeBar: 'curated'})
})
router.get('/support', (req,res) => {
    res.render('support-management/index', {activeBar: 'support'})
})
router.get('/userManagement', (req,res) => {
    res.render('user-management/index', {activeBar: 'userManagement'})
})
router.get('/collectorManagement', (req,res) => {
    res.render('collector-management/index', {activeBar: 'collectorManagement'})
})

router.get('/profile', (req, res)=>{
    res.render('profile/index', {activeBar: 'profile'})
})
router.get('/nft/details', (req, res)=>{
    res.render('nft-management/details', { activeBar: 'nftDetails'})
})
router.get('/royalties/details', (req, res)=>{
    res.render('royalty-management/details', { activeBar: 'royaltyDetails'})
})
router.get('/royalties/license-details', (req, res)=>{
    res.render('royalty-management/license-details', { activeBar: 'royaltyDetails'})
})

router.get('/wallet', (req, res)=>{
    res.render('wallet/index', { activeBar: 'wallet' })
})
router.get('/license/details', (req,res)=>{
    res.render('membership-management/licenseDetails', { activeBar: 'licenseDetails'})
})

router.get('/license/membership-details', (req,res)=>{
    res.render('membership-management/membershipDetails', { activeBar: 'membershipDetails'})
})


export default router;