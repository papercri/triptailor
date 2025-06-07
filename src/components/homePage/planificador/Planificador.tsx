import styles from './Planificador.module.scss'

function Planificador() {
  return (
    <section className={styles.planner} >
        <div className="container">
            <div className="header">
                <h2>Planificador personalizado</h2>
                <p>Deja que nuestra IA cree el plan de viaje perfecto para ti</p>
            </div>
            
            <form className={styles.planner__form} >
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="destination">Destino</label>
                        <input type="text" id="destination" placeholder="ej. París, Francia" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="days">Días de viaje</label>
                        <select id="days">
                            <option>1-3 días</option>
                            <option>4-7 días</option>
                            <option>1-2 semanas</option>
                            <option>Más de 2 semanas</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="style">Estilo de viaje</label>
                        <select id="style">
                            <option>Mochilero</option>
                            <option>Estándar</option>
                            <option>Confort</option>
                            <option>Lujo</option>
                            <option>Familia</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="season">Temporada</label>
                        <select id="season">
                            <option>Primavera</option>
                            <option>Verano</option>
                            <option>Otoño</option>
                            <option>Invierno</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="budget">Presupuesto aproximado</label>
                        <input type="text" id="budget" placeholder="ej. €1000" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="text"></label>
                    </div>
                    
                    <div className="form-group full-width">
                        <label htmlFor="notes">Notas adicionales</label>
                        <textarea id="notes" placeholder="Cuéntanos más sobre tu viaje ideal..."></textarea>
                    </div>
                </div>
                
                <div >
                    <button type="submit" className="btn btn--primary">
                        🤖 Generar plan personalizado
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Planificador