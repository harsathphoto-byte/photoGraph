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
import InstagramApiTest from './components/InstagramApiTest'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Function to get page from URL hash
  const getPageFromUrl = () => {
    const hash = window.location.hash.replace('#', '')
    const validPages = ['home', 'about', 'gallery', 'photos', 'services', 'contact', 'login', 'register', 'instagram-test']
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
      case 'services':
        return <ServicesPage />
      case 'contact':
        return <ContactPage />
      case 'instagram-test':
        return <InstagramApiTest />
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

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919843535984?text=Hi! I'm interested in your photography services."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[99999] group w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/30 hover:scale-110 transition-all duration-300 hover:bg-green-600"
          aria-label="Contact via WhatsApp"
        >
          <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
          </svg>
        </a>

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
          style={{ zIndex: 2147483647 }}
          toastStyle={{
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: '1px solid #B8860B',
            zIndex: 2147483647
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
