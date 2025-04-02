'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/components/ui/upload-button"
import { createCourse } from "./actions"

const COURSE_CATEGORIES = [
  "Batting",
  "Bowling",
  "Fielding",
  "Wicket Keeping",
  "Mental Game",
  "Fitness",
  "Strategy",
  "Other"
] as const

export default function CreateCoursePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    introUrl: "",
    bannerUrl: "",
    lessons: [] as { title: string; videoUrl: string; notes: string }[]
  })

  const handleNext = () => {
    if (currentStep === 1 && (!courseData.title || !courseData.description || !courseData.category)) {
      alert("Please fill in all required fields")
      return
    }
    if (currentStep === 2 && (!courseData.introUrl || !courseData.bannerUrl)) {
      alert("Please upload both intro video and banner image")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (courseData.lessons.length === 0) {
      alert("Please add at least one lesson")
      return
    }

    try {
      await createCourse(courseData)
      router.push("/dashboard/coach/courses")
    } catch (error) {
      console.error("Error creating course:", error)
      alert("Failed to create course. Please try again.")
    }
  }

  const addLesson = () => {
    setCourseData(prev => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        { title: "", videoUrl: "", notes: "" }
      ]
    }))
  }

  const removeLesson = (index: number) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index)
    }))
  }

  const updateLesson = (index: number, field: keyof typeof courseData.lessons[0], value: string) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map((lesson, i) => 
        i === index ? { ...lesson, [field]: value } : lesson
      )
    }))
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className={`flex-1 text-center ${currentStep === 1 ? "text-primary" : ""}`}>
          1. Course Basics
        </div>
        <div className={`flex-1 text-center ${currentStep === 2 ? "text-primary" : ""}`}>
          2. Media Upload
        </div>
        <div className={`flex-1 text-center ${currentStep === 3 ? "text-primary" : ""}`}>
          3. Add Lessons
        </div>
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course Title</label>
              <Input
                value={courseData.title}
                onChange={e => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={courseData.description}
                onChange={e => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter course description"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={courseData.category}
                onValueChange={value => setCourseData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Course Intro Video</label>
              <UploadButton
                endpoint="courseVideo"
                onUploadComplete={url => setCourseData(prev => ({ ...prev, introUrl: url }))}
              />
              {courseData.introUrl && (
                <p className="mt-2 text-sm text-green-600">✓ Video uploaded successfully</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Course Banner Image</label>
              <UploadButton
                endpoint="courseImage"
                onUploadComplete={url => setCourseData(prev => ({ ...prev, bannerUrl: url }))}
              />
              {courseData.bannerUrl && (
                <p className="mt-2 text-sm text-green-600">✓ Image uploaded successfully</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <Button onClick={addLesson} className="w-full">
              Add New Lesson
            </Button>

            {courseData.lessons.map((lesson, index) => (
              <Card key={index} className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Lesson {index + 1}</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLesson(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Lesson Title</label>
                  <Input
                    value={lesson.title}
                    onChange={e => updateLesson(index, "title", e.target.value)}
                    placeholder="Enter lesson title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lesson Video</label>
                  <UploadButton
                    endpoint="courseVideo"
                    onUploadComplete={url => updateLesson(index, "videoUrl", url)}
                  />
                  {lesson.videoUrl && (
                    <p className="mt-2 text-sm text-green-600">✓ Video uploaded successfully</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <Textarea
                    value={lesson.notes}
                    onChange={e => updateLesson(index, "notes", e.target.value)}
                    placeholder="Enter lesson notes"
                    rows={3}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto">
              Create Course
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
} 