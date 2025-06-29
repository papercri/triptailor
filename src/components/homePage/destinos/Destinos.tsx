//import styles from './Destinos.module.scss'
import CityCarousel from './Carousel'; 
function Destinos() {
  return (
    <>
    <section className="section bg-white">
        <div className="container">
            <div className="header">
            <h2>Popular Destinations</h2>
            <p>Explore some of the most searched destinations by our travelers</p>
            </div>
            <CityCarousel />
            {/* <div className={styles.destination__grid}>
                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                    <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                    <h3>Tokyo, Japan</h3>
                    <div className={styles.meta}>
                        <span>🌡️ 22°C</span>
                        <span>💰 €80/day</span>
                        <span>🗣️ Japanese</span>
                    </div>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Culture</span>
                        <span className={styles.tag}>Technology</span>
                        <span className={styles.tag}>Gastronomy</span>
                    </div>
                    <p>Discover the fascinating blend of tradition and modernity in Japan’s capital.</p>
                    </div>
                </div>

                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                    <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                    <h3>Tokyo, Japan</h3>
                    <div className={styles.meta}>
                        <span>🌡️ 22°C</span>
                        <span>💰 €80/day</span>
                        <span>🗣️ Japanese</span>
                    </div>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Culture</span>
                        <span className={styles.tag}>Technology</span>
                        <span className={styles.tag}>Gastronomy</span>
                    </div>
                    <p>Discover the fascinating blend of tradition and modernity in Japan’s capital.</p>
                    </div>
                </div>

                <div className={`${styles.destination__card} card`}>
                    <div className={styles["destination__card-image"]}>
                    <div className={styles.badge}>Popular</div>
                    </div>
                    <div className={styles["destination__card-content"]}>
                    <h3>Tokyo, Japan</h3>
                    <div className={styles.meta}>
                        <span>🌡️ 22°C</span>
                        <span>💰 €80/day</span>
                        <span>🗣️ Japanese</span>
                    </div>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Culture</span>
                        <span className={styles.tag}>Technology</span>
                        <span className={styles.tag}>Gastronomy</span>
                    </div>
                    <p>Discover the fascinating blend of tradition and modernity in Japan’s capital.</p>
                    </div>
                </div>
            </div> */}
        </div>
    </section>

    </>
  )
}

export default Destinos