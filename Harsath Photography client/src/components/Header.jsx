import { useState, useEffect } from 'react'

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Navigation items array to avoid duplication
  const navigationItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'about', label: 'About', icon: '👤' },
    { key: 'gallery', label: 'Gallery', icon: '📸' },
    { key: 'services', label: 'Services', icon: '⚡' },
    { key: 'contact', label: 'Contact', icon: '📧' }
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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group flex-shrink-0" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#111111] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-[#D6A33E] font-bold text-xl md:text-2xl">HP</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[#111111] font-bold text-xl md:text-2xl tracking-wide">PHOTOGRAPHY</div>
              <div className="text-[#111111] text-xs md:text-sm opacity-80 -mt-1">Every picture tells a story</div>
            </div>
            <div className="sm:hidden">
              <span className="text-[#111111] font-bold text-lg">PHOTOGRAPHY</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button 
                key={item.key}
                onClick={() => handleNavClick(item.key)} 
                className={`px-6 py-3 mx-1 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                  currentPage === item.key 
                    ? 'text-[#D6A33E] bg-[#111111] shadow-lg transform scale-105' 
                    : 'text-[#111111] hover:bg-[#111111]/15 hover:text-[#111111] hover:scale-105'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navigationItems.map((item) => (
              <button 
                key={item.key}
                onClick={() => handleNavClick(item.key)} 
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all duration-300 ${
                  currentPage === item.key 
                    ? 'text-[#D6A33E] bg-[#111111] shadow-md' 
                    : 'text-[#111111] hover:bg-[#111111]/15 hover:text-[#111111]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              className="text-[#111111] hover:bg-[#111111]/10 p-2 rounded-lg transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-80 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-[#111111]/20 pt-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'text-[#D6A33E] bg-[#111111] shadow-lg transform scale-105' 
                      : 'text-[#111111] hover:bg-[#111111]/10 hover:text-[#111111]/90 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  {currentPage === item.key && (
                    <div className="ml-auto w-2 h-2 bg-[#D6A33E] rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Mobile Contact Info */}
            <div className="mt-6 pt-4 border-t border-[#111111]/20">
              <div className="flex items-center justify-center space-x-6">
                <a 
                  href="tel:+91XXXXXXXXX" 
                  className="text-[#111111] hover:bg-[#111111]/10 p-2 rounded-lg transition-colors"
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
                <a 
                  href="mailto:hello@harsathphotography.com" 
                  className="text-[#111111] hover:bg-[#111111]/10 p-2 rounded-lg transition-colors"
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-[#111111] hover:bg-[#111111]/10 p-2 rounded-lg transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
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
