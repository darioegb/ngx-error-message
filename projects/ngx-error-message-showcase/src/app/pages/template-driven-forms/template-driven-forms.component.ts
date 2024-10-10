import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import {
  regEx,
} from 'projects/ngx-error-message/src/public-api'

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.scss',
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
