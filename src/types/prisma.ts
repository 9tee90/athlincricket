import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{}>
export type Course = Prisma.CourseGetPayload<{
  include: {
    coach: true
    lessons: true
  }
}>
export type Lesson = Prisma.LessonGetPayload<{}> 