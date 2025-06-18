import UserItineraries from "@/components/userPage/UserItineraries";
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import './user.scss'

export default function DashboardPage() {
 
  return (
    <>
    <Header />
    <main>
     <section className="section user-area">
          <div className="container">
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
