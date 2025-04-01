'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Submission {
  id: string;
  videoUrl: string;
  poseReviewed: boolean;
  poseFeedback: string | null;
  user: {
    name: string;
  };
  challenge: {
    title: string;
  };
}

export default function PoseFeedbackPage() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    if (session?.user?.id) {
      fetchSubmissions();
    }
  }, [session]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions/pose-feedback');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleFeedbackChange = (submissionId: string, value: string) => {
    setFeedback(prev => ({ ...prev, [submissionId]: value }));
  };

  const handleSubmitFeedback = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}/pose-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          poseFeedback: feedback[submissionId],
          poseReviewed: true,
        }),
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
        setFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[submissionId];
          return newFeedback;
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const pendingSubmissions = submissions.filter(sub => !sub.poseReviewed);
  const completedSubmissions = submissions.filter(sub => sub.poseReviewed);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Pose Feedback</h1>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">
            Pending Reviews ({pendingSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed Reviews ({completedSubmissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{submission.challenge.title}</CardTitle>
                  <Badge variant="secondary">{submission.user.name}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <video
                      src={submission.videoUrl}
                      controls
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <Textarea
                    placeholder="Enter pose feedback..."
                    value={feedback[submission.id] || ''}
                    onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                    className="mb-4"
                  />
                  <Button
                    onClick={() => handleSubmitFeedback(submission.id)}
                    className="w-full"
                  >
                    Mark as Reviewed
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{submission.challenge.title}</CardTitle>
                  <Badge variant="secondary">{submission.user.name}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <video
                      src={submission.videoUrl}
                      controls
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-2">Feedback:</p>
                    <p>{submission.poseFeedback}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 