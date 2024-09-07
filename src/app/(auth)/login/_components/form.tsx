"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginSchema, type LoginValues } from "@/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "../actions";
import { api } from "@/trpc/react";

export default function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const utils = api.useUtils();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(async (data) => {
          const formData = new FormData();
          formData.set("username", data.username);
          formData.set("password", data.password);

          const res = await login(undefined, formData);
          if (typeof res === "boolean") {
            if (res) {
              toast.success("Successfully login!");
              await utils.invalidate();
              router.push("/gate");
            } else {
              toast.error("Failed to login into your account!");
            }
          }
        })(e);
      }}
    >
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username / Email</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe11"
            required
            {...register("username")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="*******"
            required
            {...register("password")}
          />
        </div>
        {/* <div className="grid grid-cols-1 gap-4"> */}
        {/*   <Button variant="outline"> */}
        {/*     <FcGoogle className="mx-2 size-5" /> */}
        {/*     Login with Google */}
        {/*   </Button> */}
        {/* </div> */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="/signup"
          className="text-sm text-muted-foreground hover:underline"
          prefetch={false}
        >
          Doesn&apos;t have an account? Signup
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          Login
        </Button>
      </CardFooter>
    </form>
  );
}
