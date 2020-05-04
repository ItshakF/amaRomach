import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ProductsComponent} from '../products/products.component';
import {MainDashboardComponent} from '../main-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {
    path: 'product',
    component: MainDashboardComponent,
    children: [{path: '', component: ProductsComponent}]
  },
  {
    path: 'product/:id',
    component: MainDashboardComponent,
    children: [{path: '', component: ProductDetailsComponent}]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class DashboardRoutingModule {
}
