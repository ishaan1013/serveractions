import { kv } from "@vercel/kv";
import { experimental_useOptimistic as useOptimistic } from "react";
import Add from "./add";

export default async function App() {
  const list = await kv.lrange("storage", 0, -1);

  // const [optimisticList, addOptimisticItem] = useOptimistic(

  // );
  // console.log(list);

  return (
    <>
      <div className="break-words max-w-[200px]">{JSON.stringify(list)}</div>
      <Add />
    </>
  );
}
