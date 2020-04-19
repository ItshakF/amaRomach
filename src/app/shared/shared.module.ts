import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiDropdownModule, SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';

import { SharedComponent } from './shared.component';
import { CartModule } from '../cart/cart.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    SharedComponent,
  ],
  imports: [
    CommonModule,
    SuiDropdownModule,
    SuiModule,
    FormsModule,
    CartModule,
    AppRoutingModule,
  ],
  exports: [
    SuiDropdownModule,
    SharedComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
