import { Target, Users, Award, Heart } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're dedicated to connecting talented professionals with their dream careers and helping companies find the perfect candidates.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-white rounded-lg shadow p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To revolutionize the job search experience by creating meaningful connections between job seekers and employers through innovative technology and personalized service.
            </p>
            <p className="text-gray-600">
              We believe that everyone deserves to find work they love, and every company deserves to find the right talent to grow their business.
            </p>
          </div>
          <div className="text-center">
            <Target className="h-32 w-32 text-blue-600 mx-auto" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">People First</h3>
            <p className="text-gray-600">We put people at the center of everything we do, ensuring a human touch in our digital platform.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">We strive for excellence in our platform, service, and the connections we facilitate.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-600">We operate with transparency, honesty, and respect for all our users.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Story</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-6">
            Founded in 2024, our Online Job Application Portal was born from the vision of making job searching and hiring more efficient, transparent, and accessible for everyone.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our team of experienced professionals from HR, technology, and business backgrounds came together to create a platform that addresses the real challenges faced by both job seekers and employers.
          </p>
          <p className="text-lg text-gray-600">
            Today, we're proud to serve thousands of users and continue to innovate in the recruitment technology space.
          </p>
        </div>
      </section>
    </div>
  )
}

export default AboutUs