import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="group-support" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Welcome to Heard
        </h1>

        {/* Body text */}
        <div className="space-y-6 text-lato text-charcoal leading-relaxed">
          <p>
            If you've ever been told "it's all in your head" or felt brushed aside by a rushed appointment, you're not alone. Heard was built for women and marginalized patients navigating chronic illness, misdiagnosis, delayed diagnosis, and the frustration of medical gaslighting.
          </p>
          
          <p>
            Here, you can track your symptoms, connect with others who've been through the same struggles, and find scripts and resources to help you speak confidently at appointments. Heard is your safe space to feel validated, supported, and empowered — no matter where you are in your healthcare journey.
          </p>
        </div>

        {/* Call to action */}
        <div className="mt-8 text-center">
          <button className="bg-dusty-pink text-white px-8 py-3 rounded-2xl font-medium hover:bg-opacity-90 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
