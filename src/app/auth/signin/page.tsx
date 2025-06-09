import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import '../auth.scss'

export default function page() {
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

              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input type="password" id="password" placeholder="••••••••" required />
                    <button type="button" className="toggle-password" id="togglePassword">👁️</button>
                  </div>
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="forgot-password">Forgot your password?</a>
                </div>

                <button type="submit" className="btn btn--primary btn--full">Sign In</button>
              </form>

              <div className="auth-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-login">
                <button className="btn btn--social btn--google">
                  <span className="icon">G</span>
                  <span>Google</span>
                </button>
                <button className="btn btn--social btn--facebook">
                  <span className="icon">f</span>
                  <span>Facebook</span>
                </button>
              </div>

              <div className="auth-footer">
                <p>Don&apos;t have an account? <a href="registro.html">Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
