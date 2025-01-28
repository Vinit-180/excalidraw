"use client";

import { Input } from "@repo/ui/input";
// import  Label  from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import axios from "axios";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (type == "signup") {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/signup`, data).then((data) => {
        if (data.data?.token !== undefined) {
          localStorage.setItem("excaliToken", data.data?.token);
        }
      }).catch((err) => {
        console.log(err);
        setError(err.response?.data?.message);
      })
    }
    else {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/signin`, data).then((data) => {
        console.log(data, data?.data?.token);
        if (data.data?.token !== undefined) {
          localStorage.setItem("excaliToken", data.data?.token);
        }
      }).catch((err) => {
        console.log(err);
        setError(err.response?.data?.message);
      })
    }
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div className="grid gap-6">
      {error && <h1 className="text-sm sm:text-lg font-normal text-red-500 text-center"> {error}</h1>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {type === "signup" && (
            <div className="grid gap-2">
              <label htmlFor="name" >Full Name</label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
          )}
          <div className="grid gap-2">
            <label htmlFor="email" >Email</label>
            <Input
              id="email"
              name='username'
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              name='password'
              placeholder="••••••••"
              type="password"
              autoComplete={type === "login" ? "current-password" : "new-password"}
              disabled={isLoading}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <Button disabled={isLoading} className={"py-2 inline-flex items-center  justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? "Sign In" : "Create Account"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <Button variant="outline" disabled={isLoading}>
        <Github className="mr-2 h-4 w-4" /> Github
      </Button> */}
      <div className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Do not have an account?
            <Link href="/signup" className="text-violet-600 hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-violet-600 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}