import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.scss',
    imports: [RouterOutlet]
})
export class MainContentComponent {}
