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
        // todo: complete this test
    })));

    it('should login with email', async(inject([FirebaseProvider], (_fb: FirebaseProvider) => {
        // todo: complete this test
    })));
});
