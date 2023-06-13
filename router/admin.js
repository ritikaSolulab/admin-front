import express from 'express'
//const countryCodes = require('country-codes-list');
import { pageRender } from '../helpers/responseHelper';

const request = require('request');
const router = express.Router();

router.use((req, res, next) => {
    res.user = req.session.user;
    next();
})

router.get('/', async (req, res) => {
    try {
        pageRender(res, 'admin/dashboard', { 'activeBar': 'dashboard', 'providerCount': 'provider', 'metaCount': 'meta' });
    } catch (err) {
    }
});
router.get('/country-code', (req, res) => {
    return res.send(countryCodes.all());
})
router.get('/dashboard', (req, res) => {
    pageRender(res, 'admin/dashboard', { 'activeBar': 'dashboard' });
});
router.post('/updateSession', (req, res) => {
    req.session.tokens = req.headers.authorization;
    return res.send(200);
});
router.get('/profile', async (req, res) => {
    const option = {
        url: 'https://admin-api.doctrace.com/api/v1/admin/user/profile',
        // url:`${profileApi}/profile`,
        method: 'GET',
        headers: {
            'authorization': req.session.tokens
        }
    }
    request(option, function (err, response, body) {
        const user = JSON.parse(body);
        if (!user.data.role) {
            user.role = {
                role: {
                    "create": "false",
                    "update": "false",
                    "delete": "false",
                    "view": "false"
                },
                metadata: {
                    "create": "false",
                    "update": "false",
                    "delete": "false",
                    "view": "false"
                },
                invoice: {
                    "view": "false"
                },
                reports: {
                    "view": "false"
                }
            }
        }
        return pageRender(res, 'admin/profile', { 'activeBar': '', 'userDetails': user.data });
    });
});
router.get('/provider_management', (req, res) => {
    pageRender(res, 'admin/provider', { 'activeBar': 'provider_management' });
})
router.get('/provider_details/:providerId', async (req, res) => {
    pageRender(res, 'admin/provider_details', { 'activeBar': 'provider_management' });
})
router.get('/provider_pending_approvals/:providerId', async (req, res) => {
    pageRender(res, 'admin/provider_pending_approvals', { 'activeBar': 'provider_management' });
})
router.get('/analytics_report', (req, res) => {
    pageRender(res, 'admin/analytics_report', { 'activeBar': 'analytics_report' });
})
router.get('/general_agreement', (req, res) => {
    pageRender(res, 'admin/general_agreement', { 'activeBar': 'provider_management' });
})
router.get('/payment_history', (req, res) => {
    pageRender(res, 'admin/payment_history', { 'activeBar': 'payment_history' });
})
router.get('/payment_details/:paymentId', (req, res) => {
    pageRender(res, 'admin/payment_details', { 'activeBar': 'payment_history' });
})
router.get('/invoice', (req, res) => {
    pageRender(res, 'admin/invoice', { 'activeBar': 'payment_history' });
});
router.get('/invoice_print', (req, res) => {
    pageRender(res, 'admin/invoice_print', { 'activeBar': 'payment_history' });
});
router.get('/receiver_management', (req, res) => {
    pageRender(res, 'admin/receiver_management', { 'activeBar': 'receiver_management' });
});
router.get('/receiver_details', (req, res) => {
    pageRender(res, 'admin/receiver_details', { 'activeBar': 'receiver_management' });

})
router.get('/support_management', (req, res) => {
    pageRender(res, 'admin/support_management', { 'activeBar': 'support_management' });
})
router.get('/blockchain_analytics', (req, res) => {
    pageRender(res, 'admin/blockchain_analytics', { 'activeBar': 'blockchain_analytics' });
})
router.get('/notification', (req, res) => {
    pageRender(res, 'admin/notification');
})


router.get('/team_management', (req, res) => {
    pageRender(res, 'admin/team_management', { 'activeBar': 'team_management' });
})
router.get('/subscription_management', (req, res) => {
    pageRender(res, 'admin/subscription_management', { 'activeBar': 'subscription_management' });
})
router.get('/promocode_management', (req, res) => {
    pageRender(res, 'admin/promocode_management', { 'activeBar': 'promocode_management' });
})
router.get('/metadata_management', (req, res) => {
    pageRender(res, 'admin/metadata_management', { 'activeBar': 'metadata_management' });
})
router.get('/contact_us', (req, res) => {
    pageRender(res, 'admin/contact_us', { 'activeBar': 'contact_us' });
})
router.get('/faq', (req, res) => {
    pageRender(res, 'admin/faq', { 'activeBar': 'faq' });
})
router.get('/pre_notify', (req,res) => {
    pageRender(res, 'admin/pre_notify', { 'activeBar': 'notify' });
})


router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        return res.send(200);
    })
})
module.exports = router;


