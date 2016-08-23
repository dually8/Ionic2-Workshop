import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider/firebase-provider';

@Component({
    templateUrl: 'build/pages/view-page/view-page.html'
})
export class ViewPage {

    myPhotos: string[];

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private fbProv: FirebaseProvider
    ) {
        this.myPhotos = [];
    }

    ionViewDidEnter(): void {
        let loading = this.loadingCtrl.create({
            content: 'Getting photos...'
        });
        loading.present();

        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser.email);
            this.getPhotos()
                .then(() => {
                    loading.dismiss();
                });
        } else {
            console.log('no current user');
            loading.dismiss();
        }
    }

    getPhotos(): Promise<any> {
        // todo 6: get the photos from firebase
        return new Promise((resolve, reject) => {
            this.fbProv.getPics()
                .then((pics: string[]) => {
                    console.log(`Got ${pics.length} pics`);
                    // console.log('Got ' + pics.length + ' pics');
                    this.myPhotos = pics;
                    resolve();
                }).catch((er) => {
                    console.error(er);
                    reject(er);
                });
        });
    }
}
