import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html',
  styleUrls: ['./input-selector.component.less']
})
export class InputSelectorComponent {

  @Input() selectedOptions: number;
  @Output() numberEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  changePrice(productQuantity) {
    if (productQuantity < 1 || productQuantity === null) {
      productQuantity = 1;
    }
    this.numberEventEmitter.emit(productQuantity);
  }

}
