import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart/cart.component';

import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { ModalComponent } from './modal/modal.component';
import { DropdownSelectorComponent } from './product-in-cart/dropdown-selector/dropdown-selector.component';
import { InputSelectorComponent } from './product-in-cart/input-selector/input-selector.component';
import { ProductToCartService } from '../services/product-to-cart.service';
import * as fromCart from '../cart/reducer/cart-reducer';


@NgModule({
  declarations: [
    CartComponent,
    ProductInCartComponent,
    ModalComponent,
    DropdownSelectorComponent,
    InputSelectorComponent,
  ],
  imports: [
    CommonModule,
    SuiModule,
    FormsModule,
    StoreModule.forFeature(fromCart.cartKey, fromCart.reducer)
  ],
  exports: [
    CartComponent,
    ProductInCartComponent,
    ModalComponent,
  ],
  entryComponents: [CartComponent, ModalComponent],
  providers: [ProductToCartService]
})
export class CartModule {
}
