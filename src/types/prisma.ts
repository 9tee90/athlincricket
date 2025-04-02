export type Role = "USER" | "COACH" | "ADMIN"

export interface User {
  id: string
  name: string | null
  email: string | null
  password: string
  emailVerified: Date | null
  image: string | null
  isAdmin: boolean
  role: Role
  isVerifiedCoach: boolean
  coachId: string | null
  createdAt: Date
  updatedAt: Date
  purchasedCourses: Course[]
}

export interface Course {
  id: string
  coachId: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  category: string
  introUrl: string
  bannerUrl: string | null
  coach: User
  lessons: Lesson[]
  buyers: User[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl: string
  order: number
  createdAt: Date
  updatedAt: Date
} 