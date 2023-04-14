import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { ConfigurazioneDto } from '../dto/configurazioneDto';
import { AbstractService } from './abstractService';
import { IServiceCrud } from './IServiceCrud';



@Injectable({
  providedIn: 'root'
})
export class ConfiguratoreService extends AbstractService<ConfigurazioneDto> implements IServiceCrud<ConfigurazioneDto,ConfigurazioneDto>{

  public configurazione: ConfigurazioneDto;
  constructor() { 
    super(); 
    this.mockConfig();
  }

  sbjObj: Subject<ConfigurazioneDto>;

  private mockConfig() {
    this.configurazione = new ConfigurazioneDto();
    this.configurazione.localTax = 22;
    this.configurazione.oraApertura = '08:15 am';
    this.configurazione.oraChiusura = '19:30 am';
  }

  save(obj: ConfigurazioneDto): Observable<ConfigurazioneDto> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<ConfigurazioneDto> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<ConfigurazioneDto> {
    throw new Error('Method not implemented.');
  }
  get(id: string): Observable<ConfigurazioneDto> {
    throw new Error('Method not implemented.');
  }

  countValue(value:number):number{
    let perc = value > 0 ?  (this.configurazione.localTax * value) /100 : 0
    return perc + value;
  }

}
