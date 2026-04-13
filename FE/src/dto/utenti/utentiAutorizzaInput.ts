export interface UtentiAutorizzaInput {
  utenti: UtentiAutorizzaItem[];
}

export interface UtentiAutorizzaItem {
  id: number;
  autorizzato: boolean;
}
