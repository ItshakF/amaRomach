import { Component, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';

import { Product } from '../../model/product.model';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {

  product: Product;

  @ViewChild('modalTemplate', {static: false})
  public modalTemplate: ModalTemplate<null, string, string>;

  constructor(public modalServices: SuiModalService,
              private productServices: ProductToCartService) {
  }

  checkNum(): number {
    return this.productServices.getCartLength();
  }

  private open() {
    const config: TemplateModalConfig<string, string, string> =
      new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    this.modalServices.open(new ModalComponent(this.productServices))
      .onApprove(() => config.closeResult)
      .onDeny(() => config.closeResult)
    ;
  }
}
