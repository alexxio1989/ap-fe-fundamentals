import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { EventoDto } from '../dto/eventoDto';
import { ProdottoDto } from '../dto/prodottoDto';
import { defaultImg } from '../images-editor/default-img';
import { ServizioService } from '../service/servizio.service';
import { UtenteService } from '../service/utente.service';
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DelegateService } from '../service/delegate.service';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';

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

  constructor(private route: Router,
    private user_service:UtenteService , 
              private servizio_service:ServizioService ,
              private ds: DelegateService,
              @Inject('environment') private environment : any,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.prodotto){
      this.servizio = this.prodotto;
    } else {
      this.servizio = this.evento;
    }

    if(!this.servizio.images || this.servizio.images.length === 0){
      
    }
  }

  openDetail(){

    if (this.ds.isMobile) {
      this.dialog.open(DialogDetailComponent, {
        height: 'auto',
        width: '95%',
        maxWidth: '95vw',
        data: {
          prodotto: this.prodotto,
          evento: this.evento
        }
      });
    } else {
      this.dialog.open(DialogDetailComponent, {
        height: 'auto',
        width: '40%',
        data: {
          prodotto: this.prodotto,
          evento: this.evento
        }
      });
    }
  }

  openLogin(){
    window.open(this.environment.path + "/google/login");
    window.self.close();
    
  }

}
