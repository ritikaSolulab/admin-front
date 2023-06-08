// const baseUrl = `https://j5ges03z49.execute-api.us-east-1.amazonaws.com/admin`
const baseUrl = `https://admin-api.doctrace.com/api/v1/admin`
// const baseUrl = `http://localhost:4000/api/v1/admin`
const dashboardApi = `${baseUrl}/dashboard-count`; // check
const profileApi = `${baseUrl}/user`;
const profilePicApi = `${baseUrl}/user/profile-pic`;


const beforeloginApi = `${baseUrl}/beforelogin`;
const loginApi = `${baseUrl}/login`;
const forcePasswordUpdateApi = `${baseUrl}/changeForcePassword`
const firstLoginApi = `${baseUrl}/firstlogin`;
const sendOtpApi = `${baseUrl}/sendOTP`;
const verifyOtpApi = `${baseUrl}/verifyOTP`;

const forgotPasswordApi = `${baseUrl}/forgotPassword`;
const resetPasswordApi = `${baseUrl}/resetPassword`;

// const newTokenApi = 'https://b1av24ivkd.execute-api.us-east-1.amazonaws.com/auth/prod';
const roleApi = 'https://admin-role-api.doctrace.com/api/v1/admin/role/';
const roleDetailsApi = 'https://admin-role-api.doctrace.com/api/v1/admin/role/role-details';
const teamApi = 'https://admin-role-api.doctrace.com/api/v1/admin/team/';
const teamDetailsApi = 'https://admin-role-api.doctrace.com/api/v1/admin/team/team-details';

const userApi = `${baseUrl}/user`;
const allUserApi = `${baseUrl}/user/all`;
const userDetailsApi = `${baseUrl}/user/user-details`;
const checkIsManagerApi = `${baseUrl}/user/check-is-manager`;
const metaApi = `${baseUrl}/metadata`;
const metaDetailsApi = `${baseUrl}/metadata/meta-details`;
const promoCodeApi = `${baseUrl}/promo/`;
const promoCodeDetailsApi = `${baseUrl}/promo/details`;
const promoCodeExpiryApi = `${baseUrl}/promo/expiry`;
const providerApi = `${baseUrl}/provider`;
const providePendingApi = `${baseUrl}/provider/pendingList`;
const providerDetailsApi = `${baseUrl}/provider/details`;
const providerActiveApi = `${baseUrl}/provider/approve`;
const providerRejectApi = `${baseUrl}/provider/reject`;
const providerActiveDeactivateApi = `${baseUrl}/provider/activate`;
const providerAccountActivityApi = `${baseUrl}/provider/account-activity`;
const receiverApi = `${baseUrl}/receiver`;
const subscriptionApi = `${baseUrl}/subscription`;
const subscriptionDetailsApi = `${baseUrl}/subscription/details`;
const referralApi = `${baseUrl}/referral/`;
const receiverDetails = '';

const receiverOnBoardReportApi = `${baseUrl}/analytics_report/onBoardReceiverReport`;
const providerOnBoardReportApi = `${baseUrl}/analytics_report/onBoardProviderReport`;
const referralReport = `${baseUrl}/referral/report`;
const providerTeam = `${baseUrl}/provider/team`;
const providerTeamDetails = `${baseUrl}/provider/teamDetails`;
const salesReportApi = `${baseUrl}/analytics_report/salesReport`;
const costReportApi = `${baseUrl}/analytics_report/costReport`;
const paymentHistoryListApi = `${baseUrl}/transaction/`;
const paymentHistoryDetails = `${baseUrl}/transaction/details`;
const contactUsApi = `${baseUrl}/contact_us/`;
const updateFcmApi = `${baseUrl}/update-fcm-token`;

const zendeskApiPrefix = 'https://doctrace.zendesk.com/api/v2';
const faqApi = `${baseUrl}/faq`;
const notificationApi = `${baseUrl}/notification/`;
const contactUsEmailApi = `${baseUrl}/contact_us/email-list`;
const zendeskToken = 'Basic YWRtaW5AZG9jdHJhY2UuY29tL3Rva2VuOkN4dXN2cTFOaDJtNVpkYU5kRENhczNjc1Q3Z1NNUjNaUGZRZFBtZlo=';

