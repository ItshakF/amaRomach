import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductModule } from './main-dashboard/product-module/product.module';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';
import { SignModule } from './sign/sign.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardRoutingModule } from './main-dashboard/dashboard-routing/dashboard-routing.module';
import { SignRoutingModule } from './sign/sign-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    AppRoutingModule,
    CartModule,
    SharedModule,
    SignModule,
    HttpClientModule,
    DashboardRoutingModule,
    SignRoutingModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
}
