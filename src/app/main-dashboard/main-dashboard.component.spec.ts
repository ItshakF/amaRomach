import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SuiModule, SuiPopupConfig } from 'ng2-semantic-ui';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';

import { MainDashboardComponent } from './main-dashboard.component';
import { AppRoutingModule } from '../app-routing.module';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainDashboardComponent,
      ],
      imports: [
        SuiModule,
        AppRoutingModule,
        RouterModule,
      ],
      providers: [
        SuiPopupConfig,
        ChildrenOutletContexts,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
