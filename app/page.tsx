import Image from "next/image";

import imageKv from "@/assets/kv.png";
import imageClerk from "@/assets/clerk.png";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-foreground font-semibold text-2xl mb-4">
        Next.js Server Actions Test
      </div>
      <div className="grid grid-cols-2 w-full max-w-[300px] sm:gap-4 gap-2">
        <a
          href="https://vercel.com/docs/storage/vercel-kv"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg duration-200 hover:opacity-80 border bg-card flex items-center justify-center text-card-foreground shadow-sm w-full bg-cover h-28 overflow-hidden relative"
        >
          <Image
            src={imageKv}
            alt="Vercel kv logo"
            className="min-w-full min-h-full absolute object-cover"
          />
        </a>
        <a
          href="https://clerk.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg duration-200 hover:opacity-80 border bg-card flex items-center justify-center text-card-foreground shadow-sm w-full h-28 overflow-hidden relative"
        >
          <Image
            src={imageClerk}
            alt="Clerk logo"
            className="absolute object-contain p-[44px]"
          />
        </a>
      </div>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="mt-10" size={"lg"}>
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/app">
          <Button className="mt-10" size={"lg"}>
            Go To App <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </SignedIn>
    </main>
  );
}