const activeUser = {
    'user': {},
    'userOtherDetails': {}
};

function checkForUserToken() {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
        activeUser.user = JSON.parse(localStorage.getItem('user'));
        activeUser.userOtherDetails = JSON.parse(localStorage.getItem('userOtherDetails'));
        activeUser.token = JSON.parse(localStorage.getItem("token"))
        return true;
    } else {
        return false;
    }
}

async function checkTokenExpire() {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if ((new Date().getTime()) > tokenExpiry - 1000 * 5 * 60) { //true = tokenexpire
            return true
    } else {
        return false
    }
}

function updateToken(response) {
    activeUser.user.token = response.data.token;
    localStorage.setItem('tokenExpiry', response.data.tokenExpireIn + new Date().getTime());
    localStorage.setItem('user', JSON.stringify(activeUser.user));
    localStorage.setItem('token', JSON.stringify(activeUser.token));
    checkForUserToken();
}

function removeData(item) {
    localStorage.removeItem(item);
    localStorage.removeItem('newTokenInProgress');
}

async function checkTokenExpire() {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if ((new Date().getTime()) > tokenExpiry - 1000 * 5 * 60) { //true = tokenexpire
            return true
    } else {
        return false
    }
}

async function checkForNewToken(refreshToken, email) {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const checkIsTokenUpdateInProgress = localStorage.getItem('newTokenInProgress');
    if (checkIsTokenUpdateInProgress === 'true') {
        return {
            'success': true,
            'newToken': false
        }
    }
    if ((new Date().getTime()) > tokenExpiry - 1000 * 5 * 60) {
        localStorage.setItem('newTokenInProgress', true);
        const tokenData = await fetch(newTokenApi, {
            method: 'POST',
            async: false,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify({ 'refreshToken': refreshToken, 'email': email }) // body data type must match "Content-Type" header
        });
        const response = await tokenData.json();
        if (response.result === 1) {
            updateToken(response);
            localStorage.setItem('newTokenInProgress', false);
            return {
                'success': true,
                'newToken': true
            }
        } else {
            localStorage.setItem('newTokenInProgress', false);
            return {
                'success': false,
                'newToken': false
            }
        }
    } else {
        localStorage.setItem('newTokenInProgress', false);
        return {
            'success': true,
            'newToken': false
        }
    }
}

function updateSession() {
    $.ajax({
        url: '/admin/updateSession',
        method: 'post',
        success(data) {
            window.location = '/admin/profile';
        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
        }
    })

}

function logout() {
    removeData('user');
    removeData('userOtherDetails');
    removeData('tokenExpiry');
    removeData('newTokenInProgress');
    $.ajax({
        url: '/admin/logout',
        method: 'post',
        success(data) {
            localStorage.setItem('newTokenInProgress', false);
            window.location = '/';
        },
        error(xhr, status, error) {
        }
    })
}
checkForUserToken()

function refreshSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    window.location = '/';
}
// const refreshSession = async () => {
//     const tokenData = await fetch(newTokenApi,{
//         method: 'POST',
//         async: false,
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         body: JSON.stringify({ 'refreshToken': activeUser.user.refresh_token, 'email': activeUser.user.email }) // body data type must match "Content-Type" header
//     });
//     const response = await tokenData.json();
//     console.log('response', response);
//     if (response.result === 1) {
//         updateToken(response);
//         localStorage.setItem('newTokenInProgress', false);
//         window.location = '/';
//     } else {
//         logout();
//     }
// }

function tokenCheckFcm(token) {
    const localToken = localStorage.getItem('fcmToken')
    if (localToken && localToken != '') {
        if (localToken === token) {
            localStorage.setItem('fcmToken', token);
            return {
                isNew: false,
                token: token,
                oldToken: ''
            }
        } else {
            localStorage.setItem('fcmToken', token);
            return {
                isNew: true,
                token: token,
                oldToken: localToken
            }
        }
    } else {
        localStorage.setItem('fcmToken', token);
        return {
            isNew: true,
            token: token,
            oldToken: token
        }
    }
}