export interface UtentiOutput {
  id: number
  cid: string
  email: string
  nome: string
  cognome: string
  lingua: string
  idSquadraManovra: number
  autorizzato: boolean
  dataAutorizzazione: string
  ruoli: Ruoli[]
  societa: Societa
}

export interface Ruoli {
  id: number
  descrizione: string
}

export interface Societa {
  id: number
  codice: string
  descrizione: string
  tipo: string
  ssh: boolean
  h30: boolean
  impianti: Impianti[]
}

export interface Impianti {
  id: number
  codiceBDO: string
  codicePIC: number
  descrizione: string
  ginoInterv: boolean
  autoAccetGmgi: boolean
  auto6A: boolean
  autoSott6A: boolean
  autoAccett6A: boolean
  autoQtzAcc: boolean
  autoSott6B: boolean
  attivo: boolean
  ssh: boolean
}
