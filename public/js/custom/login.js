let mobileNumber = "";
let email = "";
let otp = "";
let isUpdatePassword = true;
let password = ""
let user = {};
let isEmailVerified = false;
let isPhoneVerified = false;
// const pool_region = cognito.pool_region;
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var cognitoUser

// function userIdentity(email) {
//     let userData = {
//         Username: email,
//         Pool: userPool
//     };
//     cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     console.log(cognitoUser);

// }
const obscureEmail = (email) => {
  const [name, domain] = email.split('@');
  return `${name[0]}${name[1]}${new Array(name.length).join('*')}@${domain}`;
};

(function () {
  if (
    window.location.pathname == "/firstlogin" &&
    !localStorage.getItem("user")
  ) {
    window.location = "/";
  } else if (window.location.pathname == "/firstlogin" && localStorage.getItem("user")) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    document.getElementById('emailText').innerHTML = obscureEmail(user.email);
    document.getElementById('phoneText').innerHTML = user.mobileNumber.replace(/\d(?=\d{4})/g, "*");
  }
  if (activeUser.token) {
    checkUser();
  }
})();

async function checkUser() {
  const tokenCheck = await checkTokenExpire();
  const user = JSON.parse(localStorage.getItem("user"));
  // document.getElementById('emailText').innerHTML = obscureEmail(activeUser.user.email);
  // document.getElementById('phoneText').innerHTML = activeUser.user.mobileNumber.replace(/\d(?=\d{4})/g, "*");
  if (!tokenCheck) {
    $.ajax({
      url: "/createSession",
      data: JSON.stringify({ token: activeUser.token, user: activeUser.user }),
      method: "post",
      success: (result) => {
        window.location = "";
      },
      error: (result) => {
        toastr.show(result.responseJSON.msg);
      },
    });
  } else {
    // window.location = 'https://admin-staging.doctrace.com';
    // removeData('user');
    // removeData('userOtherDetails');
    // removeData('tokenExpiry');
    // removeData('newTokenInProgress');
  }
}

function openLoginOtp() {
  let form = $("#loginForm");

  form.validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
  });

  if (form.valid()) {
    let loginbtn = $("#btnlogin");
    loginbtn.attr("disabled", true);
    email = $("#email").val();
    password = $("#password").val()
    $.ajax({
      url: beforeloginApi,
      method: "post",
      data: JSON.stringify({ email: email, password: $("#password").val() }),
      success: (result) => {
        loginbtn.attr("disabled", false);
        mobileNumber = result.data;
        let otpModal = $("#otpmodal");
        $("#otpmodaltext").html(
          "Code has been sent on xxx xxx xx" + mobileNumber.slice(-2)
        );
        otpModal.modal("show");
      },
      error: (payload) => {
       if (payload.responseJSON.msg == "You need to verify") {
          loginbtn.attr("disabled", false);
          localStorage.setItem(
            "user",
            JSON.stringify(payload.responseJSON.data)
         );
          window.location = "/firstlogin";
        } else if (payload.responseJSON?.msg == "Update password on first time login ") {
           $('#changePasswordmodal').modal('show');
           loginbtn.attr("disabled", false);
        } else {
          loginbtn.attr("disabled", false);
          swal({
            text: payload.responseJSON.msg,
          });
        }
      },
    });
  }
}

function handleNewPassword(){
  let form = $("#updatePassword");

  form.validate({
    rules: {
      CPpassword: {
        required: true,
      },
      CPconfirmpassword: {
        required: true,
      }
    },
  });

  if (form.valid()) {
    let CPpassword = $("#CPpassword").val();
    let CPconfirmpassword = $("#CPconfirmpassword").val();
    
    let changePasswordBtn = $("#changePasswordBtn");
    changePasswordBtn.attr("disabled", true);

    $.ajax({
      url: forcePasswordUpdateApi,
      data: JSON.stringify({
        email: email,
        oldPassword: password,
        password: CPpassword,
        passwordConfirm: CPconfirmpassword,
      }),
      method: "put",
      success: function (result) {
        $("#changePasswordmodal").modal("hide");
        $("#successmsg").modal("show");
        changePasswordBtn.attr("disabled", false);
      },
      error: function (payload) {
        swal({
          text: payload.responseJSON.msg,
        });
        changePasswordBtn.attr("disabled", false);
      },
    });
  }
} 

