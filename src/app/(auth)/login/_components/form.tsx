"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Form() {
  return (
    <form>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="*******" required />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline">
            <FcGoogle className="mx-2 size-5" />
            Login with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="/signup"
          className="text-sm text-muted-foreground hover:underline"
          prefetch={false}
        >
          Doesn&apos;t have an account? Signup
        </Link>
        <Button type="submit">Login</Button>
      </CardFooter>
    </form>
  );
}
