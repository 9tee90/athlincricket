"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface CourseData {
  title: string
  description: string
  category: string
  introUrl: string
  bannerUrl: string
  lessons: {
    title: string
    videoUrl: string
    notes: string
  }[]
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  introUrl: string
  bannerUrl: string | null
  coachId: string
  createdAt: Date
  updatedAt: Date
}

export async function createCourse(data: CourseData) {
  const session = await auth()
  
  if (!session?.user || !["coach", "admin"].includes(session.user.role)) {
    throw new Error("Unauthorized")
  }

  try {
    // Validate required fields
    if (!data.title.trim()) {
      throw new Error("Title is required")
    }
    if (!data.description.trim()) {
      throw new Error("Description is required")
    }
    if (!data.category) {
      throw new Error("Category is required")
    }
    if (!data.introUrl) {
      throw new Error("Intro video is required")
    }
    if (!data.lessons.length) {
      throw new Error("At least one lesson is required")
    }

    // Create the course with a transaction to ensure all data is saved
    const result = await db.$transaction(async (tx) => {
      // Create the course
      const [course] = await tx.$queryRaw<[Course]>`
        INSERT INTO "Course" (
          id,
          title,
          description,
          category,
          "introUrl",
          "bannerUrl",
          "coachId",
          "createdAt",
          "updatedAt"
        ) VALUES (
          gen_random_uuid(),
          ${data.title},
          ${data.description},
          ${data.category},
          ${data.introUrl},
          ${data.bannerUrl},
          ${session.user.id},
          NOW(),
          NOW()
        )
        RETURNING *
      `

      // Create the lessons
      for (const [index, lesson] of data.lessons.entries()) {
        await tx.$queryRaw`
          INSERT INTO "Lesson" (
            id,
            "courseId",
            title,
            "videoUrl",
            notes,
            "order",
            "createdAt",
            "updatedAt"
          ) VALUES (
            gen_random_uuid(),
            ${course.id},
            ${lesson.title},
            ${lesson.videoUrl},
            ${lesson.notes},
            ${index + 1},
            NOW(),
            NOW()
          )
        `
      }

      return course
    })

    revalidatePath("/dashboard/coach/courses")
    return result
  } catch (error) {
    console.error("Error creating course:", error)
    throw new Error("Failed to create course")
  }
} 