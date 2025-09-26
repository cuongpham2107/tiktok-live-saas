"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { data: session } = useSession()

  console.log(session)
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
        <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            className="mr-2 h-4 w-4"
          >
            <path
              d="M533.5 278.4c0-17.4-1.5-34.1-4.7-50.4H272v95.5h146.9c-6.3 34-25 62.8-53.4 82v68h86.2c50.4-46.4 81.8-114.7 81.8-195.1z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c72.6 0 133.6-24 178.1-64.9l-86.2-68c-24 16-54.6 25.4-91.9 25.4-70.6 0-130.4-47.7-151.8-111.7H32.1v70.1c44.5 88.2 134.7 149.1 239.9 149.1z"
              fill="#34A853"
            />
            <path
              d="M120.2 324.1c-11.4-34-11.4-70.6 0-104.6V150H32.1c-38.3 75.9-38.3 166.3 0 242.2l88.1-68.1z"
              fill="#FBBC05"
            />
            <path
              d="M272 107.7c39.5-.6 77.2 14.1 106 40.8l79.6-79.6C405.9 24.3 344.9 0 272 0 166.8 0 76.6 60.9 32.1 150l88.1 70.1c21.4-64 81.2-111.7 151.8-112.4z"
              fill="#EA4335"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
