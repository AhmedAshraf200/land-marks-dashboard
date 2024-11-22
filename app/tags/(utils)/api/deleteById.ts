import { TAGS_URL } from '@/app/tags/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function deleteTag(id: string): Promise<any> {
  const url:string = `${TAGS_URL}/${id}`
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