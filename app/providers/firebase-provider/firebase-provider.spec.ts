import { addProviders, async, beforeEach, describe, expect, it, fit, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { serviceProviders } from '../../../test/common-providers';
import { FirebaseProvider } from './firebase-provider';

let specProviders = serviceProviders.concat([
    FirebaseProvider
]);

describe('FirebaseProvider', () => {

    // todo: fill in your firebase credentials here.
    const config = {
        apiKey: '{YOUR STUFF HERE}',
        authDomain: '{YOUR STUFF HERE}',
        databaseURL: '{YOUR STUFF HERE}',
        storageBucket: '{YOUR STUFF HERE}',
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
