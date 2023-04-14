import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventoDto } from '../../dto/eventoDto';
import { ServizioDto } from '../../dto/servizioDto';
import { defaultImg } from '../../images-editor/default-img';
import { AcquistoEventoDto } from '../../dto/acquistoEventoDto';
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
  selector: 'app-dialog-evento-detail',
  templateUrl: './dialog-detail-evento.component.html',
  styleUrls: ['./dialog-detail-evento.component.scss']
})
export class DialogDetailEventoComponent implements OnInit {

  evento: EventoDto;
  servizio : ServizioDto;
  defaultImg = defaultImg.emptyImg

  acquistoEvento : AcquistoEventoDto

  quantity = 0;

  totPrice = 0;

  acquisti : any[] = []

  actionString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogDetailEventoComponent>,
              public config:ConfiguratoreService,
              private as: AcquistoService) { }

  ngOnInit(): void {
    this.actionString = ACTIONS.detail;
    if(this.data.evento){
      this.evento = this.data.evento
      this.servizio = this.evento
      this.acquistoEvento = new AcquistoEventoDto();
      this.acquistoEvento.type = TypeAcquistoDto.ACQUISTO_EVENTO
      this.acquistoEvento.evento = this.evento
      this.acquistoEvento.dataInizio = this.evento.dataInizio
      this.acquistoEvento.dataFine = this.evento.dataFine
      this.acquisti.push(this.acquistoEvento)
    }
  }

  retrieveQuantity(value : number){
    if(this.acquistoEvento){
      this.acquistoEvento.quantita = value;
      this.totPrice = this.acquistoEvento.quantita && this.acquistoEvento.quantita > 0 ? ( this.config.countValue(this.evento.prezzo) ) * this.acquistoEvento.quantita : 0
      this.quantity = this.acquistoEvento.quantita
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
      
      if(this.acquistoEvento){
        acquisti.push(this.acquistoEvento)
      }
    } else {
      acquisti = []
      
      if(this.acquistoEvento){
        acquisti.push(this.acquistoEvento)
      }
    }
    this.dialogRef.close()
    this.as.sbjObj.next(acquisti)
  }

  getIDService(){
    if(this.acquistoEvento){
      return this.acquistoEvento.evento.id
    }
    return '';
  }

  

}
