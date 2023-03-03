import { Injectable } from '@angular/core';
import { UtenteDto } from '../dto/utenteDto';
import { Observable, Subject } from "rxjs";
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { DelegateService } from './delegate.service';
import { RequestLogin } from '../dto/request/requestLogin';
import { ConstantsAPI } from '../constants/constants-API';
import { AbstractService } from './abstractService';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtenteService extends AbstractService<UtenteDto>{

  public utente: UtenteDto;
  public logged = false;
  public isSU = false;
  public sbjUtente = new Subject<UtenteDto>();
  public acquistiPresents : boolean
 

  constructor(private http: HttpClient , 
              private ds: DelegateService,
              @Inject('environment') private environment : any) { 

    super();
    this.utente = super.getObj(Constants.UTENTE)
    if(this.utente){
      this.logged = true;
      this.isSU = Constants.SUPER_USER === this.utente.tipoUtente.codice;
    }

    this.sbjUtente.asObservable().subscribe(next=>{
      if(next){
        this.refreshObj(next , Constants.UTENTE);
      } else {
        this.removeObj(Constants.UTENTE)
      }
    });
    
  }

  signin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(this.environment.utente + ConstantsAPI.SIGNIN,req);
  }

  login(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(this.environment.utente + ConstantsAPI.LOGIN,req); 
  }

  loginAdmin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(this.environment.utente + ConstantsAPI.LOGIN_ADMIN,req); 
  }

  googleLogin(){
    window.open(this.environment.path + ConstantsAPI.GOOGLE_LOGIN);
    window.self.close();
  }

}
