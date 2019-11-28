import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NGXLogger} from 'ngx-logger';
import {MessageDTO} from '../../shared/DTO/MessageDTO';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {InterFormsService} from '../../shared/services/inter-forms.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-productdetail',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
  id: string;
  subsGetProducts: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private logger: NGXLogger,
    private translate: TranslateService,
    private interFormSvc: InterFormsService,
  ) {
  }

  ngOnInit() {}
  // This method must be present, even if empty.
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
  getProduct(sku: string) {
    this.interFormSvc.startSpinner('GETTING_PRODUCT_DETAILS');
    this.subsGetProducts =
      this.productService.Get(sku).subscribe((data: any) => {
        this.interFormSvc.stopSpinner('GETTING_PRODUCT_DETAILS');
    }, (err) => {
        this.interFormSvc.stopSpinner('GETTING_PRODUCT_DETAILS');
      });
    }

}