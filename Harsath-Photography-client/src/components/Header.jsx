import { useState, useEffect } from "react"
import { HiHome } from "@react-icons/all-files/hi/HiHome"
import { HiUser } from "@react-icons/all-files/hi/HiUser"
import { HiCamera } from "@react-icons/all-files/hi/HiCamera"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"
import { HiLightningBolt } from "@react-icons/all-files/hi/HiLightningBolt"
import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiMenu } from "@react-icons/all-files/hi/HiMenu"
import { HiX } from "@react-icons/all-files/hi/HiX"
import { HiPlus } from "@react-icons/all-files/hi/HiPlus"
import { HiLogout } from "@react-icons/all-files/hi/HiLogout"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { useAuth } from '../context/AuthContext'
import PhotoUpload from './PhotoUpload'

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  
  const { user, logout, isAuthenticated } = useAuth()

  // Navigation items array with React Icons
  const navigationItems = [
    { key: 'home', label: 'Home', icon: HiHome },
    { key: 'about', label: 'About', icon: HiUser },
    { key: 'gallery', label: 'Gallery', icon: HiCamera },
    { key: 'services', label: 'Services', icon: HiLightningBolt },
    { key: 'contact', label: 'Contact', icon: HiMail }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
  }

  const handleAuthClick = (mode) => {
    setCurrentPage(mode)
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const handleUploadClick = () => {
    setShowUploadModal(true)
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'h-20 glass-dark backdrop-blur-md border-b border-[#D6A33E]/20 shadow-2xl' 
        : 'h-24 bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full py-2 gap-8">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0 min-w-fit" 
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 glass-golden rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                <span className="text-black font-bold text-lg sm:text-xl tracking-wider">HP</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#D6A33E]/40 group-hover:border-[#D6A33E]/80 transition-colors duration-500"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-semibold text-lg sm:text-xl tracking-wide">HARSATH</div>
              <div className="text-[#D6A33E] font-medium text-xs sm:text-sm tracking-wider -mt-0.5">PHOTOGRAPHY</div>
            </div>
          </div>
          
          {/* Desktop Navigation - Sleek & Modern */}
          <nav className="hidden lg:flex items-center space-x-8 ml-auto">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                    currentPage === item.key 
                      ? 'text-[#D6A33E] bg-[#D6A33E]/10 border border-[#D6A33E]/30' 
                      : 'text-white/90 hover:text-[#D6A33E] hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {currentPage === item.key && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D6A33E] rounded-full"></div>
                  )}
                </button>
              )
            })}
            
            {/* Authentication & Upload Section */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/10">
              {isAuthenticated ? (
                <>
                  {/* Upload Button (for admins only) */}
                  {user && user.role === 'admin' && (
                    <button
                      onClick={handleUploadClick}
                      className="flex items-center space-x-2 px-3 py-2 bg-[#D6A33E] text-black rounded-lg font-medium text-sm hover:bg-[#c1922f] transition-all duration-300"
                    >
                      <HiPlus className="w-4 h-4" />
                      <span>Upload</span>
                    </button>
                  )}
                  
                  {/* User Menu */}
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-[#D6A33E] text-xs">
                        {user?.role}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-white/80 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-300"
                      title="Logout"
                    >
                      <HiLogout className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-white/90 hover:text-[#D6A33E] font-medium text-sm transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-[#D6A33E] text-black rounded-lg font-medium text-sm hover:bg-[#c1922f] transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Tablet Navigation - Compact & Clean */}
          <nav className="hidden md:flex lg:hidden items-center space-x-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative p-2 rounded-lg transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'text-[#D6A33E] bg-[#D6A33E]/10' 
                      : 'text-white/80 hover:text-[#D6A33E] hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {currentPage === item.key && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D6A33E] rounded-full"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button - Enhanced */}
          <div className="flex items-center md:hidden">
            <button 
              className={`relative p-3 rounded-lg transition-all duration-300 ${
                isMenuOpen 
                  ? 'bg-[#D6A33E] text-black' 
                  : 'text-white hover:bg-white/10 hover:text-[#D6A33E]'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Popup - Professional & Compact */}
        <div className={`md:hidden absolute right-4 top-full mt-1 w-56 bg-[#111111] rounded-lg shadow-xl border border-[#D6A33E]/20 overflow-hidden transform transition-all duration-200 origin-top-right z-50 ${
          isMenuOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 -translate-y-1 pointer-events-none'
        }`}>
          {/* Popup Arrow */}
          <div className="absolute -top-1 right-5 w-3 h-3 bg-[#111111] border-l border-t border-[#D6A33E]/20 transform rotate-45"></div>
          
          <div className="py-1">
            {/* Navigation Items */}
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-left transition-all duration-150 hover:bg-[#D6A33E]/10 group ${
                    currentPage === item.key 
                      ? 'bg-[#D6A33E]/15 text-[#D6A33E] border-r-2 border-[#D6A33E]' 
                      : 'text-white hover:text-[#D6A33E]'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 ${
                    currentPage === item.key 
                      ? 'bg-[#D6A33E] text-[#111111]' 
                      : 'bg-[#D6A33E]/20 text-[#D6A33E] group-hover:bg-[#D6A33E] group-hover:text-[#111111]'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  {/* Text */}
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {currentPage === item.key && (
                    <div className="ml-auto">
                      <div className="w-1.5 h-1.5 bg-[#D6A33E] rounded-full"></div>
                    </div>
                  )}
                </button>
              )
            })}
            
            {/* Divider */}
            <div className="my-1 mx-3 border-t border-[#D6A33E]/20"></div>
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-[#D6A33E] text-xs font-medium mb-2">Account</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-[#D6A33E] text-xs">
                        {user?.role}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {user && ['photographer', 'admin'].includes(user.role) && (
                      <button
                        onClick={handleUploadClick}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 bg-[#D6A33E] text-black rounded-md text-sm font-medium hover:bg-[#c1922f] transition-all duration-150"
                      >
                        <HiPlus className="w-4 h-4" />
                        <span>Upload Photo</span>
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-2 py-1.5 bg-red-600/20 text-red-400 rounded-md text-sm font-medium hover:bg-red-600/30 transition-all duration-150"
                    >
                      <HiLogout className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-3 py-2">
                <p className="text-[#D6A33E] text-xs font-medium mb-2">Account</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full flex items-center justify-center px-2 py-1.5 bg-[#D6A33E]/10 text-[#D6A33E] rounded-md text-sm font-medium hover:bg-[#D6A33E]/20 transition-all duration-150"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full flex items-center justify-center px-2 py-1.5 bg-[#D6A33E] text-black rounded-md text-sm font-medium hover:bg-[#c1922f] transition-all duration-150"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            
            {/* Divider */}
            <div className="my-1 mx-3 border-t border-[#D6A33E]/20"></div>
            
            {/* Quick Actions */}
            <div className="px-3 py-2">
              <p className="text-[#D6A33E] text-xs font-medium mb-2">Quick Contact</p>
              <div className="flex space-x-1.5">
                <a 
                  href="tel:+91XXXXXXXXX" 
                  className="flex-1 flex items-center justify-center p-2 bg-[#D6A33E]/10 rounded-md text-[#D6A33E] hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-150 group"
                  aria-label="Call us"
                >
                  <HiPhone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="mailto:hello@harsathphotography.com" 
                  className="flex-1 flex items-center justify-center p-2 bg-[#D6A33E]/10 rounded-md text-[#D6A33E] hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-150 group"
                  aria-label="Email us"
                >
                  <HiMail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="flex-1 flex items-center justify-center p-2 bg-[#D6A33E]/10 rounded-md text-[#D6A33E] hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-150 group"
                  aria-label="Follow on Instagram"
                >
                  <FaInstagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Photo Upload Modal */}
      <PhotoUpload
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={() => {
          // Refresh gallery if we're on gallery page
          if (currentPage === 'gallery') {
            window.location.reload()
          }
        }}
      />
    </header>
  )
}

export default Header
