import styles from './About.module.scss'

function About() {
  return (
    <>
    <section className={styles.features}>
        <div className="container">
            <div className="header">
            <h2>Why choose TripTailor?</h2>
            <p>Discover all the features that make TripTailor your best travel companion</p>
            </div>

            <div className={styles.features__grid}>
            <div className={styles.features__item}>
                <div className={styles.icon}>🗺️</div>
                <h3>Comprehensive Information</h3>
                <p>General data, weather, gastronomy, and cultural curiosities of each destination</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}>🤖</div>
                <h3>AI Planning</h3>
                <p>Personalized advice on what to bring, budgeting, and seasonal recommendations</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}>💰</div>
                <h3>Smart Budgeting</h3>
                <p>Accurate estimates based on your travel style, duration, and season</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}>📱</div>
                <h3>Personal Area</h3>
                <p>Save, edit, and organize all your trips in one place</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}>🍽️</div>
                <h3>Local Gastronomy</h3>
                <p>Discover typical dishes and culinary culture of each destination</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}>🌡️</div>
                <h3>Weather & Seasons</h3>
                <p>Current and seasonal weather information to help you plan better</p>
            </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default About



