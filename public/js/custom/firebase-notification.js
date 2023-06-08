var firebaseConfig = {
    apiKey: "AIzaSyCdhBt1kWvsdgkS-_KgavNXyP1azzJXsrM",
    authDomain: "doctrace-notification.firebaseapp.com",
    projectId: "doctrace-notification",
    databaseURL: 'https://doctrace-notification.firebaseio.com',
    storageBucket: "doctrace-notification.appspot.com",
    messagingSenderId: "352179532447",
    appId: "1:352179532447:web:c79997741b1c22dfc568aa",
    measurementId: "G-6L0GENREG3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




const messaging = firebase.messaging();

function IntitalizeFireBaseMessaging() {
    messaging
        .requestPermission()
        .then(function () {
            return messaging.getToken();
        })
        .then(function (token) {
          const fcmCheck =  tokenCheckFcm(token);
            $.ajax({
                url: `${updateFcmApi}`,
                method: 'post',
                data: JSON.stringify({
                    "newFCMToken": fcmCheck.token,
                    "oldFCMToken": fcmCheck.oldToken
                }),
                success: (result) => {
                }, error: (result) => {
                }
            })
            // document.getElementById("token").innerHTML=token;
        })
        .catch(function (reason) {
        });
}

messaging.onMessage(function (payload) {
    const notificationOption = {
        body: payload.notification.body,
        icon: 'https://doctrace-public.s3.amazonaws.com/LogoIcon.png'
    };

    if (Notification.permission === "granted") {
        var notification = new Notification('Doctrace', notificationOption);

        notification.onclick = function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action, '_blank');
            notification.close();
        }
    }

});
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (token) {
            const fcmCheck =  tokenCheckFcm(token);
              $.ajax({
                  url: `${updateFcmApi}`,
                  method: 'post',
                  data: JSON.stringify({
                      "newFCMToken": fcmCheck.token,
                      "oldFCMToken": fcmCheck.oldToken
                  }),
                  success: (result) => {
                  }, error: (result) => {
                  }
              })
        })
        .catch(function (reason) {
        })
})
IntitalizeFireBaseMessaging();
