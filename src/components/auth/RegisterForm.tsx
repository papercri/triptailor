"use client"
import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "@/context/UserContext"
import { toast } from "react-toastify"
import { useAuthErrorMessage } from "@/hooks/useAuthErrorMessage"

export default function RegisterForm() {
  const { getErrorMessage } = useAuthErrorMessage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [formError, setFormError] = useState("")
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useUser()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setCallbackUrl(params.get("callbackUrl"))
    }
  }, [])

  const validateForm = () => {
    if (!username.trim()) return "Username is required."
    if (!email.trim()) return "Email is required."
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email."
    if (!password.trim()) return "Password is required."
    if (password.length < 6) return "Password must be at least 6 characters."
    return ""
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setFormError(validationError)
      return
    }
    setFormError("") 

    try {
      const user = await signUp(email, password, username)
      toast.success(`${username} - ${user.email}, registred successfully!`)
      setTimeout(() => {
        router.push(callbackUrl ?? "/")
      }, 2000)
    } catch (err: unknown) {
      console.error("Firebase error:", err)
      const errorCode =
        typeof err === "object" && err !== null && "code" in err
          ? (err as { code: string }).code
          : ""
      const errorMessage = getErrorMessage(errorCode)
      setFormError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="userName"
            required
          />
        </div>
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

        {formError && (
          <p className="text-red-600 text-sm my-2">{formError}</p>
        )}

        <button type="submit" className="btn btn--primary btn--full">
          Register
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Already have an account?{" "}
          <Link href={`/auth/signin${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}>
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}
