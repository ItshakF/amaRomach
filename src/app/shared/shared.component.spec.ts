import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SuiModule, SuiPopupConfig} from 'ng2-semantic-ui';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {SharedComponent} from './shared.component';
import {AppRoutingModule} from '../app-routing.module';


describe('SharedComponent', () => {
  let component: SharedComponent;
  let fixture: ComponentFixture<SharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedComponent],
      imports: [
        SuiModule,
        RouterModule,
        FormsModule,
        AppRoutingModule,
      ],
      providers: [
        {provide: SuiPopupConfig, useValue: {}},
        {provide: Router, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
