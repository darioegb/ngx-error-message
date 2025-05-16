import { Component } from '@angular/core'
import { NgForm, FormsModule } from '@angular/forms'
import { regEx } from 'projects/ngx-error-message/src/public-api'
import { NgxErrorMessageDirective } from '../../../../../ngx-error-message/src/lib/ngx-error-message.directive'
import { AvoidMultipleZeroValidatorDirective } from '../../directives/avoid-mutiple-zero-validator.directive'
import { JsonPipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.scss',
  imports: [
    FormsModule,
    NgxErrorMessageDirective,
    AvoidMultipleZeroValidatorDirective,
    JsonPipe,
    TranslateModule,
  ],
})
export class TemplateDrivenFormsComponent {
  model = {
    name: {
      firstName: '',
      lastName: '',
    },
    username: '',
    password: '',
    email: '',
    salary: '',
    aliases: [''],
  }

  patterns = regEx

  addAlias(): void {
    this.model.aliases.push('')
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return
    }
    console.log('Form Submitted', this.model)
  }

  trackByIndex(index: number): number {
    return index
  }
}
