import { CoreDto } from "./core/coreDto";
import { DominioDto } from "./dominioDto";
import { TokenDto } from "./tokenDto";

export class UtenteDto extends CoreDto{
    anagrafica:string;
    email:string;
    provider:string;
    photoUrl: string;
    tipoUtente:DominioDto;
    totAcquistiProdotti:number;
    totAcquistiEventi:number;
    tokens: TokenDto[] = [];
    
}