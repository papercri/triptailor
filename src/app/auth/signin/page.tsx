import { Suspense } from "react"
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import LoginForm from "@/components/auth/LoginForm"
import "@/styles/auth.scss"

//import { useAuthErrorMessage } from "@/hooks/useAuthErrorMessage";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Sign In</h2>
                <p>Welcome back, keep exploring the world</p>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
