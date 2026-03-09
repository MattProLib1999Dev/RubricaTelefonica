export interface UtentiAutorizzaOutput {
  proceduraCompletata: boolean;
  utenti: UtentiAutorizzaItem[];
}

export interface UtentiAutorizzaItem {
  id: number;
  autorizzato: boolean;
}
