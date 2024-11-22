import Image from 'next/image'

import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import ProductSize from './components/ProductSize'

import shoe from '@/public/images/shoe.webp'

export default function Home() {
  return (
    <section className='py-36'>
      <div className='container flex items-center justify-center'>
        <Card className='py-4 lg:w-3/4 xl:w-1/2'>
          <CardBody className='overflow-visible py-2'>
            <div className='flex gap-6'>
              <h1>Welcome To Landmarks Admin Dashboard</h1>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
