import { api } from './api';

export async function getAddressByGeolocation(lat: string, long: string) {
  try {
    const result = await api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_MAPS_TOKEN}`
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCompanysByNearbyAddress(
  lat: string,
  long: string,
  needs: string[]
) {
  try {
    const result = await api.get('/company');

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCompanyById(id: string) {
  try {
    const result = await api.get(`/company/${id}`);

    return result;
  } catch (error) {
    console.error(error);
  }
}
