import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getChecklistStatus } from "@/lib/checklist";
import SetupChecklist from "@/components/dashboard/coach/SetupChecklist";

export default async function CoachDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const checklist = await getChecklistStatus(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coach Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Setup Checklist</h2>
        <SetupChecklist checklist={checklist} />
      </div>
    </div>
  );
} 