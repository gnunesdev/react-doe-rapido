export interface CompanyInList {
  id_company: number;
  name: string;
  address: string;
  distance: number;
  lat: string;
  long: string;
}

export interface Company {
  id: number;
  name: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  needs: [];
  lat: string;
  long: string;
  distance: number;
}
