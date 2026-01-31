import React from 'react'
import {getOnboardingStatus} from '@/actions/user'
import { redirect } from 'next/navigation'
import OnboardingForm from './_components/onboardingForm'
import { industries } from '@/data/industries'

const page = () => {

  const {isOnboarded}= getOnboardingStatus()
  if(isOnboarded){
    redirect('/dashboard')
  }
  return (
   <div className='text-white text-9xl p-50'>
    <OnboardingForm industries={industries}/>
    </div>
  )
}

export default page
