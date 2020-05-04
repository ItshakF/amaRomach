import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.less']
})
export class DropdownSelectorComponent {

  @Input() limit: number;
  @Input() selectedOptions: number;
  @Output() numberEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  changePrice(quantity: number) {
    this.numberEventEmitter.emit(quantity);
  }

}
