import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  Home, 
  Briefcase, 
  Heart, 
  User, 
  Building, 
  Shield,
  X 
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'About Us', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: User },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard', icon: User },
      { name: 'Saved Jobs', href: '/saved-jobs', icon: Heart },
    ] : []),
    ...(user?.role === 'EMPLOYER' ? [
      { name: 'Employer Dashboard', href: '/employer/dashboard', icon: Building },
    ] : []),
    ...(user?.role === 'ADMIN' ? [
      { name: 'Admin Dashboard', href: '/admin/dashboard', icon: Shield },
    ] : []),
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <span className="text-xl font-bold text-blue-600">JobPortal</span>
          <button onClick={onClose} className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar