import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventoDto } from '../../dto/eventoDto';
import { ProdottoDto } from '../../dto/prodottoDto';
import { ServizioDto } from '../../dto/servizioDto';
import { defaultImg } from '../../images-editor/default-img';
import { AcquistoProdottoDto } from '../../dto/acquistoProdottoDto';
import { AcquistoEventoDto} from '../../dto/acquistoEventoDto';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.actionDetail = true;
    if(this.data.prodotto){
      this.prodotto = this.data.prodotto
      this.servizio = this.prodotto
      this.acquistoProdotto = new AcquistoProdottoDto();
    }

    if(this.data.evento){
      this.evento = this.data.evento
      this.servizio = this.evento
      this.acquistoEvento = new AcquistoEventoDto();
    }
  }

}
