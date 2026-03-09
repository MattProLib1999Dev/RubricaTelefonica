import { DatePipe } from "@angular/common";

export class DateUtilities {

    public static stripTime(value: string | Date, datePipe: DatePipe): string {

        if(value instanceof Date) {
          return datePipe.transform(new Date(value.getFullYear(), value.getMonth(), value.getDate()), 'yyyy-MM-dd')!;
        } else {
          return value.split(/[T ]/)[0];
        }
    
      }

}
