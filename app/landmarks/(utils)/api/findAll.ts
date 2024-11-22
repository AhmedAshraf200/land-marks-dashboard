import { LANDMARKS_URL } from '@/app/landmarks/(utils)/constants'
import { LandmarkResponse } from '@/app/landmarks/(utils)/types/landmark.type'

const query: string = 'fields=name,era,famous_figures'
export const findAllLandmarks = async (): Promise<LandmarkResponse> => {
  const response: Response = await fetch(`${LANDMARKS_URL}?${query}`)
  if (!response.ok) {
    throw new Error('failed to fetch landmarks')
  }
  return response.json()
}