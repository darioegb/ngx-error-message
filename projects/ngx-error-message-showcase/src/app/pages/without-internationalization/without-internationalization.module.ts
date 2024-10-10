import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WithoutInternationalizationComponent } from './without-internationalization.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ComponentsModule } from '../../components/components.module'
import { NgxErrorMessageModule } from 'projects/ngx-error-message/src/public-api'
import { WithoutInternationalizationRoutingModule } from './without-internationalization.routing.module'

@NgModule({
  declarations: [WithoutInternationalizationComponent],
  imports: [
    CommonModule,
    WithoutInternationalizationRoutingModule,
    ReactiveFormsModule,
    NgxErrorMessageModule.forChild({
      errorMessages: {
        required: 'This field is required.',
        maxlength: 'The maximum allowed length is {{param}}.',
        minlength: 'The minimum allowed length is {{param}}.',
        email: 'This is not a valid email address.',
        min: 'The minimum allowed value is {{param}}.',
        max: 'The maximum allowed value is {{param}}.',
        pattern: {
          numeric: 'The valid format is numeric.',
          alphabet: 'The valid format is alphabetic.',
          smallLetters: 'The valid format is lowercase letters.',
          capitalLetters: 'The valid format is uppercase letters.',
          alphaNumeric: 'The valid format is alphanumeric.',
          phoneNumber: 'Invalid phone number.',
          websiteUrl: 'Invalid website URL.',
          ip: 'Invalid IP address.',
          custom: "The valid format is alphanumeric and '.' is allowed.",
        },
        avoidMultipleZero: 'It cannot start with multiple zeros.',
      },
    }),
    ComponentsModule,
  ],
})
export class WithoutInternationalizationModule {}
