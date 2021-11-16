import { AxiosResponse } from 'axios';

import { api, publicApi } from './api';
import { Company, CompanyInList } from '~/types/Company';
import { GeocodeResponse } from '~/types/geocode';

export async function getAddressByGeolocation(
  lat: string,
  long: string
): Promise<AxiosResponse<GeocodeResponse>> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_MAPS_TOKEN}`;
    return await api.get<GeocodeResponse>(url);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCompanysByNearbyAddress(
  lat: string,
  long: string,
  needs = []
): Promise<AxiosResponse<CompanyInList[]>> {
  try {
    return await publicApi.post<CompanyInList[]>(
      `queryCompanies?latitude=${lat}&longitude=${long}`,
      {
        needs,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCompanyById(id: string): Promise<AxiosResponse<Company>> {
  try {
    return await api.get<Company>(`/company/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
