import { Component, OnInit } from '@angular/core';
import { AcquistoService } from '../service/acquisto.service';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';
import { DetailAcquisto } from './detail-acquisto';
import { Constants } from '../constants/constants';
import { AcquistoDto } from '../dto/acquistoDto';
import { ConfiguratoreService } from '../service/configuratore.service';
import { approximate } from '../util/util';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  acquisti: any[]

  menuOpen = false;

  getDetail(acquisto :any):DetailAcquisto{
    let value = 0
    let detail = new DetailAcquisto()
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      detail.title = acquisto.prodotto.nome;
      detail.price = acquisto.prodotto.prezzo
      detail.qnt = acquisto.quantita
      value = this.config.countValue(acquisto.prodotto.prezzo);
      value = approximate(value, 100)
      detail.total = value * acquisto.quantita;
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      detail.title = acquisto.evento.nome;
      detail.price = acquisto.evento.prezzo
      detail.qnt = acquisto.quantita
      value = this.config.countValue(acquisto.evento.prezzo);
      value = approximate(value, 100)
      detail.total = value * acquisto.quantita;
    }
    return detail;
  }

  constructor(private as: AcquistoService,public config:ConfiguratoreService) { }

  ngOnInit(): void {
    this.acquisti = []
    
    this.as.sbjObj.asObservable().subscribe(next => {
      this.as.refreshObj(next,Constants.ACQUISTI)
      this.acquisti = next;
    })
  }

  open(){
    this.menuOpen = !this.menuOpen
  }
  close(event:any){
    this.menuOpen = !this.menuOpen
  }

  remove(acquisto: any){
    let acquisti = this.as.getObj(Constants.ACQUISTI) as AcquistoDto[];
    if(acquisti){
      if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
        acquisti = acquisti.filter(a => this.as.getIDService(a) !== acquisto.prodotto.id);
      } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
        acquisti = acquisti.filter(a => this.as.getIDService(a) !== acquisto.evento.id);
      }
      this.as.sbjObj.next(acquisti)
    }
  }

}
