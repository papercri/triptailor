import styles from './About.module.scss'

function About() {
  return (
    <>
    <section className={styles.features} >
        <div className="container">
            <div className="header">
                <h2>¿Por qué elegir TripTailor?</h2>
                <p>Descubre todas las funcionalidades que hacen de TripTailor tu mejor compañero de viajes</p>
            </div>
            
            <div className={styles.features__grid} >
                <div className={styles.features__item}>
                    <div className={styles.icon}>🗺️</div>
                    <h3>Información completa</h3>
                    <p>Datos generales, clima, gastronomía y curiosidades culturales de cada destino</p>
                </div>
                
                <div className={styles.features__item}>
                    <div className={styles.icon}>🤖</div>
                    <h3>Planificación con IA</h3>
                    <p>Consejos personalizados sobre qué llevar, presupuesto y recomendaciones por temporada</p>
                </div>
                
                <div className={styles.features__item}>
                    <div className={styles.icon}>💰</div>
                    <h3>Presupuesto inteligente</h3>
                    <p>Estimaciones precisas según tu estilo de viaje, duración y temporada</p>
                </div>
                
                <div className={styles.features__item}>
                    <div className={styles.icon}>📱</div>
                    <h3>Área personal</h3>
                    <p>Guarda, edita y organiza todos tus viajes en un solo lugar</p>
                </div>
                
                <div className={styles.features__item}>
                    <div className={styles.icon}>🍽️</div>
                    <h3>Gastronomía local</h3>
                    <p>Descubre los platos típicos y la cultura culinaria de cada destino</p>
                </div>
                
                <div className={styles.features__item}>
                    <div className={styles.icon}>🌡️</div>
                    <h3>Clima y temporadas</h3>
                    <p>Información meteorológica actual y estacional para planificar mejor</p>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default About



