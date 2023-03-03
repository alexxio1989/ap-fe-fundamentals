import { OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";

export interface IServiceCrud< OBJ  , RES>{
    sbjObj : Subject<OBJ>;
    save(obj : OBJ): Observable<RES> 
    delete(id:string): Observable<RES> 
    getAll(): Observable<RES>
    get(id:string): Observable<OBJ>
}