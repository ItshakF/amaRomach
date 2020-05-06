import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';

import {InputSelectorComponent} from './input-selector.component';

describe('InputSelectorComponent', () => {
  let component: InputSelectorComponent;
  let fixture: ComponentFixture<InputSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputSelectorComponent],
      imports: [
        SuiModule,
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the quantity to update', () => {
    spyOn(component.newQuantity, 'emit');
    component.updateQuantity(15);
    expect(component.newQuantity.emit).toHaveBeenCalledWith(15);
  });
});
