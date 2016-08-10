import { provide, Type }                              from '@angular/core';
import { Control }                                    from '@angular/common';
import { Http, HTTP_PROVIDERS }                       from '@angular/http';
import { MockBackend }                                from '@angular/http/testing';
import { App, Config, Form, NavController, Platform } from 'ionic-angular';
import { Camera }                                     from 'ionic-native';
import { CameraMock, ConfigMock, NavMock }            from './mocks';

/**
 * Because promises take a long time some times
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

export let baseProviders: Array<any> = [
    Form,
    provide(Config, { useClass: ConfigMock }),
    provide(App, { useClass: ConfigMock }),
    provide(NavController, { useClass: NavMock }),
    provide(Platform, { useClass: ConfigMock }),
    provide(Camera, { useClass: CameraMock }),
    HTTP_PROVIDERS,
];

export let serviceProviders: Array<any> = [
    provide(Http, { useClass: MockBackend }),
].concat(baseProviders);
