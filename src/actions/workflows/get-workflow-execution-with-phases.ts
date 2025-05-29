"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowExecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  return await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId: userId,
    },
    include: {
      ExecutionPhase: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
};
