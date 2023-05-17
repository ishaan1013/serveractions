"use client";

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
      <div className="mt-8 text-red-500">{JSON.stringify(optimisticList)}</div>
      <button
        className="px-4 py-2 mt-4 bg-red-300"
        onClick={async () => {
          addOptimisticItem(optimisticList);
          await addItem();
        }}
      >
        add
      </button>
    </>
  );
}
