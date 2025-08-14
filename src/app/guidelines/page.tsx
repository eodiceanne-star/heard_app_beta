import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function GuidelinesPage() {
  const guidelines = [
    'No hate speech or harassment',
    'No medical advice (share experiences, not prescriptions)',
    'Be kind, patient, and understanding',
    'Respect privacy — what\'s shared here stays here'
  ]

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="friendly-interaction" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Our Community Guidelines
        </h1>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-lato text-charcoal leading-relaxed text-center">
            Our community is built on respect, inclusivity, and support.
          </p>
        </div>

        {/* Guidelines list */}
        <div className="space-y-4">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <p className="text-lato text-charcoal leading-relaxed">
                {guideline}
              </p>
            </div>
          ))}
        </div>

        {/* Additional note */}
        <div className="mt-8 p-6 bg-dusty-pink bg-opacity-10 rounded-2xl">
          <p className="text-lato text-charcoal leading-relaxed text-center">
            Remember: This is a safe space for support and connection. We're all here to help each other navigate our healthcare journeys with compassion and understanding.
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
