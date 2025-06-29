import { Suspense } from "react"
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import RegisterForm from "@/components/auth/RegisterForm"
import "@/styles/auth.scss"

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Create an Account</h2>
                <p>Join TripTailor and start planning your adventures</p>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
