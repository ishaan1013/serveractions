"use server";

import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const addItem = async (id: string) => {
  "use server";

  await kv.lpush("storage", id);

  revalidatePath("/app");
};
