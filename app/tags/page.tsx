'use client'
import TagsTable from '@/app/tags/(utils)/TagsTable'
import { PlusIcon } from '@/app/components/PlusIcon'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/react'

export default function Tags() {
  return (
    <div>
      <TagsTable />
      <div className="flex justify-center items-center">
        <Link href={'/tags/create'}>
          <Button color="primary" endContent={<PlusIcon width={undefined} height={undefined} />}>
            Add New
          </Button>
        </Link>
      </div>
    </div>
  )
}