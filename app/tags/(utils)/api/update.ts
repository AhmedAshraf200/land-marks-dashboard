import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { TAGS_URL } from '@/app/tags/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function updateTag(id: string, name: string) {
  const tag: Tag = { name }
  const response: Response = await fetch(`${TAGS_URL}/${id}`,
    {
      method: 'PATCH',
      headers: requestHeaders(),
      body: JSON.stringify(tag)
    })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}