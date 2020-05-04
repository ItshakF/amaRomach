import {Component, ViewChild, ChangeDetectorRef, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';

import {Product} from '../../model/product.model';
import {ProductToCartService} from '../../services/product-to-cart.service';
import {ModalComponent} from '../modal/modal.component';
import {CartState, selectCartSize} from '../reducer/cart-reducer';
import {Store, select} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as cartReducer from '../reducer/cart-reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  product: Product;
  cartLength: Observable<number>;

  @ViewChild('modalTemplate', {static: false})
  public modalTemplate: ModalTemplate<null, string, string>;

  constructor(public modalServices: SuiModalService,
              private store: Store<CartState>,
  ) {
  }

  ngOnInit() {
    this.cartLength = this.store.pipe(select(selectCartSize))
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
