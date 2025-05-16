import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [RouterLinkActive, RouterLink]
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = true;
  private readonly sidebarService = inject(SidebarService)

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isCollapsed = state;
    });
  }
}
