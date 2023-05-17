import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <header className="flex items-center justify-between w-full max-w-screen-md py-6 px-4">
        <Link href="/app" className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-foreground to-muted z-10 " />
          <div className="w-8 h-4 top-1/2 rounded-full bg-muted-foreground/50 blur  absolute -z-10" />
        </Link>
        <UserButton />
      </header>
      {children}
    </div>
  );
}
