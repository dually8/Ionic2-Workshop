/**
 * This wrapper class is completed for your convience. :)
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseProvider {

    public get isAuthenticated(): boolean {
        return !!firebase.auth().currentUser; // returns truthy value on the current user
    }

    constructor() {
    }

    createAccount(email: string, password: string): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log('Created user: ' + user.email);
                    return this.loginWithEmail(email, password);
                }).then((user) => {
                    resolve(user);
                }).catch((er) => {
                    console.error('Problem with create account');
                    console.error(er);
                    reject(er);
                });
        });
    }

    loginWithEmail(email: string, password: string): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log('Logged in user: ' + user.email);
                    resolve(user);
                }).catch((er) => {
                    console.error(er);
                    reject(er);
                });
        });
    }

    getPics(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthenticated) {
                reject('not authenticated');
                return;
            }
            let query = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/imgs').orderByKey();

            query.once('value')
                .then((snapshot: firebase.database.DataSnapshot) => {
                    console.log('Get pics snapshot success');
                    let pics = [];
                    snapshot.forEach((child) => {
                        if (typeof child.val() === 'string') {
                            pics.push(child.val());
                        }
                    });
                    console.log(`Got ${pics.length} pics`);
                    resolve(pics);
                }).catch((er) => {
                    console.error(er);
                    reject(er);
                });
        });
    }

    uploadPic(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthenticated) {
                reject('not authenticated');
                return;
            }
            const user = firebase.auth().currentUser.uid;
            const path = 'users/' + user;
            let key = firebase.database().ref(path).child('imgs').key;
            firebase.database().ref(path).child('imgs').push(data)
                .then((res) => {
                    console.log('successfully uploaded photo');
                    console.log(res);
                    resolve();
                }).catch((er) => {
                    console.error(er);
                    reject(er);
                });
        });
    }
}
