import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AbstractService } from './abstractService';
import { DelegateService } from './delegate.service';
import { IServiceCrud } from './IServiceCrud';
import { UtenteService } from './utente.service';
import { Inject } from '@angular/core';
import { DominioDto } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class TipoServizoService extends AbstractService<DominioDto[]> implements IServiceCrud<DominioDto,DominioDto[]> {

  domini:DominioDto[] = []
  sbjObj: Subject<DominioDto>;
  
  constructor(
    private http: HttpClient,
    private ds: DelegateService,
    private us: UtenteService,
    @Inject('environment') private environment : any
  ) {
    super();
  }

  save(type: DominioDto):Observable<DominioDto[]>{
    this.ds.sbjSpinner.next(true)
    return this.http.post<DominioDto[]>(this.environment.tpl,type,{headers: super.getHeader()});
  }
  
  delete(id: string): Observable<DominioDto[]> {
    throw new Error('Method not implemented.');
  }

  getAll():Observable<DominioDto[]>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<DominioDto[]>(this.environment.tpl,{headers: super.getHeader()});
  }

  get(id: string): Observable<DominioDto> {
    throw new Error('Method not implemented.');
  }

}
