import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capInit'
})

export class CapitalizePipe implements PipeTransform {
    transform(value: string, args: any[]) {
        console.log(value);
        if ( value === null ) return 'Not Assigned';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}