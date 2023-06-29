importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAHIujYXqnPdUprbakcxz1CCxHYFUho3gI",
    authDomain: "archivematter-53d61.firebaseapp.com",
    projectId: "archivematter-53d61",
    storageBucket: "archivematter-53d61.appspot.com",
    messagingSenderId: "687537627963",
    appId: "1:687537627963:web:ce335c60fe5645ec190d1e",
    measurementId: "G-4T36GH622Y"
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
