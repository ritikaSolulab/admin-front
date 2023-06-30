const config = {
    // SERVER_URL: 'http://50.19.128.91/',
    SERVER_URL: 'http://localhost:5000/',
    URLS: {
        LOGIN_URL: 'admin/login',
        FORGOT_PASS: 'admin/forgot-password',
        VERIFY_OTP: 'admin/forgot-password-verify',
        RESEND_OTP: 'admin/forgot-password-verify',
        RESET_PASS: 'admin/reset-password',
        USER_LIST: 'admin/user.list',
        ADMIN_LIST: 'admin/list',
        LOGOUT: '/destroy-session',
        EDIT_ADMIN: 'admin/update',
        DELETE_ADMIN: 'admin/delete-admin',
        CREATE_ADMIN: 'admin/create',
        EDIT_ROLE: 'admin/role.update',
        CREATE_ROLE: 'admin/role.create',
        ROLE_LIST: 'admin/role.list',
        DELETE_ROLE: 'admin/role.delete',
        UPDATE_CMS: 'admin/cms',
        GET_CMS: 'admin/cms',
        BLOCK_ADMIN: 'admin/update-status',
        COLLECTION_LIST:'admin/collection-list',
        COLLECTION_DETAILS: 'admin/collection-details',
        UPLOAD_IMAGE: 'admin/infatuation/upload-image',
        UPDATE_INFATUATION: 'admin/infatuation.update',
        INFATUATION_DETAILS: 'admin/infatuation'

    }
}