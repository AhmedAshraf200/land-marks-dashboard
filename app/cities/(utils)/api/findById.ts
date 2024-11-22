import { City } from '@/app/cities/(utils)/types/city.type'
import { CITIES_URL } from '@/app/cities/(utils)/constants'

export const findCityById = async (id:string): Promise<City> => {
  const response: Response = await fetch(`${CITIES_URL}/${id}`)
  if(!response.ok){
    throw new Error("failed to fetch city");
  }
  return response.json();
}