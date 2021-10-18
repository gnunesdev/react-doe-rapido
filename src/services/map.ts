import { api } from './api';

export async function getCompanysToRenderInMap(id: string) {
  try {
    const result = await api.get('/companys');

    return result;
  } catch (error) {
    console.error(error);
  }
}
