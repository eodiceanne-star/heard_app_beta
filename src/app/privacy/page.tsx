import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="lock-shield" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Privacy Policy
        </h1>

        {/* Privacy content */}
        <div className="space-y-6 text-lato text-charcoal leading-relaxed">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
              Your Privacy Matters
            </h2>
            <p>
              We believe your personal health information should remain private and secure. Here's how we protect your data:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <h3 className="font-medium text-charcoal mb-2">No Data Sales</h3>
              <p className="text-sm">
                We will never sell your personal information to third parties. Your data stays with us.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <h3 className="font-medium text-charcoal mb-2">Email-Only Signup</h3>
              <p className="text-sm">
                We only require your email address to create an account. No unnecessary personal information is collected.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <h3 className="font-medium text-charcoal mb-2">Limited Sharing</h3>
              <p className="text-sm">
                We only share data with third-party services that are essential for running the app (like hosting and security).
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <h3 className="font-medium text-charcoal mb-2">Account Control</h3>
              <p className="text-sm">
                You can delete your account and all associated data at any time through your account settings.
              </p>
            </div>
          </div>

          <div className="p-6 bg-sage bg-opacity-10 rounded-2xl text-center">
            <p className="text-sm text-charcoal">
              Your trust is important to us. If you have any questions about your privacy, please contact us.
            </p>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
