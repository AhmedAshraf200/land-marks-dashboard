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
import { Tag } from '@/app/tags/(utils)/types/tag.type'
import { findAllTags } from '@/app/tags/(utils)/api/findAll'
import { Button } from '@nextui-org/button'
import Loading from '@/app/components/Loading'
import { EditIcon } from '@/app/components/EditIcon'
import { calculateTimeDifference } from '@/app/tags/(utils)/helpers/calculateTimeDifference.helper'
import { deleteTag } from '@/app/tags/(utils)/api/deleteById'

export default function TagsTable() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage: number = 5
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteTag = async (tagId: string): Promise<void> => {
    try {
      await deleteTag(tagId)
    } catch (error: any) {
      console.error(`Error deleting tag: ${error.message}`)
    }
    refreshData(tagId)
  }

  const refreshData = (id: string): void => {
    const new_tags: Tag[] = tags.filter(tag => tag._id !== id)
    setTags(new_tags)
  }


  const fetchData = async (): Promise<void> => {
    try {
      const tagsData: Tag[] = await findAllTags()
      setTags(tagsData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const pages = Math.ceil(tags.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return tags.slice(start, end)
  }, [page, tags])


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
                        <Link href={`/tags/${item[columnKey]}/edit`}>
                          <Button color={'primary'}>Edit <EditIcon /></Button>
                        </Link>
                        <Button color={'danger'} onClick={() => handleDeleteTag(item._id || '')}>Delete</Button>
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
