import { City } from '@/app/cities/(utils)/types/city.type'
import { CITIES_URL } from '@/app/cities/(utils)/constants'

export const findAllCities = async (): Promise<City[]> => {
  const response: Response = await fetch(CITIES_URL)
  if(!response.ok){
    throw new Error('failed to fetch cities')
  }
  return response.json();
}