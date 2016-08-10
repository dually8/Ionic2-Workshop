import { addProviders, async, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { baseProviders } from '../../../test/common-providers';
import { FirebaseProvider } from '../../providers/firebase-provider/firebase-provider';
import { ViewPage } from './view-page';

let specProviders = baseProviders.concat([
    FirebaseProvider,
    provide(LoadingController, { useClass: LoadingController }),
]);

describe('ViewPage', () => {
    let page: ViewPage;
    let pageDep: any[] = [NavController, FirebaseProvider];

    beforeEach(() => {
        addProviders(specProviders);
    });

    it('should be defined', inject(pageDep, (_nav, _load, _fb) => {
        // todo: complete this test
    }));

    it('should call get photos', inject(pageDep, (_nav, _load, _fb) => {
        // todo: complete this test
    }));
});
