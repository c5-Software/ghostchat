import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    userProfile: any = null;

    constructor(public navCtrl: NavController, private facebook: Facebook) { }

    facebookLogin(): void {
        /*
            NOTES:
            I think when developing this for multiple machines, or release, we might need to build actual hash keys:
            
            something like this eventually: 
            keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | C:\install-bits\bin\openssl sha1 -binary | C:\install-bits\bin\openssl base64 

            relevant links:
            https://ionicthemes.com/tutorials/about/ionic2-facebook-login
            http://stackoverflow.com/questions/16767672/key-hash-doesnt-match-while-facebook-login-in-android
            https://developers.facebook.com/docs/android/getting-started#samples
            https://ionicframework.com/docs/native/facebook/

            https://developers.facebook.com/apps/1891229357790061/settings/

         */

        this.facebook.login(['email']).then((res) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(res.authResponse.accessToken);

            firebase.auth().signInWithCredential(facebookCredential)
                .then((success) => {
                    console.log("Firebase success: " + JSON.stringify(success));
                    this.userProfile = success;
                })
                .catch((error) => {
                    console.log("Firebase failure: " + JSON.stringify(error));
                });

        }).catch((error) => {
            console.dir("complete failure", error)
        });
    }
}
