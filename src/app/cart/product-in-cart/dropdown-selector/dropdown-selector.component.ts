import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.less']
})
export class DropdownSelectorComponent {

  @Input() limit: number;
  @Output() numberEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  private selectedOptions: number;

  changePrice(quantity) {
    this.numberEventEmitter.emit(quantity);
  }

}
