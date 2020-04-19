import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html',
  styleUrls: ['./input-selector.component.less']
})
export class InputSelectorComponent {

  @Output() numberEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  private selectedOptions: number;

  changePrice(quantity) {
    this.numberEventEmitter.emit(quantity);
  }

}
