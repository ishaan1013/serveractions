"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export const addItem = async (id: string, addColor: string, now: string) => {
  "use server";

  const len = await kv.llen("storage");

  if (len > 20) {
    await kv.rpop("storage");
    await kv.rpop("labels");
    await kv.rpop("dates");
  }
  await kv.lpush("storage", id);
  await kv.lpush("labels", addColor);
  await kv.lpush("dates", now);

  revalidatePath("/app");
};
