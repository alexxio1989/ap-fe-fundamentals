
import { CoreDto } from "./core/coreDto";
import { UtenteDto } from "./utenteDto";

export class AcquistoDto extends CoreDto{
    quantita:number;
    dataAcquisto:Date;
    utente:UtenteDto;
    fromDetail:boolean;
}