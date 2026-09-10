import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core'
import { SidebarService } from '../sidebar/sidebar.service'

import { TranslateService } from '@ngx-translate/core'
import { NavigationEnd, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class NavbarComponent implements OnInit {
  languaje!: string
  isCollapsed: boolean = true
  languajes = [
    {
      key: 'English',
      value: 'en',
    },
    {
      key: 'Spanish',
      value: 'es',
    },
  ]
  withoutInternationalization = false
  private readonly sidebarService = inject(SidebarService)
  private readonly translate = inject(TranslateService)
  private readonly router = inject(Router)
  private readonly cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    const lang = localStorage.getItem('lang')
    this.languaje = lang ? lang : this.translate.getFallbackLang()!
    this.sidebarService.sidebarState$.subscribe((state) => {
      this.isCollapsed = state
      this.cdr.markForCheck()
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.withoutInternationalization =
          this.router.url === '/without-internationalization'
        this.cdr.markForCheck()
      }
    })
  }

  changeLanguaje(): void {
    this.translate.use(this.languaje)
    localStorage.setItem('lang', this.languaje)
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar()
  }
}
