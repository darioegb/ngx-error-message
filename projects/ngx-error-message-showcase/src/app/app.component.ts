import { Component, inject, OnInit } from '@angular/core'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { MainContentComponent } from './components/main-content/main-content.component'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, SidebarComponent, MainContentComponent],
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService)

  ngOnInit(): void {
    const lang = localStorage.getItem('lang')
    this.translate.use(lang ? lang : this.translate.defaultLang)
  }
}
