import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductFileReaderService } from '../../services/product-file-reader.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';
import { AppRoutingModule } from '../../app-routing.module';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [
        SuiModule,
        AppRoutingModule,
        RouterModule
      ],
      providers: [
        ProductFileReaderService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of ([{id: 1}]),
          }
        },
        HttpHandler,
        HttpClient,

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
