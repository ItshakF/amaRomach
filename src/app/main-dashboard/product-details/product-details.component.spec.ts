import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProductDetailsComponent} from './product-details.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ProductFileReaderService} from '../../services/product-file-reader.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';
import {AppRoutingModule} from '../../app-routing.module';
import {mock} from 'ts-mockito';
import {Store} from '@ngrx/store';
import {dispatch} from 'rxjs/internal/observable/pairs';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const MockProductFileReader: ProductFileReaderService = mock(ProductFileReaderService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [
        SuiModule,
        AppRoutingModule,
        RouterModule,
      ],
      providers: [
        ProductFileReaderService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{id: 1}]),
          }
        },
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn()
          }
        },
        HttpClient,
        HttpHandler

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
