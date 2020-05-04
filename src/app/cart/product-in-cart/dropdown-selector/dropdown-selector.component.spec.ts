import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';

import {DropdownSelectorComponent} from './dropdown-selector.component';

describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectorComponent;
  let fixture: ComponentFixture<DropdownSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSelectorComponent],
      imports: [
        SuiModule,
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the quantity to update', () => {
    spyOn(component.numberEventEmitter, 'emit');
    component.changePrice(15);
    expect(component.numberEventEmitter.emit).toHaveBeenCalledWith(15);
  });
});
