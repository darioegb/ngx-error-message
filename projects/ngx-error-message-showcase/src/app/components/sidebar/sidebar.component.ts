import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    standalone: false
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = true;
  #sidebarService = inject(SidebarService)

  ngOnInit(): void {
    this.#sidebarService.sidebarState$.subscribe(state => {
      this.isCollapsed = state;
    });
  }
}
