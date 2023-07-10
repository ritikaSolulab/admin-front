/** Retreive the user auth token */
const _token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const token = JSON.parse(_token)

/** Method to Fetch Current User */
const ___user = JSON.parse(user)
const GetUser = async () => {
    const data = await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.USER_DETAILS}/${___user._id}`, 'GET'))
    if (data?.data?.data) {
        localStorage.setItem('user', JSON.stringify(data?.data?.data))
    }
    const currentUser = JSON.parse(localStorage.getItem('user'))
    return currentUser
}

/** Toastr Configuration and method */
const ToastMsg = (msg, type) => {
    const _type = type.charAt(0).toLowerCase() + type.slice(1)
    const options = {
        closeButton: true,
        preventDuplicates: true,
        progressBar: true,
        showDuration: 300,
        timeOut: 3000
    }
    return toastr[_type](msg, type, options)
}

/** Method to mask email Id */
const MaskEmail = (email) => {
    const maskid = email.replace(/^(.)(.*)(.@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '*') + c
    );
    return maskid
}

/** Method to Logout */
const Logout = async () => {
    localStorage.clear()
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}${config.URLS.LOGOUT}`,
        contentType: 'application/json',
        success: ((data) => {
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
        })
    })
    window.location.href = '/'
}

const axiosConfig = (
    url,
    method,
    data = {},
    isImage = false
) => {
    let headers = {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    if (isImage) headers['Content-Type'] = "multipart/form-data"
    const _obj = {
        url,
        method,
        data,
        headers
    }
    return _obj
}

const loading = (id) => {
    $(`#${id}`).text('Please wait...')
    $(`#${id}`).attr('disabled', true)
    $(`#${id}`).append(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"</span>`)   
}

const removeText = ({
    id,
    login=false,
    update = false,
    _delete = false,
    verify = false,
    sendOTP = false,
    change = false,
    confirm = false,
    add = false,
    save = false
}) => {
    let text = 'Create'
    if(update) text = 'Update'
    if(_delete) text = 'Delete'
    if(login) text = 'Login'
    if(verify) text = 'Verify'
    if(sendOTP) text = 'Send OTP'
    if(change) text = 'Change'
    if(confirm) text = 'Confirm'
    if(add) text = 'Add'
    if(save) text = 'Save'
    $(`#${id}`).text(`${text}`)
    $(`#${id}`).prop('disabled', false)
}

