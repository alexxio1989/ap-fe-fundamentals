
import { CoreDto } from "./core/coreDto";
import { TypeAcquistoDto } from "./typeAcquistoDto";
import { UtenteDto } from "./utenteDto";

export class AcquistoDto extends CoreDto{
    type:TypeAcquistoDto
    quantita:number;
    dataAcquisto:Date;
    utente:UtenteDto;
    fromDetail:boolean;
}