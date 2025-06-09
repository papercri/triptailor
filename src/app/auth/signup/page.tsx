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
                <h2>Create an Account</h2>
                <p>Join TripTailor and start planning your adventures</p>
              </div>

              <form className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" placeholder="Your first name" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" placeholder="Your last name" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input type="password" id="password" placeholder="Minimum 8 characters" required />
                    <button type="button" className="toggle-password" id="togglePassword">👁️</button>
                  </div>
                  <div className="password-strength">
                    <div className="strength-meter">
                      <span className="meter-segment"></span>
                      <span className="meter-segment"></span>
                      <span className="meter-segment"></span>
                      <span className="meter-segment"></span>
                    </div>
                    <span className="strength-text">Password strength</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="password-input">
                    <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
                    <button type="button" className="toggle-password" id="toggleConfirmPassword">👁️</button>
                  </div>
                </div>

                <div className="form-options">
                  <div className="terms-check">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                      I accept the <a href="#">Terms and Conditions</a> and the <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full">Create Account</button>
              </form>

              <div className="auth-divider">
                <span>Or sign up with</span>
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
                <p>Already have an account? <a href="login.html">Sign in</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
