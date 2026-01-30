import React from 'react'
import {getOnboardingStatus} from '@/actions/user'
import { redirect } from 'next/navigation'

const page = () => {
  const {isOnboarded} = getOnboardingStatus()
  if(!isOnboarded) {
    redirect("/onboarding")
  }
  return (
    <div className='text-white text-9xl p-50'>
      Dashboard Page
    </div>
  )
}

export default page
