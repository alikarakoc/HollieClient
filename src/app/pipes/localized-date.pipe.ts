import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from "@ngneat/transloco";

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translocoService: TranslocoService) { }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const locale = this.translocoService.getActiveLang() === "en" ? "en-US" : "tr";

    const datePipe: DatePipe = new DatePipe(locale);
    return datePipe.transform(value, pattern);
  }

}
