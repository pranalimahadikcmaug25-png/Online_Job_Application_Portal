import { Link } from 'react-router-dom'
import { Search, Users, Briefcase, TrendingUp } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-6">Find Your Dream Job</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect with top employers and discover opportunities that match your skills and aspirations.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/jobs" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Browse Jobs
          </Link>
          <Link to="/register" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Job Search</h3>
          <p className="text-gray-600">Find jobs that match your skills with our advanced search filters.</p>
        </div>
        <div className="text-center p-6">
          <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Top Employers</h3>
          <p className="text-gray-600">Connect with leading companies looking for talented professionals.</p>
        </div>
        <div className="text-center p-6">
          <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
          <p className="text-gray-600">Take the next step in your career with opportunities for growth.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 rounded-lg p-12">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">1000+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">500+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">5000+</div>
            <div className="text-gray-600">Job Seekers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home