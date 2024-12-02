import { Directive, HostListener, Optional } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAmountDirective]',
  standalone: true,
  providers: [DecimalPipe],
})
export class AmountDirectiveDirective {
  constructor(
    private decimalPipe: DecimalPipe,
    @Optional() private amountControl: NgControl,
  ) {}

  @HostListener('blur', ['$event']) onInput() {
    this.amountControl.control?.setValue(
      this.decimalPipe.transform(+this.amountControl.control?.value, '0.2-2')?.toString().replace(/,/g, ''),
    );
  }
}
