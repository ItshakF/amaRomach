import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ProductModule} from './main-dashboard/product-module/product.module';
import {SharedModule} from './shared/shared.module';
import {CartModule} from './cart/cart.module';
import {SignModule} from './sign/sign.module';
import {AppRoutingModule} from './app-routing.module';
import {DashboardRoutingModule} from './main-dashboard/dashboard-routing.module';
import {SignRoutingModule} from './sign/sign-routing.module';
import {ProductEffect} from './main-dashboard/effects/dashboard-effect';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    SharedModule,
    SignModule,
    HttpClientModule,
    DashboardRoutingModule,
    SignRoutingModule,
    ProductModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([ProductEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
}
