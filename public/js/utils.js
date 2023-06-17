const ToastMsg = (msg, color) => {
    return Toastify({
        text: msg,
        close: true,
        style: {
            background: color.toUpperCase(),
        },
        duration: 3000
    }).showToast()
}

/** Method to mask email Id */
const MaskEmail = (email) => {
    const maskid = email.replace(/^(.)(.*)(.@.*)$/,
     (_, a, b, c) => a + b.replace(/./g, '*') + c
);
return maskid
}