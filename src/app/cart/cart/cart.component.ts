import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { ModalComponent } from '../modal/modal.component';
import { selectCartSize } from '../reducer/cart-reducer';


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
              private cartStore: Store<{CartState, State}>,
  ) {
    this.cartLength = this.cartStore.pipe(select(selectCartSize));
  }

  open() {
    const config: TemplateModalConfig<string, string, string> =
      new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    this.modalServices.open(new ModalComponent(this.cartStore))
      .onApprove(() => config.closeResult)
      .onDeny(() => config.closeResult)
      ;
  }
}
