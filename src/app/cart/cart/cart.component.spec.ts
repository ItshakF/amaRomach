import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CartComponent } from './cart.component';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SuiModalService } from 'ng2-semantic-ui';
import { ModalComponent } from '../modal/modal.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        ProductToCartService,
        HttpClient,
        HttpHandler,
        SuiModalService,
        {provide: SuiModalService, useValue: {}}
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
