let cmsId;
function editTermsCms(){
    $('#termsOfService').summernote('enable')
}
function editPrivacyCms(){
    $('#privacyPolicy').summernote('enable');
}
function editAboutCms(){
    $('#aboutUs').summernote('enable');
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
    ]
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
    ]
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
    ]
});

$(document).ready(async () => {
    try {
        function isSummernoteEnabled() {
            var $editor = $('#summernote');
            return !$editor.attr('disabled');
        }
        const resp = await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.GET_CMS}`, 'get'));
        console.log(resp.data.data)
        for (const e of resp.data.data) {
            let cmsId;
            if (e.cmsType == 'privacy-policy') {
                $('#privacy-btn').val(e._id)
                console.log('p',isSummernoteEnabled())
                cmsId = e._id;
                console.log('hi', cmsId);
                $('#privacyPolicy').summernote('code', e.description);
            } else if (e.cmsType == 'terms-of-service') {
                $('#terms-btn').val(e._id)
                console.log('t',isSummernoteEnabled())
                cmsId = e._id;
                console.log('h', cmsId);
                $('#termsOfService').summernote('code', e.description);
            } else {
                $('#about-btn').val(e._id)
                console.log('a',isSummernoteEnabled())
                cmsId = e._id;
                console.log('l',cmsId);
                $('#aboutUs').summernote('code', e.description);
            }
        }
    } catch (err) {
        console.log(err);
        ToastMsg(message, 'Error');
    }
});

async function updateTermsCms(){
    var termsDesc = $('#termsOfService').summernote('code')
    const cmsId = $('#terms-btn').val()
    const termsObj = {description:termsDesc, cmsId}
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
}
async function updatePrivacyCms(){
    var privacyDesc = $('#privacyPolicy').summernote('code')
    const cmsId = $('#privacy-btn').val()
    const privacyObj = {description:privacyDesc, cmsId}
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
}

async function updateAboutCms(){
    var aboutDesc = $('#aboutUs').summernote('code')
    const cmsId = $('#about-btn').val()
    const aboutObj = {description:aboutDesc, cmsId}
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
}