import { Bolnica } from './bolnica.model';

export interface Odeljenje {
  id?: number;
  naziv: string;
  lokacija: string;
  bolnica: Bolnica;
}
