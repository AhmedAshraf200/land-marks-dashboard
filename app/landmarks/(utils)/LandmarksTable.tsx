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
import { Landmark, LandmarkResponse } from '@/app/landmarks/(utils)/types/landmark.type'
import { Button } from '@nextui-org/button'
import Loading from '@/app/components/Loading'
import { EditIcon } from '@/app/components/EditIcon'
import { calculateTimeDifference } from '@/app/landmarks/(utils)/helpers/calculateTimeDifference.helper'
import { deleteLandmark } from '@/app/landmarks/(utils)/api/deleteById'
import { findAllLandmarks } from '@/app/landmarks/(utils)/api/findAll'

export default function LandmarksTable() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage: number = 5
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteLandmark = async (landmarkId: string): Promise<void> => {
    try {
      await deleteLandmark(landmarkId)
    } catch (error: any) {
      console.error(`Error deleting landmark: ${error.message}`)
    }
    refreshData(landmarkId)
  }

  const refreshData = (id: string): void => {
    const new_landmarks: Landmark[] = landmarks.filter(landmark => landmark._id !== id)
    setLandmarks(new_landmarks)
  }


  const fetchData = async (): Promise<void> => {
    try {
      const landmarksData: LandmarkResponse = await findAllLandmarks()
      setLandmarks(landmarksData.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const pages = Math.ceil(landmarks.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return landmarks.slice(start, end)
  }, [page, landmarks])


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
            <TableColumn key="era">ERA</TableColumn>
            <TableColumn key="famous_figures">FAMOUS FIGURES</TableColumn>
            <TableColumn key="_id">Action</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => {
                  if (columnKey === '_id') {
                    return (
                      <TableCell>
                        <Link href={`/landmarks/${item[columnKey]}/edit`}>
                          <Button color={'primary'}>Edit <EditIcon /></Button>
                        </Link>
                        <Button color={'danger'} onClick={() => handleDeleteLandmark(item._id || '')}>Delete</Button>
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
