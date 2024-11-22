import { Landmark } from '@/app/landmarks/(utils)/types/landmark.type'
import { LANDMARKS_URL } from '@/app/landmarks/(utils)/constants'

export const findLandmarkById = async (id:string): Promise<Landmark> => {
  const response: Response = await fetch(`${LANDMARKS_URL}/${id}`)
  if(!response.ok){
    throw new Error("failed to fetch landmark");
  }
  return response.json();
}