import { City } from '@/app/cities/(utils)/types/city.type'
import { Tag } from '@/app/tags/(utils)/types/tag.type'

export type Landmark = {
  _id?: string,
  name: string,
  description?: string,
  era?: string,
  famous_figures?: string,
  location?: Location,
  city?: City,
  tags?: Tag[],
  images?: string[],
  price?: number,
  opening_hours?: string,
  likes_count?: number,
  cover_image?: string,
  is_recommended?: boolean,
  createdAt?: string,
  updatedAt?: string,
}

export type Location = {
  name: string,
  latitude: number,
  longitude: number,
}

export type LandmarkResponse = {
  page: number,
  totItems: number,
  pageSize?: number,
  totalPages: number,
  data: [Landmark]
}