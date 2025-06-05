import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"

export default function page() {
  return (
    <>
      <Header />
        <main className="auth-section">
            <div className="container">
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h2>Iniciar Sesión</h2>
                            <p>Bienvenido de nuevo, continúa explorando el mundo</p>
                        </div>
                        
                        <form className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="tu@email.com" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <div className="password-input">
                                    <input type="password" id="password" placeholder="••••••••" required />
                                    <button type="button" className="toggle-password" id="togglePassword">👁️</button>
                                </div>
                            </div>
                            
                            <div className="form-options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Recordarme</label>
                                </div>
                                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                            </div>
                            
                            <button type="submit" className="btn btn--primary btn--full">Iniciar sesión</button>
                        </form>
                        
                        <div className="auth-divider">
                            <span>O continúa con</span>
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
                            <p>¿No tienes una cuenta? <a href="registro.html">Regístrate</a></p>
                        </div>
                    </div>
                    
                    <div className="auth-image">
                        <div className="auth-image-content">
                            <h3>Descubre el mundo con TripTailor</h3>
                            <p>Planifica tus viajes de forma inteligente con nuestra IA y disfruta de experiencias únicas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
      <Footer />
    </>
  )
}
