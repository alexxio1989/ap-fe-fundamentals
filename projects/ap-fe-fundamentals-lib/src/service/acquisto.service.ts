import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AcquistoDto } from '../dto/acquistoDto';
import { DelegateService } from './delegate.service';
import { IServiceCrud } from './IServiceCrud';
import { AbstractService } from './abstractService';
import { Inject } from '@angular/core';
import { ResponseAcquisto} from '../dto/response/responseAcquisto';
import { TypeAcquistoDto } from '../dto/typeAcquistoDto';
import { Constants } from '../constants/constants';
import { AcquistoLight } from '../dto/acquisto-light';
import { ConfiguratoreService } from '../service/configuratore.service';
import { approximate } from '../util/util';


@Injectable({
  providedIn: 'root',
})
export class AcquistoService extends AbstractService<any> implements IServiceCrud<any[],ResponseAcquisto>{
  
  public acquisto: any;
  sbjObj: Subject<any[]> = new Subject();
  sbjAction: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
    private ds: DelegateService,
    @Inject('environment') private environment : any,
    private config:ConfiguratoreService
  ) {
    super();
  }

  save(acquisti: any[]): Observable<ResponseAcquisto> {
    this.ds.sbjSpinner.next(true);
    let req = new ResponseAcquisto();
    req.acquisti = acquisti
    return this.http.post<ResponseAcquisto>(
      this.environment.acquisto ,req,{headers: super.getHeader()});
  }

  delete(id: string): Observable<ResponseAcquisto> {
    this.ds.sbjSpinner.next(true);
    return this.http.delete<ResponseAcquisto>(
      this.environment.acquisto +"/"+ id ,{headers: super.getHeader()}
    );
  }

  getAll(): Observable<ResponseAcquisto> {
    this.ds.sbjSpinner.next(true);
    return this.http.get<ResponseAcquisto>(this.environment.acquisto);
  }

  get(id: string): Observable<AcquistoDto[]> {
    throw new Error('Method not implemented.');
  }

  getIDService(acquisto: any): string {
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      return acquisto.prodotto.id;
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      return acquisto.evento.id;
    }
    return '';
  }

  remove(acquisto: any){
    let acquisti = super.getObj(Constants.ACQUISTI) as AcquistoDto[];
    if(acquisti){
      if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
        acquisti = acquisti.filter(a => this.getIDService(a) !== acquisto.prodotto.id);
      } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
        acquisti = acquisti.filter(a => this.getIDService(a) !== acquisto.evento.id);
      }
      this.sbjObj.next(acquisti)
    }
  }

  getAmountItem(acquisto: any): number {
    let value = 0
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      value = this.config.countValue(acquisto.prodotto.prezzo);
      value = approximate(value, 100)
    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {
      value = this.config.countValue(acquisto.evento.prezzo)
      value = approximate(value, 100)
    }
    return value;
  }

  getDetail(acquisto :any):AcquistoLight{
    let value = 0
    let detail = new AcquistoLight()
    if (acquisto.type === TypeAcquistoDto.ACQUISTO_PRODOTTO) {
      
      detail.title = acquisto.prodotto.nome;
      detail.price = this.getAmountItem(acquisto)
      detail.qnt = acquisto.quantita
      value = this.config.countValue(acquisto.prodotto.prezzo);
      value = approximate(value, 100)
      detail.total = value * acquisto.quantita;
      detail.category = acquisto.prodotto.tipoServizio ? acquisto.prodotto.tipoServizio.codice : 'DIGITAL_GOODS'

    } else if (acquisto.type === TypeAcquistoDto.ACQUISTO_EVENTO) {

      detail.title = acquisto.evento.nome;
      detail.price = this.getAmountItem(acquisto)
      detail.qnt = acquisto.quantita
      value = this.config.countValue(acquisto.evento.prezzo);
      value = approximate(value, 100)
      detail.total = value * acquisto.quantita;
      detail.category = acquisto.evento.tipoServizio ? acquisto.evento.tipoServizio.codice : 'DIGITAL_GOODS'

    }
    return detail;
  }

  
}