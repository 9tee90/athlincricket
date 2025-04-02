import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/components/ui/upload-button"

interface EditCoursePageProps {
  params: {
    courseId: string
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const session = await auth()

  if (!session?.user || session.user.role !== "coach") {
    redirect("/")
  }

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      coachId: session.user.id,
    },
    include: {
      lessons: true,
    },
  })

  if (!course) {
    redirect("/dashboard/coach/courses")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Course</h1>
          <p className="text-muted-foreground">Update your course details and content.</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/coach/courses/${course.id}`}>
            Back to Course
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Course Title
            </label>
            <Input
              id="title"
              name="title"
              defaultValue={course.title}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              defaultValue={course.description}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select name="category" defaultValue={course.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="mindset">Mindset</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Intro Video
            </label>
            <UploadButton
              onUploadComplete={(url) => {
                // Handle upload completion
              }}
              endpoint="courseVideo"
            />
            {course.introUrl && (
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={course.introUrl}
                  alt={`${course.title} intro video thumbnail`}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
} 