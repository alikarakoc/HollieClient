import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any {
    try{
      return value.filter(p=> p.name.toLowerCase().indexOf(filterText.toLowerCase())!==-1);
    }
    catch(error){
      return value;
    }
  }
}
