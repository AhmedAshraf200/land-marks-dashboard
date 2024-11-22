import { LANDMARKS_URL } from '@/app/landmarks/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function deleteLandmark(id: string): Promise<any> {
  const url:string = `${LANDMARKS_URL}/${id}`

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