import { prisma } from "../prisma/client";

export async function saveGithubUser(user: any) {
  // Upsert logic for user
  return prisma.githubUser.upsert({
    where: { id: user.id },
    update: user,
    create: user,
  });
}

export async function saveGithubRepos(username: string, repos: any[]) {
  // Replace all repos for user
  await prisma.githubRepo.deleteMany({ where: { owner: username } });
  return prisma.githubRepo.createMany({ data: repos });
}
