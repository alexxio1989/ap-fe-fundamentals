import { Component } from '@angular/core';
import { DominioDto, EventoDto, ImageDto, ProdottoDto } from 'projects/ap-fe-fundamentals-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ap-fe-fundamentals';
  prodottoDto = new ProdottoDto()

  eventoDto = new EventoDto()
  constructor(){
    this.prodottoDto.nome = 'Lezione di java'
    this.prodottoDto.nomeExt = 'Diventa uno sviluppatore java in un mese'
    this.prodottoDto.prezzo = 9.80
    let type = new DominioDto();
    type.codice = 'BACK_END';
    type.descrizione = 'BACK END';
    this.prodottoDto.tipoServizio = type


    this.eventoDto.nome = 'Lezione online di Angular'
    this.eventoDto.nomeExt = 'Diventa uno sviluppatore angular insieme a me'
    this.eventoDto.prezzo = 5
    let typeeventoDto = new DominioDto();
    type.codice = 'LEZIONE';
    type.descrizione = 'LEZIONE';
    this.eventoDto.tipoServizio = typeeventoDto
  }

  retrieveImges(imges : ImageDto[]){
    this.prodottoDto.images = imges
  }
}
