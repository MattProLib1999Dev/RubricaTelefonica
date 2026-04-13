export interface UtentiSearchResponse {
  items: UtentiSearchOutput[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface UtentiSearchOutput {
  id: number;
  email: string;
  nome: string;
  cognome: string;
  codiceSquadraManovra: number;
  lingua: string;
  autorizzato: boolean;
  dataAutorizzazione: string;
  ruoli: RuoloSearchDto[];
  societa: SocietaSearchDto;
  impianti: ImpiantoSearchDto[];
}

export interface RuoloSearchDto {
  idRuolo: number;
  desRuolo: string;
}

export interface SocietaSearchDto {
  idSocieta: number;
  codiceSocieta: string;
  desSocieta: string;
  tipo: string;
  ssh: boolean;
  h30: boolean;
}

export interface ImpiantoSearchDto {
  idImpianto: number;
  codceBDO: string;
  codicePIC: number;
  desImpianto: string;
}
