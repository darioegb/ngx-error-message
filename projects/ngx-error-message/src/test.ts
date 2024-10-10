// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js'
import 'zone.js/testing'
import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false },
  },
)

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
}

export const SPANISH_TRANSLATIONS = {
  validations: {
    required: 'El campo es requerido.',
  },
}
