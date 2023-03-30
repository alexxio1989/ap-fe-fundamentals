import { Component, OnInit } from '@angular/core';
import { AcquistoService } from '../service/acquisto.service';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';
import { DetailAcquisto } from './detail-acquisto';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  acquisti: any[]

  menuOpen = false;

  getDetail(acquisto :any):DetailAcquisto{
    let detail = new DetailAcquisto()
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      detail.title = acquisto.prodotto.nome;
      detail.amount = acquisto.prodotto.prezzo
      detail.qnt = acquisto.quantita
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      detail.title = acquisto.evento.nome;
      detail.amount = acquisto.evento.prezzo
      detail.qnt = acquisto.quantita
    }
    return detail;
  }

  constructor(private as: AcquistoService) { }

  ngOnInit(): void {
    this.acquisti = []
    
    this.as.sbjObj.asObservable().subscribe(next => {
      this.acquisti = next;
    })
  }

  open(){
    this.menuOpen = !this.menuOpen
  }
  close(event:any){
    this.menuOpen = !this.menuOpen
  }

}
