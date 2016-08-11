import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { UploadPage } from './pages/upload-page/upload-page';
import { ViewPage } from './pages/view-page/view-page';

@Component({
    templateUrl: 'build/app.html'
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
            // todo: put your own stuff here
            const config = {
                apiKey: '',
                authDomain: '',
                databaseURL: '',
                storageBucket: '',
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
