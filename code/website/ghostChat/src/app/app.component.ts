import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

        firebase.initializeApp({
            apiKey: "AIzaSyAFqbQi-MZLZcdT5eLeIC--pv1FDIT6WGM",
            authDomain: "ghost-chat-d8ef7.firebaseapp.com",
            databaseURL: "https://ghost-chat-d8ef7.firebaseio.com",
            projectId: "ghost-chat-d8ef7",
            storageBucket: "ghost-chat-d8ef7.appspot.com",
            messagingSenderId: "73086213424"
        });



        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

