'use client'
import CitiesTable from '@/app/cities/(utils)/CitiesTable'
import { PlusIcon } from '@/app/components/PlusIcon'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/react'

export default function Cities() {
  return (
    <div>
      <CitiesTable />
      <div className="flex justify-center items-center">
        <Link href={'/cities/create'}>
          <Button color="primary" endContent={<PlusIcon width={undefined} height={undefined} />}>
            Add New
          </Button>
        </Link>
      </div>
    </div>
  )
}