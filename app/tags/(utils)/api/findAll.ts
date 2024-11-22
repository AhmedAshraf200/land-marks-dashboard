import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { TAGS_URL } from '@/app/tags/(utils)/constants'

export const findAllTags = async (): Promise<Tag[]> => {
  const response: Response = await fetch(TAGS_URL)
  if(!response.ok){
    throw new Error('failed to fetch tags')
  }
  return response.json();
}