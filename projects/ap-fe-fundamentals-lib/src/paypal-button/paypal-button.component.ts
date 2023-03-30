import { Component, Input, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { AcquistoDto } from '../dto/acquistoDto';
import { ITransactionItem } from 'ngx-paypal';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';
import { ConfiguratoreService } from '../service/configuratore.service';
import { getCurrencyString ,approximate } from '../util/util';

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
    @Inject('environment') private environment : any,
    public config:ConfiguratoreService
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
                value: ''+this.getTotalItemsValue(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: ''+this.getTotalItemsValue(),
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
        value: ''+this.getAmountItem(acquisto),
      },
    };
    console.log(JSON.stringify(item.unit_amount.value))
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

  getAmountItem(acquisto: any): number {
    let value = 0
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      value = this.config.countValue(acquisto.prodotto.prezzo);
      value = approximate(value, 100)
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      value = this.config.countValue(acquisto.evento.prezzo)
      value = approximate(value, 100)
    }
    return value;
  }



  private getTotalItemsValue() : number {
    let total = 0;
    this.acquisti.forEach(acquisto => {
      total = total + (this.getAmountItem(acquisto) * acquisto.quantita)
    });
    return total;
  }
}
