import TrailLine from '../components/TrailLine.jsx'
import Hero from '../components/Hero.jsx'
import FeaturedTravessia from '../components/FeaturedTravessia.jsx'
import TourGrid from '../components/TourGrid.jsx'
import About from '../components/About.jsx'
import Reviews from '../components/Reviews.jsx'
import BookingForm from '../components/BookingForm.jsx'
import FAQ from '../components/FAQ.jsx'

export default function Home() {
  return (
    <main className="relative">
      {/* linha da trilha desenhada no scroll, atrás do conteúdo */}
      <TrailLine />
      <Hero />
      <FeaturedTravessia />
      <TourGrid />
      <About />
      <Reviews />
      <BookingForm />
      <FAQ />
    </main>
  )
}