function login() {
  let form = $("#otpform");
  form.validate({
    rules: {
      text: {
        required: true,
      },
    },
  });

  if (form.valid()) {
    $("#verifyotp").attr("disabled", true);
    otp = $("#otp").val();

    $.ajax({
      url: loginApi,
      method: "post",
      data: JSON.stringify({ email: email, otp: otp }),
      success: (response) => {
        let userData = { ...response.data };
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem(
          "tokenExpiry",
          response.data.tokenExpireIn + new Date().getTime()
        );
        localStorage.setItem("userOtherDetails", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        $.ajax({
          url: "/createSession",
          data: JSON.stringify({
            token: response.data.token,
            user: response.data,
          }),
          method: "post",
          success: (result) => {
            window.location = "/admin";
            $("#verifyotp").attr("disabled", false);
          },
          error: (payload) => {
            swal({
              text: payload.responseJSON.msg,
            });
            $("#verifyotp").attr("disabled", false);
            $("#loginBtn").attr("disabled", false);
          },
        });
      },
      error: (payload) => {
        swal({
          text: payload.responseJSON.msg,
        });
        $("#verifyotp").attr("disabled", false);
      },
    });
  }
}

function sendEmailForgotPassword() {
  let form1 = $("#forgotPasswordForm");
  form1.validate({
    rules: {
      emailForRecovery: {
        required: true,
        email: true,
      },
    },
  });

  if (form1.valid()) {
    let sendEmailForgotPasswordBtn = $("#sendEmailForgotPasswordBtn");
    sendEmailForgotPasswordBtn.attr("disabled", true);
    email = $("#emailForRecovery").val();

    $.ajax({
      url: forgotPasswordApi,
      method: "post",
      data: JSON.stringify({ email: email }),
      success(result) {
        $("#forgotmodalstore").modal("hide");
        sendEmailForgotPasswordBtn.attr("disabled", false);
        $("#resetmodal").modal("show");
      },
      error: (payload) => {
        swal({
          text: payload.responseJSON.msg,
        });
        sendEmailForgotPasswordBtn.attr("disabled", false);
      },
    });
  }
}

function verifyForgotPasswordOtp() {
  let resetPasswordForm = $("#resetPasswordForm");

  resetPasswordForm.validate({
    rules: {
      resetPasswordOtp: {
        required: true,
      },
      resetPasswordPassword: {
        required: true,
      },
      resetPresetPasswordConfirmPasswordasswordOtp: {
        required: true,
      },
    },
  });

  if (resetPasswordForm.valid()) {
    let resetPasswordOtp = $("#resetPasswordOtp").val();
    let resetPasswordPassword = $("#resetPasswordPassword").val();
    let resetPasswordConfirmPassword = $("#resetPasswordConfirmPassword").val();
    let resetPasswordSubmitBtn = $("#resetPasswordSubmitBtn");
    resetPasswordSubmitBtn.attr("disabled", true);

    $.ajax({
      url: resetPasswordApi,
      data: JSON.stringify({
        otp: resetPasswordOtp,
        email: email,
        password: resetPasswordPassword,
        passwordConfirm: resetPasswordConfirmPassword,
      }),
      method: "post",
      success: function (result) {
        $("#resetmodal").modal("hide");
        $("#successmsg").modal("show");
        resetPasswordSubmitBtn.attr("disabled", false);
      },
      error: function (payload) {
        swal({
          text: payload.responseJSON.msg,
        });
        resetPasswordSubmitBtn.attr("disabled", false);
      },
    });
  }
}

function sendPhoneOtp() {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  let mobileNumber = userDetails.mobileNumber;
  let sendPhoneOtpBtn = $("#sendPhoneOtpBtn");
  sendPhoneOtpBtn.attr("disabled", true);
  $.ajax({
    url: "" + sendOtpApi + "?channel=sms&mobileNumber=" + mobileNumber + "",
    method: "post",
    success: function (result) {
      $("#phonemodal p").html(
        "Code has been sent on xxx xxx xx" + mobileNumber.slice(-2) + ""
      );
      $("#phonemodal").modal("show");
      sendPhoneOtpBtn.attr("disabled", false);
    },
    error: function (payload) {
      swal({
        text: payload.responseJSON.msg,
      });
      sendPhoneOtpBtn.attr("disabled", false);
    },
  });
}

function verifyPhoneOtp() {
  let phoneOtpForm = $("#phoneOtpForm");
  phoneOtpForm.validate({
    rules: {
      phoneOtpInput: {
        required: true,
      },
    },
  });

  if (phoneOtpForm.valid()) {
    let user = JSON.parse(localStorage.getItem("user"));
    let otp = $("#phoneOtpForm :text").val();

    $.ajax({
      url:
        "" +
        verifyOtpApi +
        "?channel=sms&mobileNumber=" +
        user.mobileNumber +
        "&otp=" +
        otp +
        "",
      method: "post",
      success: function (payload) {
        swal({
          text: "Mobile Number Verified",
        });
        $("#phonemodal").modal("hide");
        let sendPhoneOtpBtn = $("#sendPhoneOtpBtn");
        sendPhoneOtpBtn.attr("disabled", true);
        sendPhoneOtpBtn.html("Verified");
        isPhoneVerified = true;
        if (isEmailVerified && isPhoneVerified) {
          $("#firstTimeLoginBtn").attr("disabled", false);
        }
      },
      error: function (payload) {
        swal({
          text: payload.responseJSON.msg,
        });
      },
    });
  }
}

function sendEmailOtp() {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  let email = userDetails.email;
  let sendEmailOtpBtn = $("#sendEmailOtpBtn");
  sendEmailOtpBtn.attr("disabled", true);

  $.ajax({
    url: "" + sendOtpApi + "?channel=email&email=" + email + "",
    method: "post",
    success: function (result) {
      $("#emailmodal p").html(
        "Code has been sent on " + email.slice(0,3) + "**********"
      );
      $("#emailmodal").modal("show");
      sendEmailOtpBtn.attr("disabled", false);
    },
    error: function (payload) {
      swal({
        text: payload.responseJSON.msg,
      });
      sendEmailOtpBtn.attr("disabled", false);
    },
  });
}

function verifyEmailOtp() {
  let emailOtpForm = $("#emailOtpForm");
  emailOtpForm.validate({
    rules: {
      emailOtpInput: {
        required: true,
      },
    },
  });

  if (emailOtpForm.valid()) {
    let user = JSON.parse(localStorage.getItem("user"));
    let otp = $("#emailOtpForm :text").val();

    $.ajax({
      url:
        "" +
        verifyOtpApi +
        "?channel=email&email=" +
        user.email +
        "&otp=" +
        otp +
        "",
      method: "post",
      success: function (payload) {
        swal({
          text: "Email verified",
        });
        $("#emailmodal").modal("hide");
        let sendEmailOtpBtn = $("#sendEmailOtpBtn");
        sendEmailOtpBtn.attr("disabled", true);
        sendEmailOtpBtn.html("Verified");
        isEmailVerified = true;
        if (isEmailVerified && isPhoneVerified) {
          $("#firstTimeLoginBtn").attr("disabled", false);
        }
      },
      error: function (payload) {
        swal({
          text: payload.responseJSON.msg,
        });
      },
    });
  }
}

function firstTimeLogin() {
  let user = JSON.parse(localStorage.getItem("user"));
  $("#firstTimeLoginBtn").attr("disabled", true);

  $.ajax({
    url: firstLoginApi,
    method: "post",
    data: JSON.stringify({ email: user.email }),
    success: (response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem(
        "tokenExpiry",
        response.data.tokenExpireIn + new Date().getTime()
      );
      localStorage.setItem("userOtherDetails", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      $.ajax({
        url: "/createSession",
        data: JSON.stringify({
          token: response.data.token,
          user: response.data,
        }),
        method: "post",
        success: (result) => {
          window.location = "/admin";
          $("#firstTimeLoginBtn").attr("disabled", false);
        },
        error: (payload) => {
          swal({
            text: payload.responseJSON.msg,
          });
          $("#sendEmailOtpBtn").attr("disabled", false);
          $("#sendPhoneOtpBtn").attr("disabled", false);
          $("#firstTimeLoginBtn").attr("disabled", false);
        },
      });
    },
    error: (payload) => {
      swal({
        text: payload.responseJSON.msg,
      });
      $("#sendEmailOtpBtn").attr("disabled", false);
      $("#sendPhoneOtpBtn").attr("disabled", false);
      $("#firstTimeLoginBtn").attr("disabled", false);
    },
  });
}


// const maskNumber = (number) => {
//   return ('' + number).slice(3, -2)
//             .replace(/./g, '#')
//             + ('' + number).slice(-2);
// }

// function login() {

//     let form = $('#loginForm');
//     form.validate({
//         rules: {
//             email: {
//                 required: true,
//                 email: true
//             },
//             password: {
//                 required: true
//             }
//         }
//     });

//     if (form.valid()) {

//         $('#loginBtn').attr('disabled', true);
//         let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//             Username: $('#email').val(),
//             Password: $('#password').val(),

//         });
//         userIdentity($('#email').val());
//         cognitoUser.authenticateUser(authenticationDetails, {

//             onSuccess: async (result) => {
//                 const retObj = {
//                     'access_token': result.getAccessToken().getJwtToken(),
//                     'id_token': result.getIdToken().getJwtToken(),
//                     'refresh_token': result.getRefreshToken().getToken(),
//                     'cognitoUserId': result.getIdToken().payload.sub,
//                     'email': $('#email').val()
//                 }

//                 $.ajax({
//                     url: loginApi,
//                     method: 'post',
//                     data: JSON.stringify({ 'cognitoId': retObj.cognitoUserId }),
//                     success: (response) => {
//                         response.data.role = response.data.roleDetails;
//                         console.log('response.data.role',response.data.role);
//                         console.log(response.data.role === undefined);
//                         if(response.data.role === undefined){
//                             response.data.role ={
//                                 role:{
//                                     "create":"false",
//                                     "update":"false",
//                                     "delete":"false",
//                                     "view":"false"
//                                 },
//                                 metadata:{
//                                     "create":"false",
//                                     "update":"false",
//                                     "delete":"false",
//                                     "view":"false"
//                                 },
//                                 invoice:{
//                                     "view":"false"
//                                 },
//                                 reports : {
//                                     "view":"false"
//                                 }
//                             }
//                         }
//                         console.log(response.data.role);
//                         localStorage.setItem('user', JSON.stringify(retObj));
//                         localStorage.setItem('tokenExpiry', (result.accessToken.payload.exp * 1000));
//                         localStorage.setItem('userOtherDetails', JSON.stringify(response.data));
//                         localStorage.setItem('newTokenInProgress', false);

//                         $.ajax({
//                             url: '/createSession',
//                             data: JSON.stringify({ 'tokenData': retObj, 'userData': response.data }),
//                             method: 'post',
//                             success: (result) => {
//                                 window.location = '/admin';
//                             }, error: (result) => {
//                                 toastr.show(result.responseJSON.msg);
//                             }
//                         })
//                     }, error: (payload) => {
//                         toastr.show(payload.responseJSON.msg);
//                     }
//                 });
//             },

//             onFailure: (err) => {
//                 console.log('err', err);
//                 swal({
//                     text: err.message,
//                 });
//                 $('#loginBtn').attr('disabled', false);

//             },

//             mfaRequired: (codeDeliveryDetails) => {
//                 swal({
//                     title: "OTP Authentication",
//                     text: "OTP send to your Mobile Number!",
//                     button: {
//                         text: "submit",
//                         className: "btn btn-primary"
//                     },
//                     content: {
//                         element: "input",
//                         attributes: {
//                             placeholder: "Enter OTP",
//                             type: "text",
//                         },
//                     },
//                 }).then(function (data) {

//                     let verificationCode = data;
//                     cognitoUser.sendMFACode(verificationCode, {
//                         onSuccess: (result) => {
//                             const retObj = {
//                                 'access_token': result.getAccessToken().getJwtToken(),
//                                 'id_token': result.getIdToken().getJwtToken(),
//                                 'refresh_token': result.getRefreshToken().getToken(),
//                                 'cognitoUserId': result.getIdToken().payload.sub,
//                                 'email': $('#email').val()
//                             };

//                             $.ajax({
//                                 url: loginApi,
//                                 data: JSON.stringify(
//                                     {
//                                         'accessToken': retObj.access_token,
//                                         'cognitoId': retObj.cognitoUserId,
//                                         'refreshToken': retObj.refresh_token
//                                     }),
//                                 method: 'post',
//                                 success: (response) => {
//                                     response.data.role = response.data.roleDetails;
//                                     console.log('response.data.role',response.data.role);
//                                     console.log(response.data.role === undefined);
//                                     if(response.data.role === undefined){
//                                         response.data.role ={
//                                             role:{
//                                                 "create":"false",
//                                                 "update":"false",
//                                                 "delete":"false",
//                                                 "view":"false"
//                                             },
//                                             metadata:{
//                                                 "create":"false",
//                                                 "update":"false",
//                                                 "delete":"false",
//                                                 "view":"false"
//                                             },
//                                             invoice:{
//                                                 "view":"false"
//                                             },
//                                             reports : {
//                                                 "view":"false"
//                                             }
//                                         }
//                                     }
//                                     console.log(response.data.role);
//                                     if(response.data.role === undefined){
//                                         response.data.role ={
//                                             role:{
//                                                 "create":"false",
//                                                 "update":"false",
//                                                 "delete":"false",
//                                                 "view":"false"
//                                             },
//                                             metadata:{
//                                                 "create":"false",
//                                                 "update":"false",
//                                                 "delete":"false",
//                                                 "view":"false"
//                                             },
//                                             invoice:{
//                                                 "view":"false"
//                                             },
//                                             reports : {
//                                                 "view":"false"
//                                             }
//                                         }
//                                     }
//                                     localStorage.setItem('user', JSON.stringify(retObj));
//                                     localStorage.setItem('tokenExpiry', (result.accessToken.payload.exp * 1000));
//                                     localStorage.setItem('userOtherDetails', JSON.stringify(response.data));
//                                     localStorage.setItem('newTokenInProgress', false);

//                                     $.ajax({
//                                         url: 'createSession',
//                                         data: JSON.stringify(
//                                             {
//                                                 'tokenData': retObj,
//                                                 'userData': result.data
//                                             }),
//                                         method: 'post',
//                                         success: (result) => {
//                                             window.location = '/admin';
//                                         }, error: (response) => {
//                                             toastr.show(result.responseJSON.msg);
//                                         }
//                                     });
//                                 }, error: (result) => {
//                                     toastr.show(result.responseJSON.msg);
//                                 }
//                             });

//                             $('#loginBtn').attr('disabled', false);

//                         }, onFailure: (err) => {
//                             swal({
//                                 text: err.message,
//                             });
//                             $('#loginBtn').attr('disabled', false);

//                         }
//                     });
//                 })

//             },

//             newPasswordRequired: (userAttributes, requiredAttributes) => {
//                 $('.loginContainer').hide();
//                 $('.changePasswordContainer').show();

//                 delete userAttributes.email_verified;
//                 delete userAttributes.phone_number_verified;
//                 delete userAttributes.phone_number;
//                 userAttributes.name = 'Test';
//                 user = userAttributes;
//             }
//         });
//         // $('#loginBtn').prop('disabled', false);

//     }
// }

// function handleNewPassword() {

//     let form = $('#updatePassword');
//     console.log(form);
//     form.validate({
//         rules: {
//             newPassword: {
//                 required: true
//             },
//             confirmPassword: {
//                 required: true,
//                 equalTo: "#update_newPassword"
//             }
//         }
//     });

//     if (form.valid() && isUpdatePassword) {
//         // let userData = {
//         //     Username: $('#email').val(),
//         //     Pool: userPool
//         // };
//         isUpdatePassword = false
//         const newPassword = $('#update_confirmPassword').val();
//         cognitoUser.completeNewPasswordChallenge(newPassword, user, {
//             onSuccess: async (result) => {
//                 swal({
//                     text: "Password Successfully changed",
//                 });
//                 cognitoUser.enableMFA(function (err, result) {
//                     if (err) {
//                         // alert(err.message || JSON.stringify(err));
//                         return;
//                     }
//                     console.log('call result: ' + result);
//                 });
//                 setTimeout(function () {
//                     window.location = '';
//                 }, 3000);
//             },
//             onFailure: (err) => {
//                 swal({
//                     text: err.message,
//                 });
//             },
//         });

//         isUpdatePassword = true;
//     }
// }

// function sendEmailForgotPassword() {
//     let form1 = $('#forgotPasswordForm');
//     form1.validate({
//         rules: {
//             emailForRecovery: {
//                 required: true
//             }
//         }
//     });

//     if (form1.valid()) {
//         userIdentity($('#emailForRecovery').val());
//         // let userExist = false;
//         // $.ajax({
//         //     url: `${apiPrefix}/admin/checkUser`,
//         //     data: { email: $('#emailForRecovery').val() },
//         //     method: 'get',
//         //     success(result) {

//         cognitoUser.forgotPassword({
//             onSuccess(data) {
//                 // successfully initiated reset password request
//                 console.log('CodeDeliveryData from forgotPassword: ' + data);
//             },
//             onFailure(err) {
//                 console.log(err);
//                 // console.log(err.message);
//                 // alert(err.message || JSON.stringify(err));
//             },
//             //Optional automatic callback
//             inputVerificationCode(data) {
//                 $('#forgotPasswordModel').modal('toggle');

//                 swal({
//                     title: "OTP Authentication",
//                     text: "OTP send to your email",
//                     button: {
//                         text: "submit",
//                         className: "btn btn-primary"
//                     },
//                     content: {
//                         element: "input",
//                         attributes: {
//                             placeholder: "Enter OTP",
//                             type: "text",
//                         },
//                     },
//                 }).then((data) => {
//                     console.log('Code sent to: ', data);
//                     // var code = prompt('Enter Code', '');
//                     otp = data;
//                     $('#resetmodal').modal();
//                 });

//             },
//         });

//     }

// }

// function verifyForgotPasswordOtp() {

//     $.ajax({
//         url: "/verifyForgotPasswordOTP",
//         data: { otp: $('#otpforgotPassword').val(), email: email },
//         method: 'post',
//         success: function (result) {
//             otp = $('#otpforgotPassword').val();
//             $('#otpForgotPasswordmodal').modal('toggle');
//             $('#resetmodal').modal('toggle');

//             $('#optForgotPasswordForm').trigger('reset');
//         }, error: function (result) {
//             console.log(result);
//             toastr.show(result.responseJSON.msg);
//         }
//     })

// }

// function setPassword() {
//     // var newPassword = prompt('Enter new Password', '');

//     let formData = $('#passwordForm'); //.serialize();
//     console.log(formData);
//     formData.validate({
//         rules: {
//             newPassword: {
//                 minlength: 8,
//                 required: true
//             },
//             confirmPassword: {
//                 required: true,
//                 minlength: 8,
//                 equalTo: "#newPassword"
//             }
//         },

//     });
//     if (formData.valid()) {
//         cognitoUser.confirmPassword(otp, $('#newPassword').val(), {
//             onSuccess() {
//                 $('#resetmodal').modal('toggle');
//                 swal({
//                     text: 'Your Password has been changed successfully',
//                 });
//                 setTimeout(function (params) {
//                     window.location = '';
//                 }, 3000);
//             },
//             onFailure(err) {
//                 $('#resetmodal').modal('toggle');
//                 swal({
//                     text: err.message,
//                 });
//                 setTimeout(function (params) {
//                     window.location = '';
//                 }, 3000);
//             },
//         });
//     }

// $.ajax({
//     url: "/setNewPassword",
//     data: { otp: otp, email: email, 'password': $('#newPassword').val(), 'confirmPassword': $('#confirmPassword').val() },
//     method: 'post',
//     success: function (result) {

//         $('#resetmodal').modal('toggle');
//         $('#sucessmsg').modal();
//         $('#passwordForm').trigger('reset');

//     }, error: function (result) {
//         toastr.show(result.responseJSON.msg);
//     }
// })
//
// }
