'use client';

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { SelectWinnersForm } from "./select-winners-form";

export default function JudgingPage() {
  const params = useParams();
  const { data: challenge, isLoading } = api.challenges.getForJudging.useQuery({
    id: params.challengeId as string,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!challenge) {
    return <div>Challenge not found or not ready for judging</div>;
  }

  if (challenge.submissions.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Select Winners</h1>
        <p className="text-lg mb-8">
          No submissions to judge for {challenge.title}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Select Winners</h1>
      <p className="text-lg mb-8">
        Select up to 3 winners for {challenge.title}
      </p>
      <SelectWinnersForm challengeId={challenge.id} submissions={challenge.submissions} />
    </div>
  );
} 