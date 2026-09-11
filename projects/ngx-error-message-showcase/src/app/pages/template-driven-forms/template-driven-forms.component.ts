import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NgForm, FormsModule } from '@angular/forms'
import { NgxErrorMessageDirective, regEx } from 'ngx-error-message'
import { AvoidMultipleZeroValidatorDirective } from '../../directives/avoid-mutiple-zero-validator.directive'
import { JsonPipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NgxErrorMessageDirective,
    AvoidMultipleZeroValidatorDirective,
    JsonPipe,
    TranslatePipe,
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
