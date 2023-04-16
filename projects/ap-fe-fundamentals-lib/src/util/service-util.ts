import { DelegateService } from '../service/delegate.service';
import { UtenteService } from '../service/utente.service';


export function handleServiceError(error:any , us: UtenteService , ds: DelegateService){
    ds.sbjSpinner.next(false);
    if (401 === error.status) {
      us.sbjUtente.next(undefined);
    }
    ds.sbjErrorsNotification.next(error.error + " , Codice Errore " + error.status);
}