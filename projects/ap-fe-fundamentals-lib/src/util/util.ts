
export function getCurrencyString(value : number) : string{
    if(value){
        let amount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(value);
        return amount.substring(1, amount.length);
    } else {
        return '0.0'
    }
    
}

export function approximate(value : number, precision: number) : number {
    if(value && value > 0){
        var result = Math.round(value * precision) /  precision;
        return result;
    } else {
        return 0;
    }
    
}

export function addHours(date:Date, hours:number) {
    date.setHours(date.getHours() + hours);
  
    return date;
}

export function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
  
    return date;
}