import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SuiModule } from 'ng2-semantic-ui';
import { cartKey, cartReducer } from '../cart/reducer/cart-reducer';
import { ProductToCartService } from '../services/product-to-cart.service';
import { CartComponent } from './cart/cart.component';
import { ModalComponent } from './modal/modal.component';
import { DropdownSelectorComponent } from './product-in-cart/dropdown-selector/dropdown-selector.component';
import { InputSelectorComponent } from './product-in-cart/input-selector/input-selector.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';



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
    StoreModule.forFeature(cartKey, cartReducer)
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
