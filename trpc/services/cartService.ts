import prisma from "@/lib/prisma";

export async function mergeSessionCartIntoUserCart({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) {
  await prisma.$transaction(async (tx) => {
    console.log("IN MERGING: ", sessionId, userId);
    const sessionCart = await tx.cart.findUnique({
      where: { sessionId },
      include: {
        items: true,
      },
    });

    if (!sessionCart) return;

    // if this session cart already belongs to this user, nothing to do
    if (sessionCart.userId === userId) return;

    const userCart = await tx.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    // user has no existing cart → just attach current session cart
    if (!userCart) {
      await tx.cart.update({
        where: { id: sessionCart.id },
        data: {
          userId,
        },
      });

      return;
    }

    // merge session items into user cart
    for (const item of sessionCart.items) {
      await tx.cart_item.upsert({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: item.productId,
          },
        },
        create: {
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
        update: {
          quantity: {
            increment: item.quantity,
          },
        },
      });
    }

    // remove old anonymous cart
    await tx.cart.delete({
      where: {
        id: sessionCart.id,
      },
    });
  });
}
