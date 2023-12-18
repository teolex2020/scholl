import React from 'react'
import dynamic from 'next/dynamic'
const Payment = dynamic(() => import('@/app/components/payment/Payment'), {
	loading: () => <div className='w-full text-center '></div>,
})


const page = () => {
  return (
    <div><Payment/></div>
  )
}

export default page