import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { SingleDayComponent } from './single-day/single-day.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MatToolbar, MatIconButton, MatTooltip, MatIcon, SingleDayComponent]
})
export class AppComponent {
  title = 'covid-tracking-US-atlantic-material';

  openLinkInTab(url: string) {
    window.open(url, "_blank");
  }
}
