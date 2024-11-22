import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { TAGS_URL } from '@/app/tags/(utils)/constants'

export const findTagById = async (id:string): Promise<Tag> => {
  const response: Response = await fetch(`${TAGS_URL}/${id}`)
  if(!response.ok){
    throw new Error("failed to fetch tag");
  }
  return response.json();
}