import { Landmark } from '@/app/landmarks/(utils)/types/landmark.type'
import { LANDMARKS_URL } from '@/app/landmarks/(utils)/constants'
import { requestHeaders } from '@/app/(auth)/(utils)/helpers/auth.helper'
import { convertToLandmarkData } from '@/app/landmarks/(utils)/api/create'

export async function updateLandmark(id: string, landmark: Landmark) {

  const landmarkData: any = convertToLandmarkData(landmark);

  const response: Response = await fetch(`${LANDMARKS_URL}/${id}`,
    {
      method: 'PATCH',
      headers: requestHeaders(),
      body: JSON.stringify(landmarkData)
    })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}