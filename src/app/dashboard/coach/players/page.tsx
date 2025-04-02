import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { invitePlayer, removePlayer } from "./actions";

interface Player {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

export default async function PlayersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const invitedPlayers = await prisma.user.findMany({
    where: {
      coachedBy: {
        some: {
          id: session.user.id
        }
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  }) as Player[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invite Players</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Invite Players by Email</h2>
        <form action={invitePlayer} className="space-y-4">
          <div className="flex gap-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter player's email"
              className="flex-1"
              required
            />
            <Button type="submit">Send Invitation</Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Invited Players</h2>
        {invitedPlayers.map((player) => (
          <Card key={player.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{player.name}</h3>
                <p className="text-gray-600 text-sm">{player.email}</p>
              </div>
              <form action={removePlayer}>
                <input type="hidden" name="playerId" value={player.id} />
                <Button type="submit" variant="ghost" size="sm">Remove</Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 