import { Component, inject, OnInit } from '@angular/core'
import { SidebarService } from '../sidebar/sidebar.service'

import { TranslateService } from '@ngx-translate/core'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
  #sidebarService = inject(SidebarService)
  #translate = inject(TranslateService)
  #router = inject(Router)

  ngOnInit(): void {
    const lang = localStorage.getItem('lang')
    this.languaje = lang ? lang : this.#translate.defaultLang
    this.#sidebarService.sidebarState$.subscribe((state) => {
      this.isCollapsed = state
    })
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.withoutInternationalization =
          this.#router.url === '/without-internationalization'
      }
    })
  }

  changeLanguaje(): void {
    this.#translate.use(this.languaje)
    localStorage.setItem('lang', this.languaje)
  }

  toggleSidebar(): void {
    this.#sidebarService.toggleSidebar()
  }
}
