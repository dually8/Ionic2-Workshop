import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { UploadPage } from './pages/upload-page/upload-page';
import { ViewPage } from './pages/view-page/view-page';
import { FirebaseProvider } from './providers/firebase-provider/firebase-provider';

@Component({
    templateUrl: 'build/app.html',
    providers: [FirebaseProvider]
})
class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = UploadPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Upload Photos', component: UploadPage },
            { title: 'View Saved Photos', component: ViewPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

            // firebase stuff
            // todo 1: fill in your firebase credentials here.
            const config = {
                apiKey: '{YOUR STUFF HERE}',
                authDomain: '{YOUR STUFF HERE}',
                databaseURL: '{YOUR STUFF HERE}',
                storageBucket: '{YOUR STUFF HERE}',
            };

            const app = firebase.initializeApp(config); // call only once!
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

ionicBootstrap(MyApp);
