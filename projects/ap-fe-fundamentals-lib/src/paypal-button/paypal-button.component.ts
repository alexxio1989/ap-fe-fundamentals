import { Component, Input, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { AcquistoDto } from '../dto/acquistoDto';
import { ITransactionItem } from 'ngx-paypal';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss'],
})
export class PaypalButtonComponent implements OnInit {
  @Input() tax: number;

  @Input() acquisti: any[];

  public payPalConfig?: IPayPalConfig;

  amount: string;

  constructor(
    @Inject('environment') private environment : any
  ) {
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId:this.environment.paypalID,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.getTotal(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.getTotal(),
                  },
                },
              },
              items: this.getItems(this.acquisti),
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        height: 36,
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  

  getItems(acquisti: any[]): ITransactionItem[] {
    let items: ITransactionItem[] = [];

    acquisti.forEach((acquistoDto) => {
      items.push(this.mapItem(acquistoDto));
    });

    return items;
  }

  mapItem(acquisto: any): ITransactionItem {
    let item : ITransactionItem;
    item = {
      name: this.getTitleAcquisto(acquisto),
      quantity: '' + this.getQuantity(acquisto),
      category: 'DIGITAL_GOODS',
      unit_amount: {
        currency_code: 'EUR',
        value: '' + this.getAmount(acquisto),
      },
    };

    return item;
  }

  getTitleAcquisto(acquisto: any): string {
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      return acquisto.prodotto.nome;
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      return acquisto.evento.nome;
    }
    return '';
  }

  getCategoryAcquisto(acquisto: any): string {
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      return acquisto.prodotto.nome;
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      return acquisto.evento.nome;
    }
    return '';
  }

  getQuantity(acquisto: AcquistoDto): number {
    return acquisto.quantita;
  }

  getAmount(acquisto: any): string {
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      let amount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(acquisto.prodotto.prezzo);
      return amount.substring(1, amount.length);
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      let amount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(acquisto.evento.prezzo);
      return amount.substring(1, amount.length);
    }
    return '' + 0;
  }

  getTotal():string{
    let total = 0;
    this.acquisti.forEach(acquisto => {
      if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
        total = total + (acquisto.prodotto.prezzo * acquisto.quantita)
      } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
        total = total + (acquisto.evento.prezzo * acquisto.quantita)
      }

    });

    this.amount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(total);
    return this.amount.substring(1, this.amount.length);
  }


}
