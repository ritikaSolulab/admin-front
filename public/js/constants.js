const config = {
    SERVER_URL: 'http://localhost:3000/',
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
        UPDATE_CMS: 'cms/update.cms',
        GET_CMS: 'cms/get.cms',
        BLOCK_ADMIN: 'admin/update-status',

    }
}