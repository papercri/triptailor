import styles from './Planificador.module.scss'

function Planificador() {
  return (
    <section className={styles.planner}>
        <div className="container">
            <div className="header">
            <h2>Personalized Planner</h2>
            <p>Let our AI create the perfect travel plan for you</p>
            </div>
            
            <form className={styles.planner__form}>
            <div className="form-grid">
                <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <input type="text" id="destination" placeholder="e.g. Paris, France" />
                </div>
                
                <div className="form-group">
                <label htmlFor="days">Travel Duration</label>
                <select id="days">
                    <option>1-3 days</option>
                    <option>4-7 days</option>
                    <option>1-2 weeks</option>
                    <option>More than 2 weeks</option>
                </select>
                </div>
                
                <div className="form-group">
                <label htmlFor="style">Travel Style</label>
                <select id="style">
                    <option>Backpacker</option>
                    <option>Standard</option>
                    <option>Comfort</option>
                    <option>Luxury</option>
                    <option>Family</option>
                </select>
                </div>
                
                <div className="form-group">
                <label htmlFor="season">Season</label>
                <select id="season">
                    <option>Spring</option>
                    <option>Summer</option>
                    <option>Autumn</option>
                    <option>Winter</option>
                </select>
                </div>
                
                <div className="form-group">
                <label htmlFor="budget">Approximate Budget</label>
                <input type="text" id="budget" placeholder="e.g. €1000" />
                </div>
                
                <div className="form-group full-width">
                <label htmlFor="notes">Additional Notes</label>
                <textarea id="notes" placeholder="Tell us more about your ideal trip..."></textarea>
                </div>
            </div>
            
            <div>
                <button type="submit" className="btn btn--primary">
                🤖 Generate Personalized Plan
                </button>
            </div>
            </form>
        </div>
    </section>

  )
}

export default Planificador