import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html',
  styleUrls: ['./input-selector.component.less']
})

export class InputSelectorComponent {

  @Input() selectedOptions: number;
  @Output() newQuantity: EventEmitter<number>;

  constructor() {
    this.newQuantity = new EventEmitter<number>();
  }

  updateQuantity(productQuantity) {
    if (productQuantity < 1 || productQuantity === null) {
      productQuantity = 1;
    }
    this.newQuantity.emit(productQuantity);
  }
}
