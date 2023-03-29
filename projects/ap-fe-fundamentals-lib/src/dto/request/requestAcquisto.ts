import { AcquistoDto } from "../acquistoDto";
import { UtenteDto } from "../utenteDto";

export class RequestAcquisto{
    utente:UtenteDto
    acquistoSelected:AcquistoDto
    acquisti:AcquistoDto[]
}