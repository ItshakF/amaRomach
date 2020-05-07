import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../model/product.model';
import { ModalComponent } from '../modal/modal.component';
import { CartState, selectCartSize } from '../reducer/cart-reducer';
import { ProductState } from 'src/app/main-dashboard/reducers/dashboard-reducer';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  product: Product;
  cartLength: Observable<number>;

  @ViewChild('modalTemplate', { static: false })
  public modalTemplate: ModalTemplate<null, string, string>;

  constructor(public modalServices: SuiModalService,
              private store: Store<{CartState: CartState, State: ProductState}>,
  ) {
    this.cartLength = this.store.pipe(select(selectCartSize));
  }

  open() {
    const config: TemplateModalConfig<string, string, string> =
      new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    this.modalServices.open(new ModalComponent(this.store))
      .onApprove(() => config.closeResult)
      .onDeny(() => config.closeResult)
      ;
  }
}
