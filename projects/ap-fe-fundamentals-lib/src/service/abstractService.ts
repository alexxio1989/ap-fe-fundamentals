import { HttpHeaders } from '@angular/common/http';
import { UtenteDto } from '../dto/utenteDto'
import { Constants } from '../constants/constants';

export class AbstractService<OBJ>{
    
    obj:OBJ

    getHeader():HttpHeaders{
        const id = this.getObj(Constants.UTENTE) ? (this.getObj(Constants.UTENTE) as UtenteDto ).id : null;
        let headers = new HttpHeaders();
        if (id) {
          headers = new HttpHeaders().set(Constants.ID_UTENTE, id);
        }
        return headers;
    }

    getObj(value: string): any{
        const obj = localStorage.getItem(value);
        if(obj){ 
          this.obj = JSON.parse(obj);
        }
        return this.obj;
    }

    setObj(obj: OBJ , value: string){
        this.obj = obj;
        localStorage.setItem(value,JSON.stringify(obj))
    }

    removeObj(value: string){
      this.obj = undefined
      localStorage.removeItem(value);
    }

    refreshObj(obj: OBJ,value: string){
      this.removeObj(value);
      this.setObj(obj,value)
    }

    isSuperUser(utente :UtenteDto):boolean{
        return utente ?  Constants.SUPER_USER === utente.tipoUtente.codice : false;
    }

}