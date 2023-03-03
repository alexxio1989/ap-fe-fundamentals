import { CoreDto } from "./core/coreDto";
import { DominioDto } from "./dominioDto";
import { ImageDto } from "./imageDto";
import { TypeServizioDto } from "./typeServizioDto";

export class ServizioDto extends CoreDto{
    type:TypeServizioDto
    nome:string;
    nomeExt:string;
    descrizione:string;
    dataCreazione:Date;
    enable:boolean;
    prezzo:number;
    tipoServizio:DominioDto;
    images: ImageDto[]
}