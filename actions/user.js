"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export  async function updateUser(data) {
    //Check the user is logged in or not

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised!!")

    // Cehck if the user exists in the db

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })
    if (!user) throw new Error("User not found")

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if the industry exixts
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }

                })
                //if the industry doesn't exists , create it with the default values , will replace it with AI later 
                if (!industryInsight) {
                    industryInsight = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,  // The industry this data belongs to (e.g., "tech-software-development")
                            // Salary data
                            salaryRanges: [],  // Array of { role: string, min: float, max: float, median: float, location: string? }
                            // Industry trends
                            growthRate: 0,      // Industry growth rate
                            demandLevel: "Medium",     // "High", "Medium", "Low"
                            topSkills: [],  // Most in-demand skills
                            // Market conditions
                            marketOutlook: "Neutral",  // "Positive", "Neutral", "Negative"
                            keyTrends: [],  // Array of current industry trends
                            // Learning suggestions
                            recommendedSkills: [], // Skills recommended for the industry
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 1000) // 1 week from now
                        }
                    })
                }
                // update the user 
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });
                return { updatedUser, industryInsight }
            },
            {
                timeout: 1000,
            }
        )
        return result.user
    }
    catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

//  If the user has selected an industry, onboarding done 
// If not, onboarding pending

export  async function getOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised!!")

    // Cehck if the user exists in the db

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })
    if (!user) throw new Error("User not found")
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}