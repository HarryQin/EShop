import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

function isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

@Pipe({name: 'looseCurrency'})
@Injectable()
  export class LooseCurrencyPipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe) {}

    transform(value: any, currencyCode?: string, symbolDisplay: boolean = true, digits?: string): string {
      value = typeof value === 'string' && isNumeric(value) ? +value : value;

      if (typeof value === 'number') {
        return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
      } else {
        return value;
      }
    }
  }
