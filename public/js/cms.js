let termsCondId;
let privacyPolicyId;
let aboutusId;
$('#termsOfService').summernote({
    height: '300px',
});
$('#privacyPolicy').summernote({
    height: '300px',
});
$('#aboutUs').summernote({
    height: '300px',
});


function editTermsCms(){
    $('#termsOfService').summernote('enable')
    $('#termsCondEditBtn').hide();
    $('#termsCondSaveBtn').show();
}
function editPrivacyCms(){
    $('#privacyPolicy').summernote('enable');
    $('#privacyPolicyEditBtn').hide();
    $('#privacyPolicySaveBtn').show();
}
function editAboutCms(){
    $('#aboutUs').summernote('enable');
    $('#aboutEditBtn').hide();
    $('#aboutSaveBtn').show();
}

$('#termsOfService').summernote({
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']]
    ],
    hight: '400px'
});
$('#privacyPolicy').summernote({
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']]
    ],
    hight: '400px'
});
$('#aboutUs').summernote({
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']]
    ],
    hight: '400px'
});

$(document).ready(async () => {
    try {
        function isSummernoteEnabled() {
            var $editor = $('#summernote');
            return !$editor.attr('disabled');
        }
        const resp = await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.GET_CMS}`, 'get'));
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
    } catch (err) {
        console.log(err);
        ToastMsg(message, 'Error');
    }
    $('#termsOfService').summernote('disable');
    $('#privacyPolicy').summernote('disable');
    $('#aboutUs').summernote('disable');

});

async function updateTermsCms(){
    var termsDesc = $('#termsOfService').summernote('code')
    const termsObj = {description:termsDesc, cmsId: termsCondId}
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

        $('#termsCondSaveBtn').hide();
        $('#termsCondEditBtn').show();    
        $('#termsOfService').summernote('disable')

}
async function updatePrivacyCms(){
    var privacyDesc = $('#privacyPolicy').summernote('code')
    const privacyObj = {description:privacyDesc, cmsId: privacyPolicyId}
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
        $('#privacyPolicySaveBtn').hide();
        $('#privacyPolicyEditBtn').show();
        $('#privacyPolicy').summernote('disable')
}

async function updateAboutCms(){
    var aboutDesc = $('#aboutUs').summernote('code')
    const aboutObj = {description:aboutDesc, cmsId: aboutusId}
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
        $('#aboutSaveBtn').hide();
        $('#aboutEditBtn').show();
        $('#aboutUs').summernote('disable')
}

$(document).ready( async () => {
    $('#termsCondSaveBtn').hide();
    $('#privacyPolicySaveBtn').hide();
    $('#aboutSaveBtn').hide();
});
