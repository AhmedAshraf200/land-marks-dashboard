'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Link
} from '@nextui-org/react'
import { City } from '@/app/cities/(utils)/types/city.type'
import { findAllCities } from '@/app/cities/(utils)/api/findAll'
import { Button } from '@nextui-org/button'
import Loading from '@/app/components/Loading'
import { EditIcon } from '@/app/components/EditIcon'
import { calculateTimeDifference } from '@/app/cities/(utils)/helpers/calculateTimeDifference.helper'
import { deleteCity } from '@/app/cities/(utils)/api/deleteById'

export default function CitiesTable() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage: number = 5
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteCity = async (cityId: string): Promise<void> => {
    try {
      await deleteCity(cityId)
    } catch (error: any) {
      console.error(`Error deleting city: ${error.message}`)
    }
    refreshData(cityId)
  }

  const refreshData = (id: string): void => {
    const new_cities: City[] = cities.filter(city => city._id !== id)
    setCities(new_cities)
  }


  const fetchData = async (): Promise<void> => {
    try {
      const citiesData: City[] = await findAllCities()
      setCities(citiesData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const pages = Math.ceil(cities.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return cities.slice(start, end)
  }, [page, cities])


  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: 'min-h-[222px]'
          }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="createdAt">CREATED AT</TableColumn>
            <TableColumn key="updatedAt">UPDATED AT</TableColumn>
            <TableColumn key="_id">Action</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => {
                  if (columnKey === '_id') {
                    return (
                      <TableCell>
                        <Link href={`/cities/${item[columnKey]}/edit`}>
                          <Button color={'primary'}>Edit <EditIcon /></Button>
                        </Link>
                        <Button color={'danger'} onClick={() => handleDeleteCity(item._id || '')}>Delete</Button>
                      </TableCell>
                    )
                  }
                  if (columnKey === 'createdAt' || columnKey === 'updatedAt') {
                    // @ts-ignore
                    return <TableCell>{calculateTimeDifference(new Date(item[columnKey]))}</TableCell>
                  }
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}
