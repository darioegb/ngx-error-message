// spinner.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: `
    <div class="spinner"></div>
  `,
    styles: [`
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #000;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `],
    standalone: false
})
export class SpinnerComponent {}
