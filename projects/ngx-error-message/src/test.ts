// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);

// translation const
export const ENGLISH_TRANSLATIONS = {
  validations: {
    required: 'The field is required.',
    maxlength: 'The maximum length allowed is {{param}}.',
    minlength: 'The minimum allowed length is {{param}}.',
    email: 'It is not a valid email.',
    min: 'The minimum allowed is {{param}}.',
    max: 'The maximum allowed is {{param}}.',
    pattern: {
      numeric: 'The valid format is numeric.',
      alphabet: 'The valid format is alphabetical.',
      smallLetters: 'The valid format is lowercase letters.',
      capitalLetters: 'The valid format is capital letters.',
      alphaNumeric: 'The valid format is alphanumeric.',
      phoneNumber: 'Invalid phoneNumber.',
      websiteUrl: 'Invalid website url.',
      ip: 'Invalid IP address.',
      custom: `The valid format is alphanumeric and the '.' is allowed`,
    },
    avoidMultipleZero: `Can't start with multiple zeros`,
  },
};
