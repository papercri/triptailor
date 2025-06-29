import styles from './About.module.scss'
import { CiMap } from "react-icons/ci";
import { FaRobot, FaUserCog } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbTemperatureSnow } from "react-icons/tb";
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
                <div className={styles.icon}><CiMap /></div>
                <h3>Comprehensive Information</h3>
                <p>General data, weather, gastronomy, and cultural curiosities of each destination</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}><FaRobot /></div>
                <h3>AI Planning</h3>
                <p>Custom recommendations for packing, saving money, and making the most of your trip—based on your traveler profile.</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}><FaMasksTheater /></div>
                <h3>Essential Cultural Insights</h3>
                <p>Key facts, customs, and tips to help you connect with local culture and avoid misunderstandings.</p>

            </div>

            
            <div className={styles.features__item}>
                <div className={styles.icon}><IoFastFoodOutline /></div>
                <h3>Local Gastronomy</h3>
                <p>Discover typical dishes and culinary culture of each destination</p>
            </div>

            <div className={styles.features__item}>
                <div className={styles.icon}><TbTemperatureSnow /></div>
                <h3>Weather & Seasons</h3>
                <p>Current and seasonal weather information to help you plan better</p>
            </div>
            <div className={styles.features__item}>
                <div className={styles.icon}><FaUserCog /></div>
                <h3>Personal Area</h3>
                <p>Save, edit, and organize all your trips in one place</p>
            </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default About



