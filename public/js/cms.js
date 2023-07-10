let termsCondId;
let privacyPolicyId;
let aboutusId;
$('#termsOfService, #privacyPolicy, #aboutUs').summernote({
    height: '300px',
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'PolySans Median', 'PolySans Slim'],
    fontNamesIgnoreCheck: ['PolySans Median', 'PolySans Slim']
});


function editTermsCms() {
    $('#termsOfService').summernote('enable')
    $('#termsCondEditBtn').hide();
    $('#termsCondSaveBtn').show();
}
function editPrivacyCms() {
    $('#privacyPolicy').summernote('enable');
    $('#privacyPolicyEditBtn').hide();
    $('#privacyPolicySaveBtn').show();
}
function editAboutCms() {
    $('#aboutUs').summernote('enable');
    $('#aboutEditBtn').hide();
    $('#aboutSaveBtn').show();
}

$(document).ready(async () => {
    await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.GET_CMS}`, 'GET'))
        .then((resp) => {
            for (const e of resp.data.data) {
                if (e.cmsType == 'privacy-policy') {
                    $('#privacy-btn').val(e._id)
                    privacyPolicyId = e._id;
                    $('#privacyPolicy').summernote('code', e.description);
                } else if (e.cmsType == 'terms-of-service') {
                    $('#terms-btn').val(e._id)
                    termsCondId = e._id;
                    $('#termsOfService').summernote('code', e.description);
                } else {
                    $('#about-btn').val(e._id)
                    aboutusId = e._id;
                    $('#aboutUs').summernote('code', e.description);
                }
            }

        })
        .catch((err) => ToastMsg(err?.response?.data?.message, 'Error'))

    $('#termsOfService').summernote('disable');
    $('#privacyPolicy').summernote('disable');
    $('#aboutUs').summernote('disable');
    $('#termsCondSaveBtn').hide();
    $('#privacyPolicySaveBtn').hide();
    $('#aboutSaveBtn').hide();

});

async function updateTermsCms() {
    loading('termsCondSaveBtn')
    var termsDesc = $('#termsOfService').summernote('code')
    const termsObj = { description: termsDesc, cmsId: termsCondId }
    await axios({
        url: `${config.SERVER_URL}${config.URLS.UPDATE_CMS}`,
        method: 'PATCH',
        data: termsObj,
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            ToastMsg(response?.data?.message, 'Success')
            $('#Edit_Modal').modal('hide')
            $('#Edit_Success_Modal').modal('show')
        })
        .catch((err) => {
            const { response: { data: { message } } } = err
            ToastMsg(message, 'Error')
        })
    removeText({ id: 'termsCondSaveBtn', save: true })
    $('#termsCondSaveBtn').hide();
    $('#termsCondEditBtn').show();
    $('#termsOfService').summernote('disable')

}
async function updatePrivacyCms() {
    loading('privacyPolicySaveBtn')
    var privacyDesc = $('#privacyPolicy').summernote('code')
    const privacyObj = { description: privacyDesc, cmsId: privacyPolicyId }
    await axios({
        url: `${config.SERVER_URL}${config.URLS.UPDATE_CMS}`,
        method: 'PATCH',
        data: privacyObj,
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            ToastMsg(response?.data?.message, 'Success')
            $('#Edit_Modal').modal('hide')
            $('#Edit_Success_Modal').modal('show')
        })
        .catch((err) => {
            const { response: { data: { message } } } = err
            ToastMsg(message, 'Error')
        })
    removeText({ id: 'privacyPolicySaveBtn', save: true })
    $('#privacyPolicySaveBtn').hide();
    $('#privacyPolicyEditBtn').show();
    $('#privacyPolicy').summernote('disable')
}

async function updateAboutCms() {
    loading('aboutSaveBtn')
    var aboutDesc = $('#aboutUs').summernote('code')
    const aboutObj = { description: aboutDesc, cmsId: aboutusId }
    await axios({
        url: `${config.SERVER_URL}${config.URLS.UPDATE_CMS}`,
        method: 'PATCH',
        data: aboutObj,
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            ToastMsg(response?.data?.message, 'Success')
            $('#Edit_Modal').modal('hide')
            $('#Edit_Success_Modal').modal('show')
        })
        .catch((err) => {
            const { response: { data: { message } } } = err
            ToastMsg(message, 'Error')
        })
    removeText({ id: 'aboutSaveBtn', save: true })
    $('#aboutSaveBtn').hide();
    $('#aboutEditBtn').show();
    $('#aboutUs').summernote('disable')
}

