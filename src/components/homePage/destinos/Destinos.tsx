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
        </div>
    </section>

    </>
  )
}

export default Destinos