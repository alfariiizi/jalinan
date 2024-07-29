"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpValues } from "@/validation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const createUser = api.user.createUser.useMutation({
    onSuccess() {
      toast.success("Successfully create your account!");
      router.push("/login");
    },
    onError() {
      toast.error("Failed to create your account!");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) });

  return (
    <form
      className=""
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(async (data) => {
          await createUser.mutateAsync({
            username: data.username,
            email: data.email,
            password: data.password,
          });
        })(e);
      }}
    >
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="johndoe11"
            required
            {...register("username")}
          />
          <p className="text-destructive">{errors.username?.message}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
          <p className="text-destructive">{errors.email?.message}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            {...register("password")}
          />
          <p className="text-destructive">{errors.password?.message}</p>
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
        <Button type="submit" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </CardFooter>
    </form>
  );
}
