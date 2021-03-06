import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SuiModalService } from 'ng2-semantic-ui';
import { mock } from 'ts-mockito';
import { cartReducer } from '../reducer/cart-reducer';
import { CartComponent } from './cart.component';



describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const mockModalService = mock(SuiModalService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [StoreModule.forRoot({ cart: cartReducer })
      ],
      providers: [
        { provide: SuiModalService, useValue: {mockModalService} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
