import { addProviders, async, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { serviceProviders } from '../../../test/common-providers';
import { FirebaseProvider } from './firebase-provider';

let specProviders = serviceProviders.concat([
    FirebaseProvider
]);

describe('FirebaseProvider', () => {

    const config = {
        // todo: put your own stuff here
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        storageBucket: '',
    };

    firebase.initializeApp(config); // call ONLY ONCE

    beforeEach(() => {
        addProviders(specProviders);
    });

    it('should be defined', async(inject([FirebaseProvider], (_fb: FirebaseProvider) => {
        expect(_fb).toBeDefined();
    })));

    it('should login with email', async(inject([FirebaseProvider], (_fb: FirebaseProvider) => {
        _fb.loginWithEmail('test@test.com', 'test123')
            .then((user) => {
                expect(user).toBeDefined();
            });
    })));
});
