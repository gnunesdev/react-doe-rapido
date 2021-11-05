import { api } from './api';
import { Company } from '~/types/Company';

export async function getCompanysToRenderInMap(id: string): Promise<Company[]> {
  try {
    const result = await api.get<Company[]>(`/map-company`);
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
