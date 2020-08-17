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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    function addToLog(log) {
        document.getElementById("notification-logs").innerHTML = log;
    }

    // Cordova is now initialized. Have fun!
    async function iniToken(){
        //const fcmToken = await FCM.getToken();
        const topic = "123456";
        await FCM.subscribeToTopic(topic);
        //addToLog(fcmToken);   

        if (cordova.platformId == 'android') {
            StatusBar.overlaysWebView(true);
            StatusBar.backgroundColorByHexString("#ea2525");
        }
    }
    
    // async function notificacaoPush(){
    //     const disposable = await FCM.onNotification();
    //     addToLog(disposable.wasTapped);
    // }

    async function notificacaoTap(){
        const pushPayload = await FCM.getInitialPushPayload();
        addToLog("<pre>"+JSON.stringify(pushPayload)+"</pre>");

        if(pushPayload.wasTapped){
            // window.location.href="pagina.html";
            window.location.href = pushPayload.pagina;
        }

        
    }

    


    //iniToken();
    notificacaoTap();
    // notificacaoPush();

    /*console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');*/
}
