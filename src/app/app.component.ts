import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'automated-aquaponic-system';

  content = 'SOCKETS';
  // content = 'GROWTH_DATA';

  public setContent(content: string) {
    this.content = content;
  }
}

