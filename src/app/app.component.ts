import { Component } from '@angular/core';
import { ImageDto, ProdottoDto } from 'projects/ap-fe-fundamentals-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ap-fe-fundamentals';
  prodottoDto = new ProdottoDto()
  constructor(){
    this.prodottoDto.nome = 'Lezione di java'
    this.prodottoDto.nomeExt = 'Diventa uno sviluppatore java in un mese'
    this.prodottoDto.prezzo = 9.80
  }

  retrieveImges(imges : ImageDto[]){
    this.prodottoDto.images = imges
  }
}
