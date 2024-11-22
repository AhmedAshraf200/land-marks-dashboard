import { CITIES_URL } from '@/app/cities/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function deleteCity(id: string): Promise<any> {
  const url:string = `${CITIES_URL}/${id}`
  const response: Response = await fetch(url,
    {
      method: 'DELETE',
      headers: requestHeaders(),
    })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}