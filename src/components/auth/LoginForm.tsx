"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { useAuthErrorMessage } from "@/hooks/useAuthErrorMessage"
import { toast } from "react-toastify"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { signIn } = useUser()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const { getErrorMessage } = useAuthErrorMessage()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.")
      return
    }
    try {
      await signIn(email, password)
      toast.success("Welcome back!")
      setTimeout(() => {
        router.push((callbackUrl ?? "/") as string)
      }, 2000)
    } catch (err: unknown) {
      console.error("Login error:", err)
      const code =
      typeof err === "object" && err && "code" in err ? (err as { code?: string }).code : ""
      toast.error(getErrorMessage(code ?? "") ?? "An unknown error occurred.")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn--primary btn--full">
          Sign In
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Don&apos;t have an account?{" "}
          <Link href={`/auth/signup${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}>
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}
