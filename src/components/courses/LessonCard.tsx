import { Card } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { Lesson } from "@/types/prisma"

interface LessonCardProps {
  lesson: Lesson
  hasAccess: boolean
}

export function LessonCard({ lesson, hasAccess }: LessonCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium">{lesson.title}</h3>
            {!hasAccess && (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            Lesson {lesson.order}
          </span>
        </div>

        {hasAccess ? (
          <>
            <div className="aspect-video mb-4">
              <video
                src={lesson.videoUrl}
                controls
                className="w-full h-full rounded-lg"
              />
            </div>
            {lesson.notes && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Lesson Notes</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {lesson.notes}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 bg-muted/50">
            <p className="text-muted-foreground">
              Unlock this course to access all lessons
            </p>
          </div>
        )}
      </div>
    </Card>
  )
} 