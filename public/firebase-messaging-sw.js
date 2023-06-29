importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

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

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon: 'https://doctrace-public.s3.amazonaws.com/LogoIcon.png'
    };
    return self.registration.showNotification('Doctrace',notificationOption);
});
