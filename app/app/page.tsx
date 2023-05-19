import { kv } from "@vercel/kv";
import Add from "./add";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import colors, { colorKeys } from "@/lib/colors";

export default async function App() {
  const list = await kv.lrange("storage", 0, -1);
  const labels = await kv.lrange("labels", 0, -1);
  const dates = await kv.lrange("dates", 0, -1);

  return (
    <>
      <Add list={list} labels={labels} dates={dates} />

      <div className="w-full max-w-screen-md px-4 pb-16">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-44 xs:52 sm:w-64">ID</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: string, index: number) => {
              return (
                <TableRow>
                  <TableCell className="font-mono">{item}</TableCell>
                  <TableCell>
                    <div
                      style={{ background: colors[labels[index] as colorKeys] }}
                      className="w-6 h-4 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(dates[index]).toLocaleDateString("en-US")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
