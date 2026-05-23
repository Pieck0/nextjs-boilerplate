import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  await prisma.session.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
}
