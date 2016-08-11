import { Component } from '@angular/core';
import { ActionSheetController, Modal, ModalController, NavController, ToastController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { FirebaseProvider } from '../../providers/firebase-provider/firebase-provider';

@Component({
    templateUrl: 'build/pages/upload-page/upload-page.html',
    providers: [FirebaseProvider]
})
export class UploadPage {

    photo: string;
    loginModal: Modal;

    public get isAuthenticated(): boolean {
        return this.fbProv.isAuthenticated;
    }

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        private fbProv: FirebaseProvider) {
        this.loginModal = this.modalCtrl.create(LoginModalPage);
    }

    ionViewDidEnter(): void {
        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser.email);
            this.toastCtrl.create({
                duration: 3000,
                message: `${firebase.auth().currentUser.email} is logged in.`,
                position: 'middle'
            }).present();
        } else {
            console.log('no current user');
            this.showLogin();
        }
    }

    showLogin(): void {
        if (!this.loginModal.isLoaded() || !this.loginModal.isLast()) {
            this.loginModal = this.modalCtrl.create(LoginModalPage);
            this.loginModal.present();
        }
    }

    openOptions(): void {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select One',
            buttons: [
                {
                    text: 'Take Photo',
                    handler: () => {
                        this.takePic();
                    }
                },
                {
                    text: 'Select Photo',
                    handler: () => {
                        this.openGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    openGallery(): void {
        const opts: CameraOptions = {
            // Some common settings are 20, 50, and 100
            quality: 1,
            destinationType: Camera.DestinationType.DATA_URL,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  // Corrects Android orientation quirks
        };
        this.getPicture(opts);
    }

    takePic(): void {
        const opts: CameraOptions = {
            // Some common settings are 20, 50, and 100
            quality: 1,
            destinationType: Camera.DestinationType.DATA_URL,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: false,
            correctOrientation: true  // Corrects Android orientation quirks
        };

        this.getPicture(opts);
    }

    uploadPic(): void {
        if (!this.photo) {
            return;
        }
        this.fbProv.uploadPic(this.photo)
            .then((res) => {
                this.toastCtrl.create({
                    duration: 3000,
                    message: 'Uploaded photo successfully!',
                    position: 'middle'
                }).present();
            }).catch((er) => {
                this.toastCtrl.create({
                    duration: 3000,
                    message: 'Failed to upload photo',
                    position: 'middle'
                }).present();
            });
    }

    private getPicture(opts: CameraOptions): void {
        console.log('gittin da pic');
        Camera.getPicture(opts)
            .then((imgData) => {
                this.photo = 'data:image/jpeg;base64,' + imgData;
            }, (er) => {
                console.error(er);
            });
    }

}

@Component({
    templateUrl: 'build/pages/upload-page/login.html',
    providers: [FirebaseProvider]
})
class LoginModalPage {

    email: string;
    password: string;
    constructor(
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        private fbProv: FirebaseProvider
    ) {
        this.email = '';
        this.password = '';
    }

    login(): void {
        this.fbProv.loginWithEmail(this.email, this.password)
            .then(() => {
                // show success
                this.viewCtrl.dismiss()
                    .then(() => {
                        this.toastCtrl.create({
                            duration: 3000,
                            message: 'Login successful! :)'
                        }).present();
                    });
            }).catch((er) => {
                // show error
                this.toastCtrl.create({
                    duration: 3000,
                    message: 'Login failed'
                }).present();
            });
    }

    createAccount(): void {
        this.fbProv.createAccount(this.email, this.password)
            .then(() => {
                // show success
                this.toastCtrl.create({
                    duration: 3000,
                    message: 'Created account! :)'
                }).present();
            }).catch((er) => {
                // show error
                this.toastCtrl.create({
                    duration: 3000,
                    message: 'Create account failed :('
                }).present();
            });
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }
}
