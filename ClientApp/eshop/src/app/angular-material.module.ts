import {
  NgModule
} from '@angular/core';
import {
  MatBadgeModule,
  MatIconModule,
  MatDialogModule,
  MatTabsModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatAutocompleteModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [MatBadgeModule, MatIconModule, MatDialogModule, MatTabsModule, MatFormFieldModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatAutocompleteModule],
  exports: [MatBadgeModule, MatIconModule, MatDialogModule, MatTabsModule, MatFormFieldModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatAutocompleteModule]
})

export class AngularMaterialModule {}
