import UserItineraries from "@/components/userPage/userItineraries/UserItineraries";
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import './user.scss'


   
export default function DashboardPage() {
 
  return (
    <>
    <Header />
    <main>
     <section className="section user-area" style={{background: "white"}}>
          <div className="container">
              <div className="header">
                <h2>Your personal area</h2>
                <p>Manage all your trips from one place</p>
              </div>
              
              <div className="user-area__tabs">
                  <button className="tab active">My Itineraries</button>
               

              </div>
              
              <div className="user-area__content">
                  <div className="trip-list">
                       <UserItineraries />
                  </div>
              </div>
          </div>
      </section>
    </main>

    <Footer />
    </>
    
  );
}
