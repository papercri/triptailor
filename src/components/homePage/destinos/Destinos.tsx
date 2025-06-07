import styles from './Destinos.module.scss'

function Destinos() {
  return (
    <>
    <section className="section bg-white">
        <div className="container">
            <div className="header">
                <h2>Destinos populares</h2>
                <p>Explora algunos de los destinos más buscados por nuestros viajeros</p>
            </div>
            
            <div className={styles.destination__grid} >
                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                        <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                        <h3>Tokio, Japón</h3>
                        <div className={styles.meta}>
                            <span>🌡️ 22°C</span>
                            <span>💰 €80/día</span>
                            <span>🗣️ Japonés</span>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>Cultura</span>
                            <span className={styles.tag}>Tecnología</span>
                            <span className={styles.tag}>Gastronomía</span>
                        </div>
                        <p>Descubre la fascinante mezcla entre tradición y modernidad en la capital japonesa.</p>
                    </div>
                </div>

                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                        <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                        <h3>Tokio, Japón</h3>
                        <div className={styles.meta}>
                            <span>🌡️ 22°C</span>
                            <span>💰 €80/día</span>
                            <span>🗣️ Japonés</span>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>Cultura</span>
                            <span className={styles.tag}>Tecnología</span>
                            <span className={styles.tag}>Gastronomía</span>
                        </div>
                        <p>Descubre la fascinante mezcla entre tradición y modernidad en la capital japonesa.</p>
                    </div>
                </div>

                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                        <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                        <h3>Tokio, Japón</h3>
                        <div className={styles.meta}>
                            <span>🌡️ 22°C</span>
                            <span>💰 €80/día</span>
                            <span>🗣️ Japonés</span>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>Cultura</span>
                            <span className={styles.tag}>Tecnología</span>
                            <span className={styles.tag}>Gastronomía</span>
                        </div>
                        <p>Descubre la fascinante mezcla entre tradición y modernidad en la capital japonesa.</p>
                    </div>
                </div>
                

            </div>

            
        </div>

        
    </section>
    </>
  )
}

export default Destinos