import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // test code
    contactItems = [
        'Pokémon Yellow',
        'Super Metroid',
        'Mega Man X',
        'The Legend of Zelda',
        'Pac-Man',
        'Super Mario World',
        'Street Fighter II',
        'Half Life',
        'Final Fantasy VII',
        'Star Fox',
        'Tetris',
        'Donkey Kong III',
        'GoldenEye 007',
        'Doom',
        'Fallout',
        'GTA',
        'Halo'
    ];

    items: FirebaseListObservable<any[]>;

    userProfile: any = null;
    _af: AngularFire;

    constructor(public navCtrl: NavController, private facebook: Facebook, private contacts: Contacts, af: AngularFire) {
        this._af = af;
    }

    ngOnInit() {

        this.items = this._af.database.list('/messages'); //https://github.com/angular/angularfire2/issues/558

    }

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

            chrome://inspect
         */

        this.facebook.login(['email', 'user_friends']).then((res) => {

            console.dir('login response: ', res);

            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

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

    displayContacts(): void {

        // actual code to get contacts
        //     this.contacts.find(['*']).then((people) => {
        //         console.dir('contacts', people)
        //    })
    }

    itemSelected(contactItem: string) {
        console.log("Selected Item", contactItem);

        this.items.push({
            name: 'bob',
            text: 'suck a dick dude'
        }).then(
            () => console.log('message saevd')
        )
    }
}
