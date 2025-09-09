import { useState, useEffect, useRef } from "react"
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
import { HiChevronDown } from "@react-icons/all-files/hi/HiChevronDown"
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { useAuth } from '../context/AuthContext'
import MediaUpload from './MediaUpload'

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showGalleryDropdown, setShowGalleryDropdown] = useState(false)
  const [showMobileGalleryDropdown, setShowMobileGalleryDropdown] = useState(false)
  const mobileMenuRef = useRef(null)
  
  const { user, logout, isAuthenticated } = useAuth()

  // Navigation items array with React Icons
  const navigationItems = [
    { key: 'home', label: 'Home', icon: HiHome },
    { key: 'about', label: 'About', icon: HiUser },
    { 
      key: 'gallery', 
      label: 'Gallery', 
      icon: HiCamera,
      hasDropdown: true,
      subItems: [
        { key: 'photos', label: 'Photos', icon: HiPhotograph }
      ]
    },
    { key: 'services', label: 'Services', icon: HiLightningBolt },
    { key: 'contact', label: 'Contact', icon: HiMail }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event) => {
      // Close desktop gallery dropdown when clicking outside
      if (!event.target.closest('.gallery-dropdown') && !event.target.closest('.md\\:hidden')) {
        setShowGalleryDropdown(false)
      }
      
      // Close mobile menu when clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false)
        setShowMobileGalleryDropdown(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleNavClick = (page) => {
    if (page === 'gallery') {
      setShowGalleryDropdown(!showGalleryDropdown)
      return
    }
    setCurrentPage(page)
    setIsMenuOpen(false)
    setShowGalleryDropdown(false)
    setShowMobileGalleryDropdown(false)
  }

  const handleMobileNavClick = (page) => {
    if (page === 'gallery') {
      setShowMobileGalleryDropdown(!showMobileGalleryDropdown)
      return
    }
    setCurrentPage(page)
    setIsMenuOpen(false)
    setShowGalleryDropdown(false)
    setShowMobileGalleryDropdown(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      // Reset dropdown states when opening menu
      setShowMobileGalleryDropdown(false)
    }
  }

  const handleGallerySubClick = (subPage) => {
    setCurrentPage(subPage)
    setIsMenuOpen(false)
    setShowGalleryDropdown(false)
    setShowMobileGalleryDropdown(false)
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
        ? 'h-16 md:h-20 glass-dark backdrop-blur-md border-b border-[#B8860B]/20 shadow-2xl' 
        : 'h-18 md:h-24 bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full py-1 md:py-2 gap-4 md:gap-8">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer group flex-shrink-0 min-w-fit" 
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 glass-golden rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                <span className="text-black font-bold text-base sm:text-lg md:text-xl tracking-wider">HP</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#B8860B]/40 group-hover:border-[#B8860B]/80 transition-colors duration-500"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-semibold text-base sm:text-lg md:text-xl tracking-wide">HARSATH</div>
              <div className="text-[#B8860B] font-medium text-xs md:text-sm tracking-wider -mt-0.5">PHOTOGRAPHY</div>
            </div>
          </div>
          
          {/* Desktop Navigation - Sleek & Modern */}
          <nav className="hidden lg:flex items-center space-x-8 ml-auto">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              
              if (item.hasDropdown) {
                return (
                  <div key={item.key} className="relative group gallery-dropdown">
                    <button 
                      onClick={() => handleNavClick(item.key)} 
                      className={`group relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                        ['gallery', 'photos'].includes(currentPage)
                          ? 'text-[#B8860B] bg-[#B8860B]/10 border border-[#B8860B]/30' 
                          : 'text-white/90 hover:text-[#B8860B] hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                      <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        showGalleryDropdown ? 'rotate-180' : ''
                      }`} />
                      
                      {/* Active indicator */}
                      {['gallery', 'photos'].includes(currentPage) && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#B8860B] rounded-full"></div>
                      )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-48 bg-[#111111] rounded-lg shadow-xl border border-[#B8860B]/20 overflow-hidden transform transition-all duration-200 origin-top z-50 ${
                      showGalleryDropdown 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 -translate-y-1 pointer-events-none'
                    }`}>
                      {item.subItems.map((subItem) => {
                        const SubIconComponent = subItem.icon
                        return (
                          <button
                            key={subItem.key}
                            onClick={() => handleGallerySubClick(subItem.key)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-150 hover:bg-[#B8860B]/10 ${
                              currentPage === subItem.key 
                                ? 'bg-[#B8860B]/15 text-[#B8860B] border-r-2 border-[#B8860B]' 
                                : 'text-white hover:text-[#B8860B]'
                            }`}
                          >
                            <SubIconComponent className="w-4 h-4" />
                            <span className="font-medium text-sm">{subItem.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                    currentPage === item.key 
                      ? 'text-[#B8860B] bg-[#B8860B]/10 border border-[#B8860B]/30' 
                      : 'text-white/90 hover:text-[#B8860B] hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {currentPage === item.key && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#B8860B] rounded-full"></div>
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
                      className="flex items-center space-x-2 px-3 py-2 bg-[#B8860B] text-black rounded-lg font-medium text-sm hover:bg-[#DAA520] transition-all duration-300"
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
                      <div className="text-[#B8860B] text-xs">
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
                    className="px-4 py-2 text-white/90 hover:text-[#B8860B] font-medium text-sm transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-[#B8860B] text-black rounded-lg font-medium text-sm hover:bg-[#DAA520] transition-all duration-300"
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
              
              if (item.hasDropdown) {
                return (
                  <div key={item.key} className="relative group gallery-dropdown">
                    <button 
                      onClick={() => handleNavClick(item.key)} 
                      className={`group relative p-2 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                        ['gallery', 'wedding', 'baby-shower', 'fashion', 'newborn', 'traditional'].includes(currentPage)
                          ? 'text-[#B8860B] bg-[#B8860B]/10' 
                          : 'text-white/80 hover:text-[#B8860B] hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        showGalleryDropdown ? 'rotate-180' : ''
                      }`} />
                      {['gallery', 'photos'].includes(currentPage) && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#B8860B] rounded-full"></div>
                      )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-40 bg-[#111111] rounded-lg shadow-xl border border-[#B8860B]/20 overflow-hidden transform transition-all duration-200 origin-top z-50 ${
                      showGalleryDropdown 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 -translate-y-1 pointer-events-none'
                    }`}>
                      {item.subItems.map((subItem) => {
                        const SubIconComponent = subItem.icon
                        return (
                          <button
                            key={subItem.key}
                            onClick={() => handleGallerySubClick(subItem.key)}
                            className={`w-full flex items-center space-x-2 px-3 py-2 text-left transition-all duration-150 hover:bg-[#B8860B]/10 ${
                              currentPage === subItem.key 
                                ? 'bg-[#B8860B]/15 text-[#B8860B]' 
                                : 'text-white hover:text-[#B8860B]'
                            }`}
                          >
                            <SubIconComponent className="w-4 h-4" />
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              
              return (
                <button 
                  key={item.key}
                  onClick={() => handleNavClick(item.key)} 
                  className={`group relative p-2 rounded-lg transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'text-[#B8860B] bg-[#B8860B]/10' 
                      : 'text-white/80 hover:text-[#B8860B] hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {currentPage === item.key && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#B8860B] rounded-full"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button - Enhanced */}
          <button 
            className={`md:hidden mobile-menu-button relative p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
              isMenuOpen 
                ? 'bg-[#B8860B] text-black' 
                : 'text-white hover:bg-white/10 hover:text-[#B8860B]'
            }`}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
            type="button"
            style={{ minWidth: '36px', minHeight: '36px' }}
          >
            <span className="flex items-center justify-center pointer-events-none">
              {isMenuOpen ? (
                <HiX className="w-5 h-5 pointer-events-none" />
              ) : (
                <HiMenu className="w-5 h-5 pointer-events-none" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Popup - Professional & Compact */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden absolute right-4 top-full mt-1 w-56 bg-[#111111] rounded-lg shadow-xl border border-[#B8860B]/20 overflow-hidden transform transition-all duration-200 origin-top-right z-50 ${
            isMenuOpen 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-95 opacity-0 -translate-y-1 pointer-events-none'
          }`}
        >
          {/* Popup Arrow */}
          <div className="absolute -top-1 right-5 w-3 h-3 bg-[#111111] border-l border-t border-[#B8860B]/20 transform rotate-45"></div>
          
          <div className="py-1">
            {/* Navigation Items */}
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon
              
              if (item.hasDropdown) {
                return (
                  <div key={item.key}>
                    <button 
                      onClick={() => handleMobileNavClick(item.key)} 
                      className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-left transition-all duration-150 hover:bg-[#B8860B]/10 group ${
                        ['gallery', 'photos'].includes(currentPage)
                          ? 'bg-[#B8860B]/15 text-[#B8860B] border-r-2 border-[#B8860B]' 
                          : 'text-white hover:text-[#B8860B]'
                      }`}
                    >
                      {/* Icon Container */}
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 ${
                        ['gallery', 'photos'].includes(currentPage)
                          ? 'bg-[#B8860B] text-[#111111]' 
                          : 'bg-[#B8860B]/20 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-[#111111]'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      
                      {/* Text */}
                      <span className="font-medium text-sm flex-1">{item.label}</span>
                      
                      {/* Dropdown Icon */}
                      <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        showMobileGalleryDropdown ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Submenu Items */}
                    {showMobileGalleryDropdown && (
                      <div className="pl-4 border-l-2 border-[#B8860B]/20 ml-3">
                        {item.subItems.map((subItem) => {
                          const SubIconComponent = subItem.icon
                          return (
                            <button
                              key={subItem.key}
                              onClick={() => handleGallerySubClick(subItem.key)}
                              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-left transition-all duration-150 hover:bg-[#B8860B]/10 group ${
                                currentPage === subItem.key 
                                  ? 'bg-[#B8860B]/15 text-[#B8860B] border-r-2 border-[#B8860B]' 
                                  : 'text-white/80 hover:text-[#B8860B]'
                              }`}
                            >
                              {/* Sub Icon Container */}
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-150 ${
                                currentPage === subItem.key 
                                  ? 'bg-[#B8860B] text-[#111111]' 
                                  : 'bg-[#B8860B]/10 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-[#111111]'
                              }`}>
                                <SubIconComponent className="w-3 h-3" />
                              </div>
                              
                              {/* Text */}
                              <span className="font-medium text-sm">{subItem.label}</span>
                              
                              {/* Active Indicator */}
                              {currentPage === subItem.key && (
                                <div className="ml-auto">
                                  <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full"></div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <button 
                  key={item.key}
                  onClick={() => handleMobileNavClick(item.key)} 
                  className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-left transition-all duration-150 hover:bg-[#B8860B]/10 group ${
                    currentPage === item.key 
                      ? 'bg-[#B8860B]/15 text-[#B8860B] border-r-2 border-[#B8860B]' 
                      : 'text-white hover:text-[#B8860B]'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 ${
                    currentPage === item.key 
                      ? 'bg-[#B8860B] text-[#111111]' 
                      : 'bg-[#B8860B]/20 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-[#111111]'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  {/* Text */}
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {currentPage === item.key && (
                    <div className="ml-auto">
                      <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full"></div>
                    </div>
                  )}
                </button>
              )
            })}
            
            {/* Divider */}
            <div className="my-1 mx-3 border-t border-[#B8860B]/20"></div>
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-[#B8860B] text-xs font-medium mb-2">Account</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-[#B8860B] text-xs">
                        {user?.role}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {user && ['photographer', 'admin'].includes(user.role) && (
                      <button
                        onClick={handleUploadClick}
                        className="w-full flex items-center space-x-2 px-2 py-1.5 bg-[#B8860B] text-black rounded-md text-sm font-medium hover:bg-[#DAA520] transition-all duration-150"
                      >
                        <HiPlus className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-2 py-1.5 bg-gray-600/20 text-gray-400 rounded-md text-sm font-medium hover:bg-gray-600/30 transition-all duration-150"
                    >
                      <HiLogout className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-3 py-2">
                <p className="text-[#B8860B] text-xs font-medium mb-2">Account</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full flex items-center justify-center px-2 py-1.5 bg-[#B8860B]/10 text-[#B8860B] rounded-md text-sm font-medium hover:bg-[#B8860B]/20 transition-all duration-150"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full flex items-center justify-center px-2 py-1.5 bg-[#B8860B] text-black rounded-md text-sm font-medium hover:bg-[#DAA520] transition-all duration-150"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            
            {/* Divider */}
            <div className="my-1 mx-3 border-t border-[#B8860B]/20"></div>
            
            {/* Quick Actions */}
            <div className="px-3 py-2">
              <p className="text-[#B8860B] text-xs font-medium mb-2">Quick Contact</p>
              <div className="flex space-x-1.5">
                <a 
                  href="tel:+919843535984" 
                  className="flex-1 flex items-center justify-center p-2 bg-[#B8860B]/10 rounded-md text-[#B8860B] hover:bg-[#B8860B] hover:text-[#111111] transition-all duration-150 group"
                  aria-label="Call us"
                >
                  <HiPhone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="mailto:harsathphotography@gmail.com" 
                  className="flex-1 flex items-center justify-center p-2 bg-[#B8860B]/10 rounded-md text-[#B8860B] hover:bg-[#B8860B] hover:text-[#111111] transition-all duration-150 group"
                  aria-label="Email us"
                >
                  <HiMail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Media Upload Modal */}
      <MediaUpload
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={() => {
          console.log('✅ Upload successful - gallery will auto-refresh via event');
        }}
      />
    </header>
  )
}

export default Header
