import { useState, useEffect } from "react"
import { HiHome } from "@react-icons/all-files/hi/HiHome"
import { HiUser } from "@react-icons/all-files/hi/HiUser"
import { HiCamera } from "@react-icons/all-files/hi/HiCamera"
import { HiLightningBolt } from "@react-icons/all-files/hi/HiLightningBolt"
import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiMenu } from "@react-icons/all-files/hi/HiMenu"
import { HiX } from "@react-icons/all-files/hi/HiX"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <header className={`bg-[#D6A33E] shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#D6A33E]/95 backdrop-blur-sm' : 'bg-[#D6A33E]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo Section - Optimized */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#111111] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <span className="text-[#D6A33E] font-bold text-lg md:text-xl">HP</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[#111111] font-bold text-lg md:text-xl tracking-wide">PHOTOGRAPHY</div>
              <div className="text-[#111111] text-xs opacity-75 -mt-0.5">Capturing moments</div>
            </div>
            <div className="sm:hidden">
              <span className="text-[#111111] font-bold text-base">PHOTOGRAPHY</span>
            </div>
          </div>
          
          {/* Desktop Navigation - Professional & Compact */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    currentPage === item.key 
                      ? 'text-[#D6A33E] bg-[#111111] shadow-md' 
                      : 'text-[#111111] hover:bg-[#111111]/10 hover:scale-105'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {currentPage === item.key && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#D6A33E] rounded-full"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Tablet Navigation - Compact */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                    currentPage === item.key 
                      ? 'text-[#D6A33E] bg-[#111111] shadow-sm' 
                      : 'text-[#111111] hover:bg-[#111111]/10'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                  
                  {/* Active indicator dot */}
                  {currentPage === item.key && (
                    <div className="w-1.5 h-1.5 bg-[#D6A33E] rounded-full animate-pulse"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button - Compact */}
          <div className="flex items-center md:hidden">
            <button 
              className={`relative p-2 rounded-lg transition-all duration-200 ${
                isMenuOpen 
                  ? 'bg-[#111111] text-[#D6A33E]' 
                  : 'text-[#111111] hover:bg-[#111111]/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiMenu className="w-5 h-5" />
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
    </header>
  )
}

export default Header
