import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="conversation" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Who We Are
        </h1>

        {/* Body text */}
        <div className="space-y-6 text-lato text-charcoal leading-relaxed">
          <p>
            Heard is a women's healthcare support platform built for those who have been dismissed, misdiagnosed, or left without answers. We combine community connection, tracking tools, and advocacy resources so you can take back control of your health journey.
          </p>
        </div>

        {/* Mission statement */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
            Our Mission
          </h2>
          <p className="text-lato text-charcoal leading-relaxed">
            To create a safe, supportive community where women and marginalized patients can find validation, resources, and connection while navigating their healthcare journey.
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
