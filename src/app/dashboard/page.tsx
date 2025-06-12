import UserItineraries from "@/components/userPage/userItineraries/UserItineraries";
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
export default function DashboardPage() {
  return (
    <>
    <Header />
    <main>
      <UserItineraries />
    </main>
    <Footer />
    </>
    
  );
}
