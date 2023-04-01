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

@Injectable({
  providedIn: 'root',
})
export class AcquistoService extends AbstractService<any> implements IServiceCrud<any[],ResponseAcquisto>{
  
  public acquisto: any;
  sbjObj: Subject<any[]> = new Subject();

  constructor(
    private http: HttpClient,
    private ds: DelegateService,
    @Inject('environment') private environment : any
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

  
}