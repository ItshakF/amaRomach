import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.less']
})

export class DropdownSelectorComponent {

  @Input() limit: number;
  @Input() selectedOptions: number;
  @Output() newQuantity: EventEmitter<number>;

  constructor(){
    this.newQuantity = new EventEmitter<number>();
  }

  updateQuantity(quantity: number) {
    this.newQuantity.emit(quantity);
  }
}
