import type { CartItem, Item } from "@prisma/client";

export type ExtendedCartItem = CartItem & { item: Item };
