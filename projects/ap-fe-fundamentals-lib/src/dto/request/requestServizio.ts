import { ServizioDto } from "../servizioDto";
import { UtenteDto } from "../utenteDto";

export class RequestServizio{
    utente:UtenteDto;
    servizioSelected: ServizioDto;
}