import { useState, useEffect } from 'react'
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
import harsath from "../assets/harsath.png"

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
      text: "Harsath captured our wedding so beautifully! Every moment was perfectly preserved. The quality of photos exceeded our expectations. Highly recommended!",
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
        return window.innerWidth < 768 ? 'translateX(200px) scale(0.8) rotateY(-15deg)' : 'translateX(280px) scale(0.85) rotateY(-25deg)'
      case 'left':
        return window.innerWidth < 768 ? 'translateX(-200px) scale(0.8) rotateY(15deg)' : 'translateX(-280px) scale(0.85) rotateY(25deg)'
      default:
        return window.innerWidth < 768 ? 'translateX(400px) scale(0.6) rotateY(-30deg)' : 'translateX(600px) scale(0.7) rotateY(-45deg)'
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
    <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/90 rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 border border-[#B8860B]/30 shadow-2xl max-w-7xl mx-auto mb-12">
      <h4 className="text-[#B8860B] text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8 text-center">
        What Our Clients Say
      </h4>
      
      <div className="relative h-80 sm:h-96 lg:h-80 flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        {testimonials.map((testimonial, index) => {
          const position = getCardPosition(index)
          
          return (
            <div
              key={testimonial.id}
              className="absolute w-64 sm:w-72 md:w-80 lg:w-96 h-56 sm:h-64 lg:h-72 transition-all duration-700 ease-out cursor-pointer"
              style={{
                transform: getTransform(position, index),
                zIndex: getZIndex(position),
                opacity: getOpacity(position),
                transformStyle: 'preserve-3d'
              }}
              onClick={() => position !== 'center' && goToSlide(index)}
            >
              <div className={`w-full h-full rounded-2xl p-4 sm:p-6 lg:p-8 border-2 backdrop-blur-sm shadow-2xl transition-all duration-700 ${
                position === 'center' 
                  ? 'bg-gradient-to-br from-[#B8860B]/30 to-[#DAA520]/30 border-[#B8860B]/60 shadow-[#B8860B]/30' 
                  : 'bg-gradient-to-br from-[#B8860B]/15 to-[#DAA520]/15 border-[#B8860B]/30 shadow-black/40'
              }`}>
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 h-full">
                  {/* Client Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-[#B8860B] shadow-lg"
                    />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <HiStar key={i} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#B8860B]" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed text-center italic flex-1 overflow-hidden line-clamp-3 sm:line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="text-center">
                    <h5 className="text-[#B8860B] font-bold text-sm sm:text-base lg:text-lg">
                      {testimonial.name}
                    </h5>
                    <p className="text-gray-400 text-xs sm:text-sm">
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
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#B8860B]/80 hover:bg-[#B8860B] text-[#111111] p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#B8860B]/80 hover:bg-[#B8860B] text-[#111111] p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentIndex 
                ? 'bg-[#B8860B] scale-125 shadow-lg shadow-[#B8860B]/50' 
                : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
            }`}
          />
        ))}
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
              <div className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-[#B8860B] mb-6 hover:border-[#DAA520] transition-all duration-300 shadow-2xl hover-lift animate-float3D glass-golden">
                <img 
                  src={harsath} 
                  alt="Harsath - Photographer" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 animate-slideIn3D animate-delay-100 tracking-wide">
                HARSATH
              </h1>
              <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-6"></div>
              <p className="text-[#B8860B] text-lg lg:text-xl xl:text-2xl font-light mb-8 animate-slideIn3D animate-delay-200 tracking-wider">
                PHOTOGRAPHY
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-[#B8860B] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight animate-slideIn3D animate-delay-300 tracking-wide">
              Capturing Timeless Moments
            </h2>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto"></div>
            <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed px-4 lg:px-0 animate-slideIn3D animate-delay-400 font-light max-w-3xl mx-auto">
              In the bustling city of Coimbatore, wedding photography finds its muse in timeless traditions and vibrant celebrations. With over 8 years of experience, our studio has been privileged to document countless love stories.
            </p>
          </div>
        </div>

        {/* Categories Section - Full Width */}
        <div className="glass-dark rounded-3xl p-8 lg:p-12 border border-[#B8860B]/30 shadow-2xl max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-300 relative">
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
          
          <h4 className="text-[#B8860B] text-2xl lg:text-3xl xl:text-4xl font-semibold mb-8 text-center animate-slideIn3D relative z-20">Categories</h4>
          
          {/* Mobile Layout - All categories same size */}
          <div className="block md:hidden">
            {/* First 4 categories in 2x2 grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {[
                { name: 'Wedding', category: 'wedding',image:"https://imgs.search.brave.com/vl_9e_AS_AYrYBA-RHYmnwtAyQEOIvkOxwS7_56GUL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/ODcwNzg2OC9waG90/by9pbmRpYW4tY291/cGxlLWhvbGRpbmct/aGFuZC1jbG9zZS11/cC1pbi13ZWRkaW5n/LWNlcmVtb255Lndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz1Zb2hW/S2RtYkhsODVsNUl5/X3JldFpvN3VNRGg1/M2I3Qi1URXg1RW14/RjVjPQ" },
                { name: 'Baby Shower', category: 'baby-shower',image:"https://imgs.search.brave.com/VKe72PFe0lEuLO5Lv_be8PjQvyc96CbnN1irt0VT6C0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vYW1yaXRh/bW11LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wNC9Q/cmUtYmFieS1zaG9v/dC1tYXRlcm5pdHkt/cGhvdG9ncmFwaGVy/LU11bWJhaS1iYWJ5/LXNob3dlci1waG90/b3Nob290LWJhYnkt/YnVtcC1zaG9vdC1t/YXRlcm5pdHktcGhv/dG9zaG9vdC1tdW1i/YWktNDYuanBnP3Jl/c2l6ZT00MDAsMjg0/JnNzbD0x" },
                { name: 'Fashion', category: 'fashion',image:"https://imgs.search.brave.com/ZAlDC5WmYUX19EoKtLQtPhxLHPvej-nhxR1zZMOcGFY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/OTkwNzExMy9waG90/by9idXNpbmVzcy13/b21hbi1wb3Npbmct/aW4tc3R1ZGlvLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/V1V1eWhjY2M3dGkt/MDVoaHJ0d1BmX05K/Y1pHVUtIRFV3NHBN/Z3dCTXJnPQ" },
                { name: 'New Born', category: 'newborn',image:"https://imgs.search.brave.com/V1_QODa20xTGozP77PCfiRho-hJZYxAo_FG2t7kKpTw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVl/ZGZjNTM5NjlkOGU5/NDExZDdlMjdmNS9h/ODBjMTY5ZS1kNDdk/LTQ3MjUtYmU4My1l/MTA5ZjBmYWNlMDkv/TmV3Ym9ybi1waG90/b3Nob290LWlkZWFz/LXdpdGgtcGFyZW50/cy0wMzEuSlBH" }
              ].map((category, index) => (
                <div 
                  key={index} 
                  className={`relative group cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100}`}
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden border-3 border-[#B8860B]/60 group-hover:border-[#B8860B] transition-all duration-500 glass-golden flex items-center justify-center group-hover:from-[#B8860B]/70 group-hover:to-[#B8860B]/90 hover-lift shadow-xl group-hover:shadow-2xl group-hover:shadow-[#B8860B]/30 perspective-container">
                    <div className="text-center transform-3d">
                      <img 
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg mx-auto mb-2 hover-tilt"
                      />
                      <span className="text-white font-bold text-sm lg:text-base text-center group-hover:text-[#B8860B] transition-colors leading-tight">
                        {category.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Traditional category - perfectly centered */}
            <div className="flex justify-center">
              <div className="w-[calc(50%-12px)]"> {/* Exact grid column width: 50% minus half of gap-6 */}
                <div 
                  className="relative group cursor-pointer animate-fadeInUp3D animate-delay-500"
                  onClick={() => handleCategoryClick('traditional')}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden border-3 border-[#B8860B]/60 group-hover:border-[#B8860B] transition-all duration-500 glass-golden flex items-center justify-center group-hover:from-[#B8860B]/70 group-hover:to-[#B8860B]/90 hover-lift shadow-xl group-hover:shadow-2xl group-hover:shadow-[#B8860B]/30 perspective-container">
                    <div className="text-center transform-3d">
                      <img 
                        src={`https://imgs.search.brave.com/FlRH1-pduHolQNAElLP7kf-ZpFDRzPtqetM6g9QXdFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2LzRl/Lzg2LzY2NGU4Njlk/YTRlMzhjYTNmZDRi/MzgwNmJjNjZlMzJk/LmpwZw`}
                        alt="Traditional"
                        className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg mx-auto mb-2 hover-tilt"
                      />
                      <span className="text-white font-bold text-sm lg:text-base text-center group-hover:text-[#B8860B] transition-colors leading-tight">
                        Traditional
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
             { name: 'Wedding', category: 'wedding',image:"https://imgs.search.brave.com/vl_9e_AS_AYrYBA-RHYmnwtAyQEOIvkOxwS7_56GUL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/ODcwNzg2OC9waG90/by9pbmRpYW4tY291/cGxlLWhvbGRpbmct/aGFuZC1jbG9zZS11/cC1pbi13ZWRkaW5n/LWNlcmVtb255Lndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz1Zb2hW/S2RtYkhsODVsNUl5/X3JldFpvN3VNRGg1/M2I3Qi1URXg1RW14/RjVjPQ" },
                { name: 'Baby Shower', category: 'baby-shower',image:"https://imgs.search.brave.com/VKe72PFe0lEuLO5Lv_be8PjQvyc96CbnN1irt0VT6C0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vYW1yaXRh/bW11LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wNC9Q/cmUtYmFieS1zaG9v/dC1tYXRlcm5pdHkt/cGhvdG9ncmFwaGVy/LU11bWJhaS1iYWJ5/LXNob3dlci1waG90/b3Nob290LWJhYnkt/YnVtcC1zaG9vdC1t/YXRlcm5pdHktcGhv/dG9zaG9vdC1tdW1i/YWktNDYuanBnP3Jl/c2l6ZT00MDAsMjg0/JnNzbD0x" },
                { name: 'Fashion', category: 'fashion',image:"https://imgs.search.brave.com/ZAlDC5WmYUX19EoKtLQtPhxLHPvej-nhxR1zZMOcGFY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/OTkwNzExMy9waG90/by9idXNpbmVzcy13/b21hbi1wb3Npbmct/aW4tc3R1ZGlvLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/V1V1eWhjY2M3dGkt/MDVoaHJ0d1BmX05K/Y1pHVUtIRFV3NHBN/Z3dCTXJnPQ" },
                { name: 'New Born', category: 'newborn',image:"https://imgs.search.brave.com/V1_QODa20xTGozP77PCfiRho-hJZYxAo_FG2t7kKpTw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVl/ZGZjNTM5NjlkOGU5/NDExZDdlMjdmNS9h/ODBjMTY5ZS1kNDdk/LTQ3MjUtYmU4My1l/MTA5ZjBmYWNlMDkv/TmV3Ym9ybi1waG90/b3Nob290LWlkZWFz/LXdpdGgtcGFyZW50/cy0wMzEuSlBH" },
              { name: 'Traditional', category: 'traditional',image:"https://imgs.search.brave.com/FlRH1-pduHolQNAElLP7kf-ZpFDRzPtqetM6g9QXdFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2LzRl/Lzg2LzY2NGU4Njlk/YTRlMzhjYTNmZDRi/MzgwNmJjNjZlMzJk/LmpwZw" }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100}`}
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-3 border-[#B8860B]/60 group-hover:border-[#B8860B] transition-all duration-500 glass-golden flex items-center justify-center group-hover:from-[#B8860B]/70 group-hover:to-[#B8860B]/90 hover-lift shadow-xl group-hover:shadow-2xl group-hover:shadow-[#B8860B]/30 perspective-container">
                  <div className="text-center transform-3d">
                    <img 
                      src={category?.image}
                      alt={category.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg mx-auto mb-2 hover-tilt"
                    />
                    <span className="text-white font-bold text-sm lg:text-base text-center group-hover:text-[#B8860B] transition-colors leading-tight">
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button 
              className="group bg-gradient-to-br from-[#B8860B] to-[#CD853F] text-[#111111] px-8 py-3 lg:px-10 lg:py-4 rounded-full font-medium text-base lg:text-lg hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#B8860B]/30 hover:shadow-xl hover:shadow-[#B8860B]/50 border border-[#B8860B]/30 hover-lift relative overflow-hidden"
              style={{
                boxShadow: `
                  0 4px 15px rgba(214, 163, 62, 0.3),
                  0 2px 10px rgba(214, 163, 62, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `
              }}
              onClick={() => {
                setCurrentPage('gallery')
                // Set a flag to show photos section
                setTimeout(() => {
                  const event = new CustomEvent('setGallerySection', { detail: 'photos' })
                  window.dispatchEvent(event)
                }, 100)
              }}
            >
              <span className="relative z-10">More →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Professional Achievements Section */}
      <section className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] px-4 sm:px-6 lg:px-12 xl:px-16 py-12">
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
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#B8860B] mb-6 tracking-wider">OUR ACHIEVEMENTS</h4>
            <div className="w-24 h-0.5 bg-[#B8860B] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Couples' },
              { number: '8+', label: 'Years Experience' },
              { number: '200+', label: 'Wedding Events' },
              { number: '50+', label: 'Awards Won' }
            ].map((stat, index) => (
              <div key={index} className={`text-center glass-dark rounded-xl p-6 lg:p-8 hover-lift animate-pulse3D animate-delay-${(index + 1) * 100}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#B8860B] mb-4 tracking-wide">{stat.number}</div>
                <div className="w-8 h-0.5 bg-[#B8860B] mx-auto mb-3"></div>
                <div className="text-gray-400 text-sm lg:text-base font-light tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Services Section */}
        <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-400">
          <div className="text-center mb-12">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#B8860B] mb-6 tracking-wider">OUR SERVICES</h4>
            <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
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
                name: 'Event Photography', 
                icon: HiDesktopComputer,
                description: 'Professional coverage of your special occasions and celebrations'
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
                  <service.icon className="w-12 h-12 text-[#B8860B]" />
                </div>
                <h5 className="text-[#B8860B] font-light text-xl mb-4 tracking-wide">{service.name}</h5>
                <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Container for reordering sections on mobile */}
        <div className="flex flex-col lg:flex-col">
          {/* Testimonials Section - First on mobile, First on desktop */}
          <div className="order-1 lg:order-2">
            <TestimonialCarousel />
          </div>

          {/* Professional Packages Section - Second on mobile, Second on desktop but shown first */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg max-w-7xl mx-auto mb-12 animate-fadeInUp3D animate-delay-600">
              <div className="text-center mb-12">
                <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#B8860B] mb-6 tracking-wider">PHOTOGRAPHY PACKAGES</h4>
                <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                  Choose from our carefully crafted packages designed to capture your special moments
                </p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Essential',
                    price: '₹53,000',
                    features: ['Wedding Album', '2 Premium Frames', 'Professional Editing', 'Custom Calendar','Candid Photography'],
                    popular: false,
                    description: 'Perfect for intimate celebrations'
                  },
                  {
                    name: 'Premium',
                    price: '₹90,000',
                    features: ['2 Wedding Albums', '4 Premium Frames', 'Professional Photo Editing', '2 Custom Calendars', 'Online Gallery'],
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
                  <div key={index} className={`glass-dark rounded-2xl p-8 hover-lift cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100} relative ${pkg.popular ? 'ring-2 ring-[#B8860B] transform scale-105' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#B8860B] text-[#111111] px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">MOST POPULAR</div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h5 className="text-[#B8860B] font-light text-2xl mb-2 tracking-wide">{pkg.name}</h5>
                      <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mb-4"></div>
                      <div className="text-white text-3xl lg:text-4xl font-light mb-2 tracking-wide">{pkg.price}</div>
                      <p className="text-gray-400 text-sm font-light">{pkg.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {pkg.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center text-gray-300 text-sm lg:text-base">
                          <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-4 flex-shrink-0"></div>
                          <span className="font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <a 
                        href={`https://wa.me/919843535984?text=Hi! I'm interested in the ${pkg.name} photography package${pkg.name === 'Essential' ? ' for intimate celebrations' : pkg.name === 'Premium' ? ' (your most popular choice)' : ' - the complete luxury experience'}. The ${pkg.price} package includes ${pkg.features.slice(0,2).join(', ')} and more. Can you provide more details and check availability?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-br from-[#B8860B] to-[#CD853F] text-[#111111] px-6 py-2 lg:py-3 rounded-full font-medium text-sm lg:text-base hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#B8860B]/30 hover:shadow-xl hover:shadow-[#B8860B]/50 border border-[#B8860B]/30 hover-lift relative overflow-hidden tracking-wider inline-block text-center"
                        style={{
                          boxShadow: `
                            0 4px 15px rgba(214, 163, 62, 0.3),
                            0 2px 10px rgba(214, 163, 62, 0.2),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                          `
                        }}
                      >
                        <span className="relative z-10">BOOK NOW</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Contact & Action Section */}
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeInUp3D animate-delay-700">
          
          {/* Call to Action */}
          <div className="text-center glass-dark rounded-2xl p-12 lg:p-16">
            <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#B8860B] mb-6 tracking-wider">LET'S CREATE MAGIC TOGETHER</h4>
            <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg lg:text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Ready to capture your special moments? Let's discuss your vision and create something extraordinary that you'll treasure forever.
            </p>
            <button 
              className="group bg-gradient-to-br from-[#B8860B] to-[#CD853F] text-[#111111] px-8 py-3 lg:px-10 lg:py-4 rounded-full font-medium text-base lg:text-lg hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#B8860B]/30 hover:shadow-xl hover:shadow-[#B8860B]/50 border border-[#B8860B]/30 hover-lift relative overflow-hidden tracking-wider"
              onClick={() => setCurrentPage('contact')}
              style={{
                boxShadow: `
                  0 4px 15px rgba(214, 163, 62, 0.3),
                  0 2px 10px rgba(214, 163, 62, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `
              }}
            >
              <span className="relative z-10">START YOUR JOURNEY</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Contact Details & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Contact Information */}
            <div className="glass-dark rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-light text-[#B8860B] mb-8 tracking-wide text-center">CONTACT INFORMATION</h4>
              <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <HiLocationMarker className="w-6 h-6 text-[#B8860B] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#B8860B] font-light text-lg mb-1">STUDIO ADDRESS</h5>
                    <span className="text-gray-300 font-light leading-relaxed">No.8, Canara Bank Opp, Ugur, Coimbatore</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <HiPhone className="w-6 h-6 text-[#B8860B] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#B8860B] font-light text-lg mb-1">PHONE</h5>
                    <span className="text-gray-300 font-light">+91 98435 35984</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <HiMail className="w-6 h-6 text-[#B8860B] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h5 className="text-[#B8860B] font-light text-lg mb-1">EMAIL</h5>
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
                className="hover:brightness-110 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero
