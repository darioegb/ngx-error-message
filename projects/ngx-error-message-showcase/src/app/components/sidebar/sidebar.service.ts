import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<boolean>(true)
  sidebarState$ = this.sidebarState.asObservable()

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value)
  }
}
