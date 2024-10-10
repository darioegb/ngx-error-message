import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithoutInternationalizationComponent } from './without-internationalization.component';


const routes: Routes = [
  {
    path: '',
    component: WithoutInternationalizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithoutInternationalizationRoutingModule {}
