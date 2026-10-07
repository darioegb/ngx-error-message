import { TestBed, ComponentFixture } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'
import { CodeSnippetComponent, SETUP_SNIPPET } from './code-snippet.component'

describe('CodeSnippetComponent', () => {
  let fixture: ComponentFixture<CodeSnippetComponent>
  let component: CodeSnippetComponent

  const stubClipboard = (writeText: () => Promise<void>): void => {
    const win = TestBed.inject(DOCUMENT).defaultView!
    Object.defineProperty(win.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CodeSnippetComponent] })
    fixture = TestBed.createComponent(CodeSnippetComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('usage', 'const usage = 1')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show the usage snippet by default', () => {
    expect(component.snippet()).toBe('const usage = 1')
  })

  it('should switch to the setup snippet', () => {
    component.activeTab.set('setup')
    expect(component.snippet()).toBe(SETUP_SNIPPET)
  })

  it('should copy the code and reset the copied flag after the delay', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)

    await component.copy()

    expect(writeText).toHaveBeenCalledWith('const usage = 1')
    expect(component.copied()).toBe(true)

    vi.advanceTimersByTime(1500)
    expect(component.copied()).toBe(false)
    vi.useRealTimers()
  })

  it('should keep copied false when the clipboard write fails', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')))

    await component.copy()

    expect(component.copied()).toBe(false)
  })
})
