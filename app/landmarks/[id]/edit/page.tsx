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
import { updateLandmark } from '@/app/landmarks/(utils)/api/update'
import { findAllCities } from '@/app/cities/(utils)/api/findAll'
import { findAllTags } from '@/app/tags/(utils)/api/findAll'
import { findLandmarkById } from '@/app/landmarks/(utils)/api/findById'

export default function EditLandmark({ params }) {
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
      const tags: Tag[] = await findAllTags()
      const landmark: Landmark = await findLandmarkById(params.id)
      setCity(landmark.city?._id || '')
      setDbTags(landmark.tags || [])
      setImages(landmark.images || [])
      setName(landmark.name)
      setDescription(landmark.description || '')
      setCoverImage(landmark.cover_image || '')
      setEra(landmark.era || '')
      setFamousFigures(landmark.famous_figures || '')
      setPrice(landmark.price || 0)
      setOpeningHours(landmark.opening_hours || '')
      setIsRecommended(landmark.is_recommended || false)

      setCities(cities)
      setDbTags(tags)
    }
    fetchData()
  }, [params.id])


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


  const handleOpeningHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpeningHours(event.target.value)
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
      .map(tag => ({ _id: tag })) // Map the remaining tags to the desired object structure


    const landmark: Landmark = {
      name,
      description,
      era,
      famous_figures: famousFigures,
      is_recommended: isRecommended,
      city: { _id: city },
      tags: new_tags,
      images,
      price,
      cover_image: coverImage,
      opening_hours: openingHours
    }

    if (landmark) {
      const updatedLandmark: Landmark | null = await updateLandmark(params.id, landmark)
      console.log(updatedLandmark)
      router.push('/landmarks')
    } else {
      setErrorMessage('Landmark name is already exists')
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
                  <Tab key="Landmark" title="Update new Landmark or Monment">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <Input
                        isRequired
                        value={name}
                        label="Name"
                        placeholder="Enter city name"
                        onChange={handleNameChange}
                        type="text"
                      />
                      <Textarea
                        isRequired
                        value={description}
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        onChange={handleDescriptionChange}
                      />
                      <Input
                        isRequired
                        value={era}
                        label="Era"
                        placeholder="Enter era name"
                        onChange={handleEraChange}
                        type="text"
                      />
                      <Input
                        isRequired
                        value={famousFigures}
                        label="Famous Figures"
                        placeholder="Enter Famous Figures"
                        onChange={handleFamousFiguresChange}
                        type="text"
                        errorMessage={errorMessage}
                      />
                      <Input
                        isRequired
                        value={coverImage}
                        label="Cover Image"
                        placeholder="Enter cover Image URL"
                        onChange={handleCoverImageChange}
                        type="text"
                      />
                      <Input
                        isRequired
                        value={openingHours}
                        label="Opening Hours"
                        placeholder="Enter opening Hours"
                        onChange={handleOpeningHoursChange}
                        type="text"
                      />
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          value={price}
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
                          Update <PlusIcon width={undefined} height={undefined} />
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
