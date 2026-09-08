import { TestBed } from '@angular/core/testing'
import { SidebarService } from './sidebar.service'

describe('SidebarService', () => {
  let service: SidebarService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SidebarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should toggle the sidebar state', () => {
    let currentState = true // Initialize currentState
    service.sidebarState$.subscribe((state) => (currentState = state))

    service.toggleSidebar()
    expect(currentState).toBe(false)

    service.toggleSidebar()
    expect(currentState).toBe(true)
  })

  it('should return the correct sidebar state', () => {
    let currentState = true // Initialize currentState
    service.sidebarState$.subscribe((state) => (currentState = state))

    service.toggleSidebar()
    expect(currentState).toBe(false)

    service.toggleSidebar()
    expect(currentState).toBe(true)
  })
})
