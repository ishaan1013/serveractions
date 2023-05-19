"use client";

import { nanoid } from "@/lib/utils";
import { addItem } from "./actions";
import { experimental_useOptimistic as useOptimistic, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Add({ list, labels, dates }: any) {
  const [addColor, setAddColor] = useState("red");

  let [optimisticList, addOptimisticItem] = useOptimistic(
    { list, sending: false },
    (state, newList) => ({
      ...state,
      list: newList,
      sending: true,
    })
  );

  let [optimisticLabels, addOptimisticLabel] = useOptimistic(
    { labels, sending: false },
    (state, newLabels) => ({
      ...state,
      labels: newLabels,
      sending: true,
    })
  );

  let [optimisticDates, addOptimisticDate] = useOptimistic(
    { dates, sending: false },
    (state, newDates) => ({
      ...state,
      dates: newDates,
      sending: true,
    })
  );

  return (
    <>
      <div className="mt-8 break-words max-w-[200px] text-red-500">
        {JSON.stringify(optimisticList)}
      </div>
      <div className="flex items-center mt-4">
        <Button
          className="px-4 py-2 mr-2"
          size={"sm"}
          onClick={async () => {
            const id = nanoid();
            const now = Date.now().toString();
            addOptimisticItem(optimisticList.list.concat(id));
            addOptimisticLabel(optimisticLabels.labels.concat(addColor));
            addOptimisticDate(optimisticDates.dates.concat(now));
            await addItem(id, addColor, now);
          }}
        >
          Add Item
        </Button>
        <Select value={addColor} onValueChange={setAddColor}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">
              <div className="flex text-red-600 items-center">
                Red <div className="w-6 ml-2 h-4 rounded-full bg-red-500" />
              </div>
            </SelectItem>
            <SelectItem value="orange">
              <div className="flex text-orange-600 items-center">
                Orange{" "}
                <div className="w-6 ml-2 h-4 rounded-full bg-orange-500" />
              </div>
            </SelectItem>
            <SelectItem value="yellow">
              <div className="flex text-yellow-600 items-center">
                Yellow{" "}
                <div className="w-6 ml-2 h-4 rounded-full bg-yellow-500" />
              </div>
            </SelectItem>
            <SelectItem value="green">
              <div className="flex text-green-600 items-center">
                Green <div className="w-6 ml-2 h-4 rounded-full bg-green-500" />
              </div>
            </SelectItem>
            <SelectItem value="blue">
              <div className="flex text-blue-600 items-center">
                Blue <div className="w-6 ml-2 h-4 rounded-full bg-blue-500" />
              </div>
            </SelectItem>
            <SelectItem value="purple">
              <div className="flex text-purple-600 items-center">
                Purple
                <div className="w-6 ml-2 h-4 rounded-full bg-purple-500" />
              </div>
            </SelectItem>
            <SelectItem value="pink">
              <div className="flex text-pink-600 items-center">
                Pink <div className="w-6 ml-2 h-4 rounded-full bg-pink-500" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
