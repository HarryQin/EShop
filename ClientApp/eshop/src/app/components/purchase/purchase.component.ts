import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ChangeDetectorRef
  } from '@angular/core';
import {
    Purchase
  } from '../../shared/DTO/purchase';
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
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss'],
  })
  export class PurchaseComponent implements OnInit, OnDestroy {

    loading = false;
    purchases: Purchase[];
    subscription: Subscription = new Subscription();
    purchaseSource: MatTableDataSource < Purchase > ;
    displayedColumns: string[] = ['Purchase Id', 'Product Id', 'User Id', 'Delete'];

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
      private purchaseService: PurchaseService
    ) {}

    ngOnInit() {
      this.interFrmSvc.startSpinner('GETTING_DATA_FOR_PURCHASES');
      this.loading = true;
      this.subscription = this.purchaseService.GetAll().subscribe(purchases => {
        this.loading = false;
        this.purchases = purchases;
        this.purchaseSource = new MatTableDataSource(this.purchases);
        this.cdr.detectChanges();
        this.purchaseSource.paginator = this.paginator;
        this.purchaseSource.sort = this.sort;
        setTimeout(() => this.interFrmSvc.stopSpinner('GETTING_DATA_FOR_PURCHASES'), 200);

      });
    }
    ngOnDestroy() {}
    applyFilter(filterValue: string) {
        this.purchaseSource.filter = filterValue.trim().toLowerCase();
        if (this.purchaseSource.paginator) {
          this.purchaseSource.paginator.firstPage();
        }
      }
  }
