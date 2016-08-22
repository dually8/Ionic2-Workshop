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
        return new Promise((resolve, reject) => {
            // todo 6: get the photos from firebase
        });
    }
}
