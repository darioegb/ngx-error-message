import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsComponent, TemplateDrivenFormsComponent } from './pages'

const routes: Routes = [
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
        './pages/without-internationalization/without-internationalization.module'
      ).then((m) => m.WithoutInternationalizationModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
