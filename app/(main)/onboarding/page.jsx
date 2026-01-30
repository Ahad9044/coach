import React from 'react'
import {getOnboardingStatus} from '@/actions/user'
import { redirect } from 'next/navigation'

const page = () => {
  const {isOnboarded}= getOnboardingStatus()
  if(isOnboarded){
    redirect('/dashboard')
  }
  return (
   <div className='text-white text-9xl p-50'>
      Onboarding Page
    </div>
  )
}

export default page
