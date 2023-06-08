
let mobileNumber;
let oldMobileNumber;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser;
getCountryCode();
function getCountryCode() {
    $.ajax({
        url: '/admin/country-code',
        method: 'get',
        success(data) {
            const countryCode = document.getElementById('countryCode');
            data.forEach(code => {
                const option = document.createElement('option');
                option.setAttribute('value', `+${code.countryCallingCode}`);
                option.innerHTML = `+${code.countryCallingCode}`;
                countryCode.appendChild(option);
            })
            document.getElementById('countryCode').value = "+1";
        },
        error(xhr, status, error) {
        }
    })
}
function userIdentity(email) {
    let userData = {
        Username: email,
        Pool: userPool
    };
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

}
$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, function (size) {
    return "MAX SIZE 3 MB";
});


if (activeUser.user.email) {
    userIdentity(activeUser.user.email);
}

function checkForAutUser() {
    if ($('#passwordConfirmation').val() == '') {
        swal('Please Enter Password');
    }

    $.ajax({
        url: beforeloginApi,
        data: JSON.stringify({ email: activeUser.user.email, password: $('#passwordConfirmation').val() }),
        method: 'post',
        success: (result) => {
            $('#passwordConfirmationModal').modal('toggle');
            getCountryCode();
            $('#updatePhoneNumber').modal();
            // window.location = '';
        }, error: (result) => {
            swal(result.responseJSON.msg);
        }
    })
}

// function checkForAutUser() {
//     let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: activeUser.user.email,
//         Password: $('#passwordConfirmation').val(),

//     });
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: async (result) => {
//             $('#passwordConfirmationModal').modal('toggle');
//             $('#updatePhoneNumber').modal();
//         },
//         onFailure: (err) => {

//             swal({
//                 text: err.message,
//             });
//         },
//         mfaRequired: (codeDeliveryDetails) => {
//             $('#passwordConfirmationModal').modal('toggle');

//             swal({
//                 title: "OTP Authentication",
//                 text: "OTP send to your Mobile Number!",
//                 button: {
//                     text: "submit",
//                     className: "btn btn-primary"
//                 },
//                 content: {
//                     element: "input",
//                     attributes: {
//                         placeholder: "Enter OTP",
//                         type: "text",
//                     },
//                 },
//             }).then(function (data) {
//                 let verificationCode = data;
//                 cognitoUser.sendMFACode(verificationCode, {
//                     onSuccess: (result) => {
//                         $('#updatePhoneNumber').modal();
//                     }, onFailure: (err) => {
//                         swal({
//                             text: err.message,
//                         }).then((result) => {
//                             window.location = '';
//                         }).catch((result) => {
//                             window.location = '';
//                         })
//                     }
//                 });
//             })
//         },
//     });
// }

function updatePhoneNumber() {
    let form = $('#updatePhone');
    form.validate({
        rules: {
            phoneNumber: {
                required: true
            }
        }
    });

    if (form.valid()) {
        let attributeList = [{
            'Name': "phone_number",
            'Value': $('#countryCode').val() + $('#phoneNumberUpdate').val(),

        }];
        let phone_number = $('#countryCode').val() + $('#phoneNumberUpdate').val();
        $.ajax({
            url: `${profileApi}/edit-profile`,
            data: JSON.stringify({ mobileNumber: phone_number }),
            method: 'put',
            success: (result) => {
                oldMobileNumber = result.data.mobileNumber;
                mobileNumber = $('#countryCode').val() + $('#phoneNumberUpdate').val();
                $('#updatePhoneNumber').modal('toggle');
                swal({
                    text: result.data.msg,
                }).then((result) => {
                    window.location = '';
                }).catch((result) => {
                    window.location = '';
                })
            }, error: (result) => {
                toastr.show(result.responseJSON.msg);
            }
        })

    }

}

function updateUser() {
    let form = $('#updateUserForm');
    form.validate({
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            address: {
                required: true
            },
            edit_profilePicture: {
                extension: "jpg,jpeg,png",
                // filesize: (3 * 1024) * 1024

                // accept: "image/jpg,image/jpeg,image/png" 
            },
        },
        messages: {
            edit_profilePicture: { extension: 'select jpg , jpeg, png images only' },
        }
    });

    if (form.valid()) {
        if ($('#edit_profilePicture')[0].files.length) {
            var formData = new FormData();
            formData.append('profilePic', $('#edit_profilePicture')[0].files[0]);
            $.ajax({
                url: profilePicApi,
                data: formData,
                processData: false,
                contentType: false,
                method: 'PUT',
                success: function (result) {
                },
                error: function (data) {
                }
            });
        }

        $.ajax({
            url: `${profileApi}/edit-profile`,
            data: JSON.stringify({ firstName: $('#firstName').val(), lastName: $('#lastName').val(), address: $('#address').val() }),
            method: 'put',
            success: (result) => {
                swal('Profile details updated');
                window.location = '';
            }, error: (result) => {
                swal(result.responseJSON.msg);
            }
        })

    }

}

$('#updateProfileModal').on('hidden.bs.modal', function () {
    $("#updateUserForm").validate().resetForm();
});