import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ProdottoDto } from '../../dto/prodottoDto';
import { ServizioDto } from '../../dto/servizioDto';
import { defaultImg } from '../../images-editor/default-img';
import { AcquistoProdottoDto } from '../../dto/acquistoProdottoDto';
import { ConfiguratoreService } from '../../service/configuratore.service';
import { TypeAcquistoDto } from '../../dto/typeAcquistoDto';
import { AcquistoService } from '../../service/acquisto.service';
import { AcquistoDto } from '../../dto/acquistoDto';
import { Constants } from '../../constants/constants';

const ACTIONS = {
  detail: 'DETAIL',
  preAcquisto: 'PRE-ACQUISTO',
  prePrenotazione: 'PRE-PRENOTAZIONE',
  acquisto: 'ACQUISTO',
}

@Component({
  selector: 'app-dialog-prodotto-detail',
  templateUrl: './dialog-detail-prodotto.component.html',
  styleUrls: ['./dialog-detail-prodotto.component.scss']
})
export class DialogDetailProdottoComponent implements OnInit {

  prodotto: ProdottoDto;
  servizio : ServizioDto;
  defaultImg = defaultImg.emptyImg

  acquistoProdotto : AcquistoProdottoDto

  quantity = 0;

  totPrice = 0;

  acquisti : any[] = []

  actionString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogDetailProdottoComponent>,
              public config:ConfiguratoreService,
              private as: AcquistoService) { }

  ngOnInit(): void {
    this.actionString = ACTIONS.detail;
    if(this.data.prodotto){
      this.prodotto = this.data.prodotto
      this.servizio = this.prodotto
      this.acquistoProdotto = new AcquistoProdottoDto();
      this.acquistoProdotto.type = TypeAcquistoDto.ACQUISTO_PRODOTTO
      this.acquistoProdotto.prodotto = this.prodotto
      this.acquisti.push(this.acquistoProdotto)
    }
  }

  retrieveQuantity(value : number){
    if(this.acquistoProdotto){
      this.acquistoProdotto.quantita = value;
      this.totPrice = this.acquistoProdotto.quantita && this.acquistoProdotto.quantita > 0 ? ( this.config.countValue(this.prodotto.prezzo) ) * this.acquistoProdotto.quantita : 0
      this.quantity = this.acquistoProdotto.quantita
    }
    
  }

  action(action: string){
    this.as.sbjAction.next(action);
    this.actionString = action;
  }

  addToCarrello(){

    let acquisti = this.as.getObj(Constants.ACQUISTI) as AcquistoDto[];

    if(acquisti && acquisti.length > 0){
      acquisti = acquisti.filter(a => this.as.getIDService(a) !== this.getIDService());
      
      if(this.acquistoProdotto){
        acquisti.push(this.acquistoProdotto)
      }
    } else {
      acquisti = []
      
      if(this.acquistoProdotto){
        acquisti.push(this.acquistoProdotto)
      }
    }
    this.dialogRef.close()
    this.as.sbjObj.next(acquisti)
  }

  getIDService(){
    if(this.acquistoProdotto){
      return this.acquistoProdotto.prodotto.id
    }
    return '';
  }

}
