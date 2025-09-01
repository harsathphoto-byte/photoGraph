import { useState, useEffect } from 'react'
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiCamera } from "@react-icons/all-files/hi/HiCamera"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { HiCollection } from "@react-icons/all-files/hi/HiCollection"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiChevronLeft } from "@react-icons/all-files/hi/HiChevronLeft"
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight"
import { HiStar } from "@react-icons/all-files/hi/HiStar"

// 3D Rotating Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: "Priya & Rajesh",
      event: "Wedding",
      rating: 5,
      text: "Harsath captured our wedding so beautifully! Every moment was perfectly preserved. The quality of photos and videos exceeded our expectations. Highly recommended!",
      image: "https://picsum.photos/80/80?random=1"
    },
    {
      id: 2,
      name: "Anjali Sharma",
      event: "Baby Shoot",
      rating: 5,
      text: "Amazing experience with the baby photoshoot. Harsath was so patient and creative. The photos came out absolutely stunning and we'll treasure them forever.",
      image: "https://picsum.photos/80/80?random=2"
    },
    {
      id: 3,
      name: "Vikram & Meera",
      event: "Engagement",
      rating: 5,
      text: "Professional, creative, and friendly! Our engagement photos were beyond perfect. The editing quality and attention to detail is remarkable. Thank you Harsath!",
      image: "https://picsum.photos/80/80?random=3"
    },
    {
      id: 4,
      name: "Karthik Family",
      event: "Family Portrait",
      rating: 5,
      text: "Fantastic photographer! Captured our family moments beautifully. The whole experience was smooth and enjoyable. Definitely booking again for future events.",
      image: "https://picsum.photos/80/80?random=4"
    },
    {
      id: 5,
      name: "Divya & Arjun",
      event: "Pre-Wedding",
      rating: 5,
      text: "Harsath made our pre-wedding shoot so special! Creative ideas, perfect timing, and amazing results. The photos tell our love story perfectly. Absolutely loved it!",
      image: "https://picsum.photos/80/80?random=5"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isTransitioning, currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 350)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setTimeout(() => {
        setIsTransitioning(false)
        setTimeout(() => setIsAutoPlaying(true), 8000)
      }, 100)
    }, 350)
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
        setTimeout(() => setIsAutoPlaying(true), 8000)
      }, 100)
    }, 350)
  }

  // Get positions for 3D carousel effect
  const getCardPosition = (index) => {
    const diff = (index - currentIndex + testimonials.length) % testimonials.length
    
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === testimonials.length - 1) return 'left'
    return 'hidden'
  }

  const getTransform = (position, index) => {
    switch (position) {
      case 'center':
        return 'translateX(0) scale(1) rotateY(0deg)'
      case 'right':
        return 'translateX(280px) scale(0.85) rotateY(-25deg)'
      case 'left':
        return 'translateX(-280px) scale(0.85) rotateY(25deg)'
      default:
        return 'translateX(600px) scale(0.7) rotateY(-45deg)'
    }
  }

  const getZIndex = (position) => {
    switch (position) {
      case 'center': return 30
      case 'right':
      case 'left': return 20
      default: return 10
    }
  }

  const getOpacity = (position) => {
    switch (position) {
      case 'center': return 1
      case 'right':
      case 'left': return 0.7
      default: return 0
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/90 rounded-3xl p-8 lg:p-12 border border-[#D6A33E]/30 shadow-2xl max-w-7xl mx-auto mb-12">
      <h4 className="text-[#D6A33E] text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">
        What Our Clients Say
      </h4>
      
      <div className="relative h-96 lg:h-80 flex items-center justify-center overflow-visible" style={{ perspective: '1200px' }}>
        {testimonials.map((testimonial, index) => {
          const position = getCardPosition(index)
          
          return (
            <div
              key={testimonial.id}
              className="absolute w-80 lg:w-96 h-64 lg:h-72 transition-all duration-700 ease-out cursor-pointer"
              style={{
                transform: getTransform(position, index),
                zIndex: getZIndex(position),
                opacity: getOpacity(position),
                transformStyle: 'preserve-3d'
              }}
              onClick={() => position !== 'center' && goToSlide(index)}
            >
              <div className={`w-full h-full rounded-2xl p-6 lg:p-8 border-2 backdrop-blur-sm shadow-2xl transition-all duration-700 ${
                position === 'center' 
                  ? 'bg-gradient-to-br from-[#D6A33E]/30 to-[#c1922f]/30 border-[#D6A33E]/60 shadow-[#D6A33E]/30' 
                  : 'bg-gradient-to-br from-[#D6A33E]/15 to-[#c1922f]/15 border-[#D6A33E]/30 shadow-black/40'
              }`}>
                <div className="flex flex-col items-center space-y-4 h-full">
                  {/* Client Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-[#D6A33E] shadow-lg"
                    />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <HiStar key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-[#D6A33E]" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed text-center italic flex-1 overflow-hidden line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="text-center">
                    <h5 className="text-[#D6A33E] font-bold text-base lg:text-lg">
                      {testimonial.name}
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {testimonial.event}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#D6A33E]/80 hover:bg-[#D6A33E] text-[#111111] p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#D6A33E]/80 hover:bg-[#D6A33E] text-[#111111] p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentIndex 
                ? 'bg-[#D6A33E] scale-125 shadow-lg shadow-[#D6A33E]/50' 
                : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <div className="text-gray-500 text-xs">
          {isAutoPlaying ? '🔄 Auto-rotating' : '⏸️ Paused'} • Click side cards or arrows to navigate
        </div>
      </div>
    </div>
  )
}

const Hero = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCategoryClick = (category) => {
    // Store the selected category and navigate to gallery
    if (setCurrentPage) {
      // We'll use the photos section by default when coming from home page
      setCurrentPage('photos')
      // Store the category in localStorage temporarily to pass to Gallery
      localStorage.setItem('selectedCategory', category)
    }
  }

  return (
    <>
      {/* Clean Layout - Removing Duplicate Header */}
      <section className="bg-[#111111] min-h-screen px-4 sm:px-6 lg:px-12 xl:px-16 pb-6 pt-32 lg:pt-40 relative">
        
        {/* Hero Sparkle Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Enhanced Random Sprinkles */}
          <div className="sprinkles">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="sprinkle" style={{ 
                left: `${(i * 2.8) % 100}%`, 
                animationDelay: `${i * 0.2}s`,
                top: `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
          
          {/* Enhanced Floating Particles */}
          <div className="floating-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="particle" style={{ 
                animationDelay: `${i * 1.8}s`,
                left: `${5 + (i * 6) % 90}%`,
                top: `${10 + (i * 5) % 80}%`
              }}></div>
            ))}
          </div>
        </div>
        
        {/* Professional Hero Section - Enhanced Layout */}
        <div className="text-center mb-16 lg:mb-20 max-w-6xl mx-auto animate-fadeInUp3D">
          <div className="flex flex-col items-center mb-12">
            <div className="perspective-container mb-8">
              <div className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-[#D6A33E] mb-6 hover:border-[#c1922f] transition-all duration-300 shadow-2xl hover-lift animate-float3D glass-golden">
                <img 
                  src="https://picsum.photos/160/160?random=6" 
                  alt="Harsath - Photographer" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 animate-slideIn3D animate-delay-100 tracking-wide">
                HARSATH
              </h1>
              <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-6"></div>
              <p className="text-[#D6A33E] text-lg lg:text-xl xl:text-2xl font-light mb-8 animate-slideIn3D animate-delay-200 tracking-wider">
                PHOTOGRAPHY
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-[#D6A33E] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight animate-slideIn3D animate-delay-300 tracking-wide">
              Capturing Timeless Moments
            </h2>
            <div className="w-16 h-0.5 bg-[#D6A33E] mx-auto"></div>
            <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed px-4 lg:px-0 animate-slideIn3D animate-delay-400 font-light max-w-3xl mx-auto">
              In the bustling city of Coimbatore, wedding photography finds its muse in timeless traditions and vibrant celebrations. With over 8 years of experience, our studio has been privileged to document countless love stories.
            </p>
          </div>
        </div>

        {/* Clean Video Section */}
        <div className="mb-10 max-w-5xl mx-auto animate-fadeInUp3D animate-delay-200">
          <div className="relative">
            {/* Video container with clean styling */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-black border-2 border-[#D6A33E]/30">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="https://picsum.photos/1200/675?random=7"
                >
                  <source src="/path/to/your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          {/* Centered Explore Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => {
                setCurrentPage('gallery')
                // Set a flag to show videos section
                setTimeout(() => {
                  const event = new CustomEvent('setGallerySection', { detail: 'videos' })
                  window.dispatchEvent(event)
                }, 100)
              }}
              className="bg-[#D6A33E] text-[#111111] px-12 py-4 lg:px-16 lg:py-5 rounded-full font-light text-lg lg:text-xl flex items-center space-x-3 mx-auto hover:bg-[#c1922f] transition-all duration-300 shadow-lg"
            >
              <HiPhotograph className="w-6 h-6 lg:w-7 lg:h-7" />
              <span>Explore Photography</span>
            </button>
          </div>
        </div>

        {/* Categories Section - Full Width */}
        <div className="glass-dark rounded-3xl p-8 lg:p-12 border border-[#D6A33E]/30 shadow-2xl max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-300 relative">
          {/* Categories Sparkle Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-3xl">
            <div className="sprinkles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="sprinkle" style={{ 
                  left: `${(i * 4.5) % 100}%`, 
                  animationDelay: `${i * 0.25}s`
                }}></div>
              ))}
            </div>
          </div>
          
          <h4 className="text-[#D6A33E] text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center animate-slideIn3D relative z-20">Categories</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Wedding', category: 'wedding' },
              { name: 'Baby Shower', category: 'baby-shower' },
              { name: 'Fashion', category: 'fashion' },
              { name: 'New Born', category: 'newborn' },
              { name: 'Traditional', category: 'traditional' }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100}`}
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-3 border-[#D6A33E]/60 group-hover:border-[#D6A33E] transition-all duration-500 glass-golden flex items-center justify-center group-hover:from-[#D6A33E]/70 group-hover:to-[#D6A33E]/90 hover-lift shadow-xl group-hover:shadow-2xl group-hover:shadow-[#D6A33E]/30 perspective-container">
                  <div className="text-center transform-3d">
                    <img 
                      src={`https://picsum.photos/120/120?random=${index + 8}`}
                      alt={category.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg mx-auto mb-2 hover-tilt"
                    />
                    <span className="text-white font-bold text-sm lg:text-base text-center group-hover:text-[#D6A33E] transition-colors leading-tight">
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button 
              className="bg-[#D6A33E] text-[#111111] px-10 py-4 lg:px-14 lg:py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-[#c1922f] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#D6A33E]/40 border-2 border-[#D6A33E]/50 hover-lift animate-pulse3D"
              onClick={() => {
                setCurrentPage('gallery')
                // Set a flag to show photos section
                setTimeout(() => {
                  const event = new CustomEvent('setGallerySection', { detail: 'photos' })
                  window.dispatchEvent(event)
                }, 100)
              }}
            >
              More →
            </button>
          </div>
        </div>

        {/* Professional Achievements Section */}
        <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-500 relative">
          {/* Achievements Sparkle Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-2xl">
            <div className="sprinkles">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="sprinkle" style={{ 
                  left: `${(i * 6.2) % 100}%`, 
                  animationDelay: `${i * 0.35}s`
                }}></div>
              ))}
            </div>
            <div className="floating-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="particle" style={{ 
                  animationDelay: `${i * 2.5}s`,
                  left: `${10 + (i * 10) % 80}%`
                }}></div>
              ))}
            </div>
          </div>
          
          <div className="text-center mb-12 relative z-20">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#D6A33E] mb-6 tracking-wider">OUR ACHIEVEMENTS</h4>
            <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Couples' },
              { number: '8+', label: 'Years Experience' },
              { number: '200+', label: 'Wedding Events' },
              { number: '50+', label: 'Awards Won' }
            ].map((stat, index) => (
              <div key={index} className={`text-center glass-dark rounded-xl p-6 lg:p-8 hover-lift animate-pulse3D animate-delay-${(index + 1) * 100}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#D6A33E] mb-4 tracking-wide">{stat.number}</div>
                <div className="w-8 h-0.5 bg-[#D6A33E] mx-auto mb-3"></div>
                <div className="text-gray-400 text-sm lg:text-base font-light tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Services Section */}
        <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-400">
          <div className="text-center mb-12">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#D6A33E] mb-6 tracking-wider">OUR SERVICES</h4>
            <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
              We specialize in capturing life's most precious moments with artistic vision and technical excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Wedding Photography', 
                icon: HiCamera,
                description: 'Timeless wedding moments captured with artistic vision and emotional depth'
              },
              { 
                name: 'Video Production', 
                icon: HiDesktopComputer,
                description: 'Cinematic storytelling that brings your special day to life'
              },
              { 
                name: 'Portrait Sessions', 
                icon: HiPhotograph,
                description: 'Professional portraits that capture your unique personality and style'
              },
              { 
                name: 'Premium Albums', 
                icon: HiCollection,
                description: 'Handcrafted albums that preserve your memories for generations'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`text-center p-6 glass-dark rounded-xl hover-lift cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100}`}
                onClick={() => setCurrentPage('services')}
              >
                <div className="flex justify-center mb-6">
                  <service.icon className="w-12 h-12 text-[#D6A33E]" />
                </div>
                <h5 className="text-[#D6A33E] font-light text-xl mb-4 tracking-wide">{service.name}</h5>
                <div className="w-12 h-0.5 bg-[#D6A33E] mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Packages Section */}
        <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-600">
          <div className="text-center mb-12">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#D6A33E] mb-6 tracking-wider">PHOTOGRAPHY PACKAGES</h4>
            <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Choose from our carefully crafted packages designed to capture your special moments
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: 'Essential',
                price: '₹53,000',
                features: ['Wedding Album', '2 Premium Frames', 'HD Video Coverage', 'Custom Calendar','Candid Photography'],
                popular: false,
                description: 'Perfect for intimate celebrations'
              },
              {
                name: 'Premium',
                price: '₹90,000',
                features: ['2 Wedding Albums', '4 Premium Frames', 'Cinematic Video', '2 Custom Calendars', 'Online Gallery'],
                popular: true,
                description: 'Most popular choice for couples'
              },
              {
                name: 'Luxury',
                price: '₹1,59,000',
                features: ['Premium Albums', '6 Luxury Frames', 'Cinematic Production', 'Mini Albums', 'Drone Coverage'],
                popular: false,
                description: 'Complete luxury experience'
              }
            ].map((pkg, index) => (
              <div key={index} className={`glass-dark rounded-2xl p-8 hover-lift cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100} relative ${pkg.popular ? 'ring-2 ring-[#D6A33E] transform scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D6A33E] text-[#111111] px-6 py-2 rounded-full text-sm font-medium tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h5 className="text-[#D6A33E] font-light text-2xl mb-2 tracking-wide">{pkg.name}</h5>
                  <div className="w-12 h-0.5 bg-[#D6A33E] mx-auto mb-4"></div>
                  <div className="text-white text-3xl lg:text-4xl font-light mb-2 tracking-wide">{pkg.price}</div>
                  <p className="text-gray-400 text-sm font-light">{pkg.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center text-gray-300 text-sm lg:text-base">
                      <div className="w-2 h-2 bg-[#D6A33E] rounded-full mr-4 flex-shrink-0"></div>
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-transparent border border-[#D6A33E] text-[#D6A33E] py-3 font-light text-lg tracking-wider hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-300">
                  SELECT PACKAGE
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel Section */}
        <TestimonialCarousel />

        {/* Professional Contact & Action Section */}
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeInUp3D animate-delay-700">
          
          {/* Call to Action */}
          <div className="text-center glass-dark rounded-2xl p-12 lg:p-16">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#D6A33E] mb-6 tracking-wider">LET'S CREATE MAGIC TOGETHER</h4>
            <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg lg:text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Ready to capture your special moments? Let's discuss your vision and create something extraordinary that you'll treasure forever.
            </p>
            <button 
              className="bg-transparent border-2 border-[#D6A33E] text-[#D6A33E] px-12 py-4 lg:px-16 lg:py-5 font-light text-lg lg:text-xl tracking-wider hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-300 hover-lift"
              onClick={() => setCurrentPage('contact')}
            >
              START YOUR JOURNEY
            </button>
          </div>

          {/* Contact Details & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Contact Information */}
            <div className="glass-dark rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-light text-[#D6A33E] mb-8 tracking-wide text-center">CONTACT INFORMATION</h4>
              <div className="w-16 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <HiLocationMarker className="w-6 h-6 text-[#D6A33E] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#D6A33E] font-light text-lg mb-1">STUDIO ADDRESS</h5>
                    <span className="text-gray-300 font-light leading-relaxed">No.8, Canara Bank Opp, Ugur, Coimbatore</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <HiPhone className="w-6 h-6 text-[#D6A33E] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#D6A33E] font-light text-lg mb-1">PHONE</h5>
                    <span className="text-gray-300 font-light">+91 9876543210</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <HiMail className="w-6 h-6 text-[#D6A33E] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#D6A33E] font-light text-lg mb-1">EMAIL</h5>
                    <span className="text-gray-300 font-light">harsath@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96 shadow-lg hover-lift">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3178280179554!2d77.06162707486052!3d11.014763389148861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857de0c2b4bdd%3A0x30eaf141a2f2f635!2sHarsath%20photography!5e0!3m2!1sen!2sin!4v1756100919775!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:brightness-110 transition-all duration-300 grayscale hover:grayscale-0"
              ></iframe>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero
