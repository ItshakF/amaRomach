import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductsComponent } from './products.component';
import { ProductFileReaderService } from '../../services/product-file-reader.service';
import { ProductToCartService } from '../../services/product-to-cart.service';
import Mock = jest.Mock;

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const myMock = jest.fn();
  const a = new myMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent
      ],
      providers: [
/*        {
          provide: ProductToCartService,
          useClass: MockProductToCartService
        },*/
        ProductFileReaderService,
        ProductToCartService,
        HttpClient,
        HttpHandler
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create it', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const product = {
      name: 'Oatmeal',
      description: 'Hot and fluffy oatmeal & protein powder cake',
      price: 330.00,
      image: '../assets/images/oatmeal.jpg',
      limit: 30
    };
    component.addProduct(product);
    expect(ProductToCartService.prototype.addToCart).toHaveBeenCalled();
  });
});
