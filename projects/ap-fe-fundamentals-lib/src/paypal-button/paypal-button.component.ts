import { Component, Input, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ITransactionItem } from 'ngx-paypal';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';
import { ConfiguratoreService } from '../service/configuratore.service';
import { AcquistoService } from '../service/acquisto.service';
import { ItemCategory } from 'ngx-paypal'
import { Actions } from '../constants/actions';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss'],
})
export class PaypalButtonComponent implements OnInit {

  show:boolean;
  @Input() acquisti: any[];
  public payPalConfig?: IPayPalConfig;

  constructor(
    @Inject('environment') private environment : any,
    public config:ConfiguratoreService,
    private as: AcquistoService
  ) {
  }

  ngOnInit(): void {
    this.as.sbjAction.asObservable().subscribe(next =>{
      this.show = next === Actions.PAYPAL ? true : false; 
    })
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
          JSON.stringify(data),
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            JSON.stringify(details)
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data)
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', JSON.stringify(data), actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', JSON.stringify(data), actions);
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
      name: this.as.getDetail(acquisto).title,
      quantity: '' + acquisto.quantita,
      category: "DIGITAL_GOODS",
      unit_amount: {
        currency_code: 'EUR',
        value: '' + this.as.getDetail(acquisto).price,
      },
    };
    console.log(JSON.stringify(item.unit_amount.value))
    return item;
  }

  private getTotalItemsValue() : number {
    let total = 0;
    this.acquisti.forEach(acquisto => {
      total = total + (this.as.getDetail(acquisto).price * acquisto.quantita)
    });
    return total;
  }
}
