import { addProviders, async, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController } from 'ionic-angular';
import { baseProviders } from '../../../test/common-providers';
import { FirebaseProvider } from '../../providers/firebase-provider/firebase-provider';
import { UploadPage } from './upload-page';

let specProviders = baseProviders.concat([
    FirebaseProvider,
    ModalController,
    ActionSheetController,
    ToastController
]);

describe('UploadPage', () => {
    let page: UploadPage;
    let pageDep: any[] = [NavController, ModalController, ActionSheetController, ToastController, FirebaseProvider];

    beforeEach(() => {
        addProviders(specProviders);
    });

    it('should be defined', inject(pageDep, (_nav, _modal, _action, _toast, _fb) => {
        // todo: complete this test
        page = new UploadPage(_nav, _modal, _action, _toast, _fb);
        expect(page).toBeDefined();
    }));

    it('should take pic', async(inject(pageDep, (_nav, _modal, _action, _toast, _fb) => {
        // todo: complete this test
        page = new UploadPage(_nav, _modal, _action, _toast, _fb);
        spyOn(page, 'getPicture');
        page.takePic();
        // because `getPicture` is a private function, we have to check it this way
        expect(page['getPicture']).toHaveBeenCalled();
    })));
});
