import { redirect } from "next/navigation";
import { industries } from "@/data/industries";

import { getOnboardingStatus } from "@/actions/user";
import OnboardingForm from "./_components/onboardingForm";

export default async function OnboardingPage() {
  // Check if user is already onboarded
  const { isOnboarded } = await getOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}