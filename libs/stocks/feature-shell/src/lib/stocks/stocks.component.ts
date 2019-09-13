import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent {
  stockPickerForm: FormGroup;

  quotes$ = this.priceQuery.priceQueries$;

  today = new Date();

  fromDateCtrl: FormControl = new FormControl(null, [Validators.required]);
  toDateCtrl: FormControl = new FormControl(null, [Validators.required]);
  symbolCtrl: FormControl = new FormControl(null, [Validators.required]);

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: this.symbolCtrl,
      fromDate: this.fromDateCtrl,
      toDate: this.toDateCtrl,
    });
  }

  fetchQuote() {
    console.log(this.stockPickerForm.get('toDate').value);
    console.log(this.stockPickerForm.get('fromDate').value);

    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
