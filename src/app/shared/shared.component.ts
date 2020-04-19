import { Component } from '@angular/core';
import { SuiPopupConfig } from 'ng2-semantic-ui';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.less']
})
export class SharedComponent {
  constructor(globalConfig: SuiPopupConfig) {
    globalConfig.trigger = 'outsideClick';
    globalConfig.transitionDuration = 1000;
  }
}
