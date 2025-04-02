import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{
  include: {
    purchasedCourses: true
  }
}>

export type Course = Prisma.CourseGetPayload<{
  include: {
    coach: true
    lessons: true
    buyers: true
  }
}>

export type Lesson = Prisma.LessonGetPayload<{}> 