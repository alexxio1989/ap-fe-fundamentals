import { AcquistoDto } from "./acquistoDto";
import { EventoDto } from "./eventoDto";

export class AcquistoEventoDto extends AcquistoDto{
    evento: EventoDto;
    dataInizio:Date;
    dataFine:Date;
    idEventCalendar:string;
}