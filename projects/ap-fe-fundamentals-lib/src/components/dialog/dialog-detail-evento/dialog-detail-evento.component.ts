import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventoDto } from '../../../dto/eventoDto';
import { ServizioDto } from '../../../dto/servizioDto';
import { defaultImg } from '../../images-editor/default-img';
import { AcquistoEventoDto } from '../../../dto/acquistoEventoDto';
import { ConfiguratoreService } from '../../../service/configuratore.service';
import { UtenteService } from '../../../service/utente.service';
import { TypeAcquistoDto } from '../../../dto/typeAcquistoDto';
import { AcquistoService } from '../../../service/acquisto.service';
import { AcquistoDto } from '../../../dto/acquistoDto';
import { Constants } from '../../../constants/constants';
import { Actions } from '../../../constants/actions';
import { DelegateService } from '../../../service/delegate.service';
import { MessageResponse } from '../../../dto/messageResponse';


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
              private as: AcquistoService,
              public ds: DelegateService,
              public us: UtenteService ,
              public dialog: MatDialog) { }

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
    if(Actions.PRENOTA_ORA === action){
      if(this.servizio.prezzo > 0){
        action = Actions.PAYPAL
      } else {
        this.as.save(this.acquisti).subscribe(next => {
          let message = new MessageResponse;
          message.title = 'Acquisto avvenuto con successo'
          message.description = 'Controlla la tua email per maggiori informazioni'
          this.dialog.open(DialogDetailEventoComponent, {
            height: 'auto',
            width: 'auto',
            data: {
              message: message
            }
          });
          this.dialogRef.close()
        }, error => {
          this.ds.sbjSpinner.next(false);
          if(401 === error.status){
            this.us.sbjUtente.next(undefined)
          }
          this.ds.sbjErrorsNotification.next(error.error + " , Codice Errore " + error.status);
        })
      }

    } 

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
