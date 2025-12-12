import { Odeljenje } from './odeljenje.model';
import { Dijagnoza } from './dijagnoza.model';

export interface Pacijent {
  id?: number;
  ime: string;
  prezime: string;
  zdrOsiguranje: boolean;
  datumRodjenja: string;
  odeljenje: Odeljenje;
  dijagnoza: Dijagnoza;
}
