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
                        <h2>Crear una cuenta</h2>
                        <p>Únete a TripTailor y comienza a planificar tus aventuras</p>
                    </div>
                    
                    <form className="auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">Nombre</label>
                                <input type="text" id="firstName" placeholder="Tu nombre" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="lastName">Apellido</label>
                                <input type="text" id="lastName" placeholder="Tu apellido" required />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="tu@email.com" required />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="password-input">
                                <input type="password" id="password" placeholder="Mínimo 8 caracteres" required />
                                <button type="button" className="toggle-password" id="togglePassword">👁️</button>
                            </div>
                            <div className="password-strength">
                                <div className="strength-meter">
                                    <span className="meter-segment"></span>
                                    <span className="meter-segment"></span>
                                    <span className="meter-segment"></span>
                                    <span className="meter-segment"></span>
                                </div>
                                <span className="strength-text">Fuerza de contraseña</span>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <div className="password-input">
                                <input type="password" id="confirmPassword" placeholder="Confirma tu contraseña" required />
                                <button type="button" className="toggle-password" id="toggleConfirmPassword">👁️</button>
                            </div>
                        </div>
                        
                        <div className="form-options">
                            <div className="terms-check">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms">Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a></label>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn--primary btn--full">Crear cuenta</button>
                    </form>
                    
                    <div className="auth-divider">
                        <span>O regístrate con</span>
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
                        <p>¿Ya tienes una cuenta? <a href="login.html">Inicia sesión</a></p>
                    </div>
                </div>
                
                <div className="auth-image">
                    <div className="auth-image-content">
                        <h3>Únete a nuestra comunidad de viajeros</h3>
                        <p>Más de 10,000 viajeros ya confían en TripTailor para planificar sus aventuras alrededor del mundo.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Footer />
    </>
  )
}
