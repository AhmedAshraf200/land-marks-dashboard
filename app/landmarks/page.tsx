'use client'
import LandmarksTable from '@/app/landmarks/(utils)/LandmarksTable'
import { PlusIcon } from '@/app/components/PlusIcon'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/react'

export default function Landmarks() {
  return (
    <div>
      <LandmarksTable />
      <div className="flex justify-center items-center">
        <Link href={'/landmarks/create'}>
          <Button color="primary" endContent={<PlusIcon width={undefined} height={undefined} />}>
            Add New
          </Button>
        </Link>
      </div>
    </div>
  )
}