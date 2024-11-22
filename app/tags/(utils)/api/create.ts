import { TAGS_URL } from '@/app/tags/(utils)/constants'
import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { getAccessToken, requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export async function createTag(name: string): Promise<Tag | null> {
  try {
    const tagData: Tag = { name }

    const token: string = getAccessToken()

    const response = await fetch(TAGS_URL, {
      method: 'POST',
      headers: requestHeaders(),
      body: JSON.stringify(tagData)
    })

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Failed to create tag')
    }
  } catch (error) {
    console.error('Error creating tag:', error)
    return null
  }
}