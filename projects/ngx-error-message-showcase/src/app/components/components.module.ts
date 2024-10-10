import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainContentComponent } from './main-content/main-content.component'
import { NavbarComponent } from './navbar/navbar.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SpinnerComponent } from './spinner/spinner.component'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    MainContentComponent,
    NavbarComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    MainContentComponent,
    NavbarComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
})
export class ComponentsModule {}
