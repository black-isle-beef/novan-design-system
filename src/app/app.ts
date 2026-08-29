import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('novan-design-system');
}
