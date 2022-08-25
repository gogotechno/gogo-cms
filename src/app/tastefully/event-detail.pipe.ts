import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventDetail'
})
export class EventDetailPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
