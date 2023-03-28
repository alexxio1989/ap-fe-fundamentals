import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventoDto } from '../../dto/eventoDto';
import { ProdottoDto } from '../../dto/prodottoDto';
import { ServizioDto } from '../../dto/servizioDto';
import { defaultImg } from '../../images-editor/default-img';
import { AcquistoProdottoDto } from '../../dto/acquistoProdottoDto';
import { AcquistoEventoDto} from '../../dto/acquistoEventoDto';
import { ConfiguratoreService } from '../../service/configuratore.service';
import { TypeAcquistoDto } from '../../dto/typeAcquistoDto';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent implements OnInit {

  prodotto: ProdottoDto;
  evento: EventoDto;
  servizio : ServizioDto;
  defaultImg = defaultImg.emptyImg

  actionAcquisto = false;
  actionPrenotazione = false;
  actionDetail = true;

  acquistoProdotto : AcquistoProdottoDto

  acquistoEvento : AcquistoEventoDto

  totPrice = 0;

  acquisti : any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public config:ConfiguratoreService) { }

  ngOnInit(): void {
    this.actionDetail = true;
    if(this.data.prodotto){
      this.prodotto = this.data.prodotto
      this.servizio = this.prodotto
      this.acquistoProdotto = new AcquistoProdottoDto();
      this.acquistoProdotto.type = TypeAcquistoDto.ACQUISTO_PRODOTTO
      this.acquistoProdotto.prodotto = this.prodotto
      this.acquisti.push(this.acquistoProdotto)
    }

    if(this.data.evento){
      this.evento = this.data.evento
      this.servizio = this.evento
      this.acquistoEvento = new AcquistoEventoDto();
      this.acquistoProdotto.type = TypeAcquistoDto.ACQUISTO_EVENTO
      this.acquistoEvento.evento = this.evento;
      this.acquisti.push(this.acquistoEvento)
    }
  }

  retrieveQuantityProdotto(value : number){
    this.acquistoProdotto.quantita = value;
    this.totPrice = this.acquistoProdotto.quantita && this.acquistoProdotto.quantita > 0 ? ( this.config.countValue(this.prodotto.prezzo) ) * this.acquistoProdotto.quantita : 0
  }

  retrieveQuantityEvento(value : number){
    this.acquistoEvento.quantita = value;
  }



}
