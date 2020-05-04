import {NgModule} from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ProductsComponent} from '../products/products.component';
import {ProductCardComponent} from '../product/product.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {SharedModule} from '../../shared/shared.module';
import {AppRoutingModule} from '../../app-routing.module';
import {MainDashboardComponent} from '../main-dashboard.component';
import {DashboardRoutingModule} from '../dashboard-routing/dashboard-routing.module';
import {ProductToCartService} from '../../services/product-to-cart.service';
import {ProductFileReaderService} from '../../services/product-file-reader.service';
import {StoreModule} from '@ngrx/store';
import * as fromDashboard from '../reducers/dashboard-reducer';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    MainDashboardComponent,
  ],
  imports: [
    CommonModule,
    SuiModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(fromDashboard.productKey, fromDashboard.reducer)

  ],
  providers: [ProductToCartService, ProductFileReaderService]
})
export class ProductModule {
}
