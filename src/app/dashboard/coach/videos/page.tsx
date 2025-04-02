import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadVideo, deleteVideo } from "./actions";

export default async function VideosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const videos = await prisma.video.findMany({
    where: { coachId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Training Videos</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>
        <form action={uploadVideo} className="space-y-4">
          <div>
            <Input
              name="title"
              placeholder="Video Title"
              required
            />
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Video Description (optional)"
            />
          </div>
          <div>
            <Input
              name="url"
              type="url"
              placeholder="Video URL"
              required
            />
          </div>
          <Button type="submit">Upload Video</Button>
        </form>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="p-4">
            <h3 className="font-semibold mb-2">{video.title}</h3>
            {video.description && (
              <p className="text-gray-600 text-sm mb-4">{video.description}</p>
            )}
            <div className="aspect-video bg-gray-100 rounded-md mb-4">
              {/* Video thumbnail would go here */}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Uploaded {new Date(video.createdAt).toLocaleDateString()}</span>
              <form action={deleteVideo}>
                <input type="hidden" name="videoId" value={video.id} />
                <Button type="submit" variant="ghost" size="sm">Delete</Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 