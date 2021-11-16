import { publicApi } from './api';
import { Company } from '~/types/Company';

export async function getCompanysToRenderInMap(
  id: string,
  needs: string[]
): Promise<Company[]> {
  try {
    const result = await publicApi.post<Company[]>(`/map-company/${id}`, {
      needs,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
