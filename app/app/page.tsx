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

export default async function App() {
  const list = await kv.lrange("storage", 0, -1);

  // const [optimisticList, addOptimisticItem] = useOptimistic(

  // );
  // console.log(list);

  return (
    <>
      <div className="break-words max-w-[200px]">{JSON.stringify(list)}</div>
      <Add list={list} />

      <div className="w-full max-w-screen-md px-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-44 xs:52 sm:w-64">ID</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: string) => {
              return (
                <TableRow>
                  <TableCell className="font-mono">{item}</TableCell>
                  <TableCell>
                    <div className="w-7 h-4 rounded-full bg-red-500" />
                  </TableCell>
                  <TableCell className="text-right">...</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
