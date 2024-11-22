import { LANDMARKS_URL } from '@/app/landmarks/(utils)/constants'
import { Landmark } from '@/app/landmarks/(utils)/types/landmark.type'
import { getAccessToken, requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'

export const convertToLandmarkData = (landmark:Landmark)=>{
  return  {
    name: landmark.name,
    description: landmark.description,
    era: landmark.era,
    famous_figures: landmark.famous_figures,
    city: landmark.city?._id,
    tags: landmark.tags?.map(tag => tag._id),
    price: landmark.price,
    opening_hours: landmark.opening_hours,
    cover_image: landmark.cover_image,
    images: landmark.images,
    location: landmark.location,
    is_recommended: landmark.is_recommended
  }
}
export async function createLandmark(landmark: Landmark): Promise<Landmark | null> {
  try {
    const landmarkData: any = convertToLandmarkData(landmark);

    const response: Response = await fetch(LANDMARKS_URL, {
      method: 'POST',
      headers: requestHeaders(),
      body: JSON.stringify(landmarkData)
    })

    console.log(response)

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Failed to create landmark')
    }
  } catch (error) {
    console.error('Error creating landmark:', error)
    return null
  }
}