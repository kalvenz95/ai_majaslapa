import "server-only";
import { UserStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class BlockedUserError extends Error {
  constructor(message = "Konts ir blokets") {
    super(message);
    this.name = "BlockedUserError";
  }
}

/**
 * Parbauda, vai lietotajs nav blokets.
 * Ja DB ieraksta nav, kludu nemet - to valide konkretais marsruts pec vajadzibas.
 */
export async function assertNotBlocked(clerkId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { status: true },
  });

  if (user?.status === UserStatus.BLOCKED) {
    throw new BlockedUserError();
  }
}
