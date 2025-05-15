import { Routes } from '@angular/router'
import { ReactiveFormsComponent, TemplateDrivenFormsComponent } from './pages'

export const routes: Routes = [
  { path: '', redirectTo: '/template-driven-forms', pathMatch: 'full' },
  { path: 'reactive-forms', component: ReactiveFormsComponent },
  {
    path: 'template-driven-forms',
    component: TemplateDrivenFormsComponent,
  },
  {
    path: 'without-internationalization',
    loadChildren: () =>
      import(
        './pages/without-internationalization/without-internationalization.routes'
      ).then((r) => r.withoutInternationalizationRoutes),
  },
]
