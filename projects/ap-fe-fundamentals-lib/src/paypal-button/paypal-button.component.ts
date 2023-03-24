import { Component, Input, OnInit } from '@angular/core';
import { AcquistoProdottoDto } from '../dto/acquistoProdottoDto';
import { AcquistoEventoDto} from '../dto/acquistoEventoDto';

import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  @Input() totPrice : number;

  @Input() acquistoProdotto : AcquistoProdottoDto

  @Input() acquistoEvento : AcquistoEventoDto

  public payPalConfig ? : IPayPalConfig;

  amount :string;

    ngOnInit(): void {
        this.amount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
      }).format(this.totPrice);
        this.amount = this.amount.substring(1,this.amount.length)
        console.log(this.amount)
        
        this.initConfig();
    }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AYvTYAZb9NjbR0j3otnrqOWRkfEyO5JcGUKNhVznZuNKUqGzEXF0KGBeOlFmPNTlAmsg75VOMc87mZSz',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: this.getAmount(),
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: this.getAmount()
                            }
                        }
                    },
                    items: [{
                        name: 'Acquisto ' ,
                        quantity: ''+this.getQuantity(),
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'EUR',
                            value: ''+this.getAmount(),
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'horizontal',
                height:36,
                
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);

            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }

    getTitleAcquisto():string{
      if(this.acquistoEvento){
        return this.acquistoEvento.evento.nome
      }
      if(this.acquistoProdotto){
        return this.acquistoProdotto.prodotto.nome
      }
      return '';
    }

    getCategoryAcquisto():string{
      return 'alessiopinna.it';
    }

    getQuantity():number{
      if(this.acquistoEvento){
        return this.acquistoEvento.quantita
      }
      if(this.acquistoProdotto){
        return this.acquistoProdotto.quantita
      }
      return 0;
    }

    getAmount():string{
      if(this.acquistoEvento){
        let amount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(this.acquistoEvento.evento.prezzo);
        return amount.substring(1,amount.length)
      }
      if(this.acquistoProdotto){
        let amount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(this.acquistoProdotto.prodotto.prezzo);
        return amount.substring(1,amount.length)
      }
      return ''+0;
    }

}
