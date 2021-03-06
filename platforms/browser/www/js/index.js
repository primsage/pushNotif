/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        // app.setupPush();

        // app.pushNoti();

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBg8xhIFKDRrDGrzP-zLqVmncoXTLb8nNc",
            authDomain: "myfirstapp-5b83a.firebaseapp.com",
            databaseURL: "https://myfirstapp-5b83a.firebaseio.com",
            storageBucket: "myfirstapp-5b83a.appspot.com",
            messagingSenderId: "703826437143"
        };
        firebase.initializeApp(config);
        
        console.log('Firebase Initilized...');
        var fbdb = document.getElementById("fbdb");
        var dbref = firebase.database().ref().child("text");

        dbref.on("value", function(snap){
            var snp = snap.val();
            fbdb.innerText = snap.val();
            console.log(snp);
            app.pushNoti(snp);
            console.log('Value Changedd');
        });

        // navigator.notification.beep(1); 
         // navigator.notification.vibrate(1000);
        // setInterval(function(){ 
            // app.pushNoti();
        // }, 5000);
        


    },
    pushNoti: function(msgV) {

        var time = new Date(); 
        navigator.notification.beep(1); 
        navigator.notification.alert(
            msgV ,         // message
            null,                 // callback
            "Title...",           // title
            'Super'                  // buttonName
        );
        
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "703826437143"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
