"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useUser } from "@/context/UserContext"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { signIn } = useUser()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      router.push(callbackUrl ? callbackUrl : "/")
    } catch (error) {
      setError("Failed to sign in" + error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
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
              className=""
              id="password"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn--primary btn--full">
          Sign In
        </button>
        {error && (
          <div className="auth-error" style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </div>
        )}
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
