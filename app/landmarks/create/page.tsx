'use client'
import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Input, Button, Card, CardBody, Select, SelectItem, Switch } from '@nextui-org/react'
import { PlusIcon } from '@/app/components/PlusIcon'
import { City } from '@/app/cities/(utils)/types/city.type'
import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { useRouter } from 'next/navigation'
import { checkIsAdmin } from '@/app/(auth)/(utils)/helpers/auth.helper'
import UnAuthorized from '@/app/components/UnAuthorized'
import { Textarea } from '@nextui-org/input'
import { Landmark } from '@/app/landmarks/(utils)/types/landmark.type'
import { createLandmark } from '@/app/landmarks/(utils)/api/create'
import { findAllCities } from '@/app/cities/(utils)/api/findAll'
import { findAllTags } from '@/app/tags/(utils)/api/findAll'

export default function CreateLandmark() {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [era, setEra] = useState<string>('')
  const [famousFigures, setFamousFigures] = useState<string>('')
  const [coverImage, setCoverImage] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [openingHours, setOpeningHours] = useState<string>('')
  const [isRecommended, setIsRecommended] = useState<boolean>(false)
  const [city, setCity] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [location, setLocation] = useState<string>('')
  const [longitude, setLongitude] = useState<number>(0)
  const [latitude, setLatitude] = useState<number>(0)
  const [images, setImages] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [cities, setCities] = useState<City[]>([])
  const [db_tags, setDbTags] = useState<Tag[]>([])

  useEffect(() => {
    setIsAdmin(checkIsAdmin())
    const fetchData = async () => {
      const cities: City[] = await findAllCities()
      const tags = await findAllTags()
      setCities(cities)
      setDbTags(tags)
    }
    fetchData()
  }, [])


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImage(event.target.value)
  }

  const handleEraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEra(event.target.value)
  }

  const handleFamousFiguresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamousFigures(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

  const handleIsRecommendedChange = () => {
    setIsRecommended(!isRecommended)
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = event.target.value
    setTags(newTag.split(','))
  }


  const handleImagesChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(event.target.value))
  }

  const handleOpeningHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpeningHours(event.target.value)
  }

  const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(Number(event.target.value))
  }


  const addImage = () => {
    setImages([...images, ''])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const new_tags: Tag[] = tags
      .filter(tag => tag.length > 2) // Filter out tags that are empty or contain only one character
      .map(tag => ({ _id: tag })); // Map the remaining tags to the desired object structure


    const landmark: Landmark = {
      name,
      description,
      era,
      famous_figures: famousFigures,
      is_recommended: isRecommended,
      city: { _id: city },
      tags: new_tags,
      images,
      location: {
        name: location,
        latitude,
        longitude
      },
      price,
      cover_image: coverImage,
      opening_hours: openingHours
    }

    if (landmark) {
      const createdLandmark: Landmark | null = await createLandmark(landmark)
      console.log(createdLandmark)
      router.push('/landmarks')
    } else {
      setErrorMessage('City name is already exists')
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
            {!isAdmin ? (
              <UnAuthorized />
            ) : (
              <Card className="center">
                <CardBody className="overflow-hidden">
                  <Tabs fullWidth size="md" aria-label="Tabs form">
                    <Tab key="Landmark" title="Create new Landmark or Monment">
                      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <Input
                          isRequired
                          label="Name"
                          placeholder="Enter city name"
                          onChange={handleNameChange}
                          type="text"
                        />
                        <Textarea
                          isRequired
                          label="Description"
                          labelPlacement="outside"
                          placeholder="Enter your description"
                          onChange={handleDescriptionChange}
                        />
                        <Input
                          isRequired
                          label="Era"
                          placeholder="Enter era name"
                          onChange={handleEraChange}
                          type="text"
                        />
                        <Input
                          isRequired
                          label="Famous Figures"
                          placeholder="Enter Famous Figures"
                          onChange={handleFamousFiguresChange}
                          type="text"
                          errorMessage={errorMessage}
                        />
                        <Input
                          isRequired
                          label="Cover Image"
                          placeholder="Enter cover Image URL"
                          onChange={handleCoverImageChange}
                          type="text"
                        />
                        <Input
                          isRequired
                          label="Opening Hours"
                          placeholder="Enter opening Hours"
                          onChange={handleOpeningHoursChange}
                          type="text"
                        />
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Input
                            isRequired
                            label="Price"
                            placeholder="Enter Price"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            type="number"
                          />
                          <Switch checked={isRecommended} onChange={handleIsRecommendedChange}>
                            Is Recommended
                          </Switch>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Select
                            label="City"
                            placeholder="Select a city"
                            className="max-w-xs"
                            onChange={handleCityChange}
                          >
                            {cities.map((city) => (
                              <SelectItem key={city._id} value={city._id}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select
                            label="Tags"
                            placeholder="Select tags"
                            selectionMode="multiple"
                            className="max-w-xs"
                            onChange={handleTagsChange}
                          >
                            {db_tags.map((tag) => (
                              <SelectItem key={tag._id} value={tag._id}>
                                {tag.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <Input
                          isRequired
                          label="Location"
                          placeholder="Enter location"
                          onChange={handleLocationChange}
                          type="text"
                        />
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Input
                            isRequired
                            label="latitude"
                            placeholder="Enter latitude"
                            onChange={handleLatitudeChange}
                            type="number"
                          />
                          <Input
                            isRequired
                            label="longitude"
                            placeholder="Enter longitude"
                            onChange={handleLongitudeChange}
                            type="number"
                          />
                        </div>
                        {images.map((image, index) => (
                          <div key={index}>
                            <Input
                              isRequired
                              label={`Image ${index + 1}`}
                              placeholder="Enter image URL"
                              value={image}
                              onChange={(e) => handleImagesChange(index, e.target.value)}
                              type="text"
                              errorMessage={errorMessage}
                            />
                            <button onClick={() => removeImage(index)}>Remove</button>
                          </div>
                        ))}
                        <button onClick={addImage}>Add Image</button>
                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary" type="submit">
                            Create <PlusIcon width={undefined} height={undefined} />
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
  )
}
