import { Component, Input, OnInit } from '@angular/core';
import { EventoDto } from '../dto/eventoDto';
import { ProdottoDto } from '../dto/prodottoDto';
import { defaultImg } from '../images-editor/default-img';

@Component({
  selector: 'app-card-servizio',
  templateUrl: './card-servizio.component.html',
  styleUrls: ['./card-servizio.component.scss']
})
export class CardServizioComponent implements OnInit {

 
  @Input() prodotto: ProdottoDto;
  @Input() evento: EventoDto;
  servizio : any;

  defaultImg = defaultImg.emptyImg

  constructor() { }

  ngOnInit(): void {
    if(this.prodotto){
      this.servizio = this.prodotto;
    } else {
      this.servizio = this.evento;
    }

    if(!this.servizio.images || this.servizio.images.length === 0){
      
    }
  }
}
