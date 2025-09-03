import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Context
import { AuthProvider } from './context/AuthContext'

// Configuration
import { config } from './config/env'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import GalleryPage from './pages/GalleryPageNew'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Function to get page from URL hash
  const getPageFromUrl = () => {
    const hash = window.location.hash.replace('#', '')
    const validPages = ['home', 'about', 'gallery', 'photos', 'videos', 'services', 'contact', 'login', 'register']
    return validPages.includes(hash) ? hash : 'home'
  }

  // Function to update URL hash when page changes
  const updateUrlHash = (page) => {
    window.location.hash = page === 'home' ? '' : page
  }

  useEffect(() => {
    // Set current page from URL on load
    const pageFromUrl = getPageFromUrl()
    setCurrentPage(pageFromUrl)
    
    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const page = getPageFromUrl()
      setCurrentPage(page)
      // Scroll to top when hash changes (back/forward navigation)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Enhanced setCurrentPage function that updates URL
  const setCurrentPageWithUrl = (page) => {
    setCurrentPage(page)
    updateUrlHash(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const updateScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY
      setScrollProgress((currentProgress / totalScroll) * 100)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPageWithUrl} />
      case 'about':
        return <About />
      case 'gallery':
        return <GalleryPage />
      case 'photos':
        return <GalleryPage initialSection="photos" />
      case 'videos':
        return <GalleryPage initialSection="videos" />
      case 'services':
        return <ServicesPage />
      case 'contact':
        return <ContactPage />
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPageWithUrl} />
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPageWithUrl} />
      default:
        return <Home setCurrentPage={setCurrentPageWithUrl} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-24 h-24 bg-[#B8860B] rounded-full flex items-center justify-center mb-8 mx-auto animate-pulse">
              <span className="text-[#111111] font-bold text-3xl">HP</span>
            </div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-[#B8860B]/30 rounded-full animate-spin border-t-[#B8860B] mx-auto"></div>
          </div>
          
          <h2 className="text-[#B8860B] text-2xl font-bold mb-2">{config.APP_NAME}</h2>
          <p className="text-gray-300">Loading your visual experience...</p>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-[#1a1a1a] rounded-full mx-auto mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#111111] text-white relative overflow-x-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#B8860B] rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#B8860B] rounded-full blur-3xl translate-x-48"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#B8860B] rounded-full blur-3xl translate-y-48"></div>
        </div>
        
        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-[#1a1a1a] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] transition-all duration-100 ease-out"
            style={{
              width: `${scrollProgress}%`
            }}
          ></div>
        </div>

        <Header currentPage={currentPage} setCurrentPage={setCurrentPageWithUrl} />
        
        <main className="relative z-10">
          <div className="transition-all duration-500 ease-in-out">
            {renderPage()}
          </div>
        </main>
        
        <Footer />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: '1px solid #B8860B'
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
