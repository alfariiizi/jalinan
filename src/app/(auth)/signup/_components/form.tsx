"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Form() {
  return (
    <form className="">
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline">
            <FcGoogle className="mx-2 size-5" />
            Sign up with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:underline"
          prefetch={false}
        >
          Already have an account? Login
        </Link>
        <Button type="submit">Sign Up</Button>
      </CardFooter>
    </form>
  );
}
