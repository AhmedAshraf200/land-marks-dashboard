import { City } from '@/app/cities/(utils)/types/city.type'
import { CITIES_URL } from '@/app/cities/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function updateCity(id: string, name: string) {
  const city: City = { name }
  const response: Response = await fetch(`${CITIES_URL}/${id}`,
    {
      method: 'PATCH',
      headers: requestHeaders(),
      body: JSON.stringify(city)
    })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}