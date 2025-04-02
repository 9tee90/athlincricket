import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifyCertification } from "./actions";

export default async function CertificationPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isVerifiedCoach: true },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coaching Certification</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Verification Status</h2>
            <p className="text-gray-600">
              {user?.isVerifiedCoach
                ? "✅ Your coaching certification has been verified"
                : "⭕ Your coaching certification is pending verification"}
            </p>
          </div>

          {!user?.isVerifiedCoach && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Upload Your Certification</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please upload a copy of your coaching certification or license.
                  We'll review it within 24-48 hours.
                </p>
                <form action={verifyCertification}>
                  <div className="flex gap-4">
                    <Button type="submit">Verify Certification</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </form>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Accepted Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>ICC Level 1, 2, or 3 Coaching Certification</li>
                  <li>National Cricket Board Coaching Certification</li>
                  <li>Regional Cricket Association Coaching License</li>
                  <li>Professional Cricket Coaching Diploma</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 