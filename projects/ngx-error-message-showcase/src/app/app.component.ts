import {
  Component,
  inject,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { MainContentComponent } from './components/main-content/main-content.component'
import { TranslateService } from '@ngx-translate/core'
import { ThemeService } from './theme.service'
import { reportHeightToParent } from './embed-height'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, SidebarComponent, MainContentComponent],
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService)
  private readonly themeService = inject(ThemeService)
  private readonly document = inject(DOCUMENT)
  protected readonly embedded = this.themeService.embedded

  constructor() {
    if (this.embedded) {
      inject(DestroyRef).onDestroy(reportHeightToParent(this.document))
    }
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang')
    this.translate.use(lang ? lang : this.translate.getFallbackLang()!)
  }
}
