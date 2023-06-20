/** Retreive the user auth token */
const _token = localStorage.getItem('token')
const token = JSON.parse(_token)

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
const Logout = async() => {
    localStorage.clear()
    $.ajax({
        type: 'get',
        url:`${window.location.origin}${config.URLS.LOGOUT}`,
        contentType: 'application/json',
        success: ((data)=>{
            console.log(data)
        })
    })
    // await axios({
    //     method: 'GET',
    //     // dataType: 'application/json',
    //     url: `${window.location.origin}${config.URLS.LOGOUT}`
    // }).then((data)=>{
    //     console.log(data)
    //     // window.location = '/login'
    // }).catch((err)=>{
    //     const { response: { data: { message } } } = err;
    //     ToastMsg(message, 'Error')
    // })
}

const axiosConfig = (
    url,
    method,
    data
)=>{
    const _obj = {
        url,
        method,
        data,
        headers:{
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    return _obj
}
