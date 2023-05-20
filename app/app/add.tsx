"use client";

import { experimental_useOptimistic as useOptimistic, useState } from "react";
import { nanoid } from "@/lib/utils";
import { addItem } from "./actions";
import { Check, Loader2 } from "lucide-react";
import colors, { colorKeys } from "@/lib/colors";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Add({
  list,
  labels,
  dates,
}: {
  list: string[];
  labels: string[];
  dates: string[];
}) {
  const [addColor, setAddColor] = useState("red");

  let [optimisticList, addOptimisticItem] = useOptimistic(
    { list, sending: false },
    (state, newList: string[]) => ({
      ...state,
      list: newList,
      sending: true,
    })
  );

  let [optimisticLabels, addOptimisticLabel] = useOptimistic(
    { labels, sending: false },
    (state, newLabels: string[]) => ({
      ...state,
      labels: newLabels,
      sending: true,
    })
  );

  let [optimisticDates, addOptimisticDate] = useOptimistic(
    { dates, sending: false },
    (state, newDates: string[]) => ({
      ...state,
      dates: newDates,
      sending: true,
    })
  );

  return (
    <>
      {/* <div className="break-words max-w-[200px] mb-8 text-red-500">
        {JSON.stringify(optimisticList)}
      </div> */}
      <div className="w-full flex justify-center max-w-screen-md px-4">
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center ">
                Optimistic Table{" "}
                {optimisticList.sending ? (
                  <Loader2 className="w-4 text-muted-foreground h-4 ml-2 animate-spin" />
                ) : (
                  <Check className="w-4 text-muted-foreground h-4 ml-2" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-44 xs:52 sm:w-64">ID</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optimisticList.list
                    .slice(0, 2)
                    .map((item: string, index: number) => {
                      return (
                        <TableRow>
                          <TableCell className="font-mono">{item}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                background:
                                  colors[
                                    optimisticLabels.labels[index] as colorKeys
                                  ],
                              }}
                              className="w-6 h-4 rounded-full"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            {new Date(
                              optimisticDates.dates[index]
                            ).toLocaleDateString("en-US")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow>
                    <TableCell className="select-none font-mono">...</TableCell>
                    <TableCell className="select-none font-mono">...</TableCell>
                    <TableCell className="select-none font-mono text-right">
                      ...
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex items-center my-6">
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
        <Button
          className="ml-2 flex items-center"
          disabled={optimisticList.sending}
          onClick={async () => {
            const id = nanoid();
            const now = Date.now().toString();

            if (optimisticList.list.length > 3) {
              addOptimisticItem([id, ...optimisticList.list.slice(0, 3)]);
              addOptimisticLabel([
                addColor,
                ...optimisticLabels.labels.slice(0, 3),
              ]);
              addOptimisticDate([now, ...optimisticDates.dates.slice(0, 3)]);
            } else {
              addOptimisticItem([id, ...optimisticList.list]);
              addOptimisticLabel([addColor, ...optimisticLabels.labels]);
              addOptimisticDate([now, ...optimisticDates.dates]);
            }

            await addItem(id, addColor, now);
          }}
        >
          Add Item
        </Button>
      </div>
    </>
  );
}
