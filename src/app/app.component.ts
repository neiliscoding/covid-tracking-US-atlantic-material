import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'covid-tracking-US-atlantic-material';

  openLinkInTab(url: string) {
    window.open(url, "_blank");
  }
}
