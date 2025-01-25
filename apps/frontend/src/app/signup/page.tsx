
"use client"
import { AuthForm } from "@/components/Form/page";
import { Bot } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-2xl font-bold text-violet-600 dark:text-violet-400"
          >
          
            <span>Excali - Your Own Drawing App</span>
          </Link>
          
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Ready to Draw in Canvas 😎
          </p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  );
}