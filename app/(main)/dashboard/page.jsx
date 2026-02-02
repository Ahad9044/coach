import React from 'react'
import {getOnboardingStatus} from '@/actions/user'
import { redirect } from 'next/navigation'
import { getIndustryInsights } from '@/actions/dashboard'
import DashboardView from './_components/dashboard-view'

const page = async () => {
  const {isOnboarded} = await getOnboardingStatus()
  if(!isOnboarded) {
    redirect("/onboarding")
  }
   const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights}/>
    </div>
  )
}

export default page
