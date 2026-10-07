import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core'

const COPIED_FEEDBACK_MS = 1500

/** Shared global setup snippet shown on the "Setup" tab of every demo page. */
export const SETUP_SNIPPET = `import { ApplicationConfig } from '@angular/core'
import { provideNgxErrorMessage } from 'ngx-error-message'
import { withNgxTranslate } from 'ngx-error-message/ngx-translate'

export const appConfig: ApplicationConfig = {
  providers: [
    // optional: '@ngx-translate' integration for translated messages
    provideNgxErrorMessage(withNgxTranslate()),
  ],
}`

type SnippetTab = 'usage' | 'setup'

@Component({
  selector: 'app-code-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card shadow-sm">
      <div
        class="card-header d-flex align-items-center justify-content-between"
      >
        <span class="fw-semibold">Code</span>
        <ul class="nav nav-pills nav-sm">
          <li class="nav-item">
            <button
              type="button"
              class="nav-link py-1"
              [class.active]="activeTab() === 'usage'"
              (click)="activeTab.set('usage')"
            >
              Usage
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link py-1"
              [class.active]="activeTab() === 'setup'"
              (click)="activeTab.set('setup')"
            >
              Setup
            </button>
          </li>
        </ul>
      </div>
      <div class="card-body position-relative p-0">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary copy-btn"
          (click)="copy()"
        >
          {{ copied() ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="code mb-0"><code>{{ snippet() }}</code></pre>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .code {
      min-height: 100%;
      padding: 2.75rem 1rem 1rem;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-size: 0.8125rem;
      line-height: 1.5;
    }
    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 1;
    }
  `,
})
export class CodeSnippetComponent {
  private readonly document = inject(DOCUMENT)
  readonly usage = input.required<string>()
  readonly setup = input(SETUP_SNIPPET)
  readonly activeTab = signal<SnippetTab>('usage')
  readonly copied = signal(false)
  readonly snippet = computed(() =>
    this.activeTab() === 'setup' ? this.setup() : this.usage(),
  )

  async copy(): Promise<void> {
    try {
      await this.document.defaultView?.navigator.clipboard.writeText(
        this.snippet(),
      )
    } catch {
      return
    }
    this.copied.set(true)
    setTimeout(() => this.copied.set(false), COPIED_FEEDBACK_MS)
  }
}
