import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {
  Product
} from '../../shared/DTO/product';
import {
  ProductService
} from '../../shared/services/product.service';
import {
  PurchaseService
} from '../../shared/services/purchase.service';
import {
  InterFormsService
} from '../../shared/services/inter-forms.service';
import {
  AuthenticationService
} from '../../identity/authentication.service';
import {
  Router
} from '@angular/router';
import {
  Subscription
} from 'rxjs';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  NGXLogger
} from 'ngx-logger';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  loading = false;
  subscription: Subscription = new Subscription();
  productSource: MatTableDataSource < Product > ;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  @ViewChild(MatPaginator, {
    static: false
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: false
  }) sort: MatSort;

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private interFrmSvc: InterFormsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private productService: ProductService,
    private authService: AuthenticationService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    this.interFrmSvc.startSpinner('GETTING_DATA_FOR_PRODUCTS');
    this.loading = true;
    this.subscription = this.productService.GetAll().subscribe(products => {
      this.loading = false;
      this.productSource = new MatTableDataSource(products);
      this.cdr.detectChanges();
      this.productSource.paginator = this.paginator;
      this.productSource.sort = this.sort;
      setTimeout(() => this.interFrmSvc.stopSpinner('GETTING_DATA_FOR_PRODUCTS'), 200);

    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  purchase(data, event) {
    event.stopPropagation();
    if(this.authService.currentUserValue) {
      this.purchaseService.Add(data.id, this.authService.currentUserValue.id).subscribe(data => {
        this.logger.debug(data.purchaseId);
      });
    }
    else {
      this.router.navigate(['/login']);
    }
    console.log(data);
  }
  applyFilter(filterValue: string) {
    this.productSource.filter = filterValue.trim().toLowerCase();
    if (this.productSource.paginator) {
      this.productSource.paginator.firstPage();
    }
  }
}
