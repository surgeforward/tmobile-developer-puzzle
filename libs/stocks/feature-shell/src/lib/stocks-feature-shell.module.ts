import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StocksComponent }
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedUiChartModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [StocksComponent]
})
export class StocksFeatureShellModule {}
