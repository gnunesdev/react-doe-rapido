import { api } from './api';
import { CompanyMapType } from '~/types/Company';

export async function getCompanysToRenderInMap(id: string): Promise<CompanyMapType[]> {
  try {
    const result = await api.get<CompanyMapType[]>(`/map-company`);
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
