import { Routes } from '@angular/router'
import {
  ReactiveFormsComponent,
  SignalFormsComponent,
  TemplateDrivenFormsComponent,
} from './pages'

export const routes: Routes = [
  { path: '', redirectTo: '/template-driven-forms', pathMatch: 'full' },
  { path: 'reactive-forms', component: ReactiveFormsComponent },
  { path: 'signal-forms', component: SignalFormsComponent },
  {
    path: 'template-driven-forms',
    component: TemplateDrivenFormsComponent,
  },
  {
    path: 'without-internationalization',
    loadChildren: () =>
      import('./pages/without-internationalization/without-internationalization.routes').then(
        (r) => r.withoutInternationalizationRoutes,
      ),
  },
]
