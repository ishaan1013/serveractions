"use client";

import { nanoid } from "nanoid";
import { addItem } from "./actions";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function Add({ list }: any) {
  let [optimisticList, addOptimisticItem] = useOptimistic(
    { list, sending: false },
    (state, newList) => ({
      ...state,
      list: newList,
      sending: true,
    })
  );

  return (
    <>
      <div className="mt-8 break-words max-w-[200px] text-red-500">
        {JSON.stringify(optimisticList)}
      </div>
      <button
        className="px-4 py-2 mt-4 bg-red-300"
        onClick={async () => {
          const id = nanoid();
          console.log();
          addOptimisticItem(optimisticList.list.concat(id));
          await addItem(id);
        }}
      >
        add
      </button>
    </>
  );
}
