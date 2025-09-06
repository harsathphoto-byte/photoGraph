import { HiX } from "@react-icons/all-files/hi/HiX"
import { HiChevronLeft } from "@react-icons/all-files/hi/HiChevronLeft"
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight"
import { useEffect, useState, useRef } from "react"

const PhotoModal = ({ photo, photos = [], currentIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const modalRef = useRef(null)

  if (!photo) return null

  const currentPhoto = photos[activeIndex] || photo
  const hasMultiplePhotos = photos.length > 1

  // Navigation functions
  const goToPrevious = () => {
    if (hasMultiplePhotos) {
      setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }
  }

  const goToNext = () => {
    if (hasMultiplePhotos) {
      setActiveIndex((prev) => (prev + 1) % photos.length)
    }
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    if (!hasMultiplePhotos) return
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setIsDragging(false)
  }

  const handleTouchMove = (e) => {
    if (!hasMultiplePhotos) return
    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })
    
    // Calculate distance moved
    const deltaX = Math.abs(touch.clientX - touchStart.x)
    const deltaY = Math.abs(touch.clientY - touchStart.y)
    
    // If moving more horizontally than vertically, prevent default scrolling
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault()
      setIsDragging(true)
    }
  }

  const handleTouchEnd = () => {
    if (!hasMultiplePhotos || !isDragging) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = Math.abs(touchStart.y - touchEnd.y)
    const minSwipeDistance = 50

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        goToNext() // Swipe left = next photo
      } else {
        goToPrevious() // Swipe right = previous photo
      }
    }

    setIsDragging(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasMultiplePhotos) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Escape':
          onClose()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasMultiplePhotos])

  // Update active index when currentIndex prop changes
  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Save current scroll position and body styles
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    const body = document.body
    const documentElement = document.documentElement
    
    // Save original styles
    const originalStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    }
    
    // Get scrollbar width to prevent layout shift
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth
    
    // Apply styles to prevent scrolling
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = `-${scrollX}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    
    // Compensate for scrollbar width to prevent layout shift
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`
    }

    // Cleanup function to restore scroll when modal closes
    return () => {
      // Restore original styles
      Object.assign(body.style, originalStyles)
      
      // Restore scroll position immediately and smoothly
      window.scrollTo(scrollX, scrollY)
    }
  }, [])

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-[9999] p-2 sm:p-4 pt-20 sm:pt-24 md:pt-28 lg:pt-36"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl lg:max-w-7xl h-full max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-180px)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Navigation Info and Close Button */}
        <div className="flex justify-between items-center mb-2 sm:mb-4 relative z-50">
          {/* Photo Counter */}
          {hasMultiplePhotos && (
            <div className="text-white text-sm sm:text-base font-medium bg-black bg-opacity-60 px-3 py-1 rounded-full backdrop-blur-sm">
              {activeIndex + 1} of {photos.length}
            </div>
          )}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 hover:bg-red-600 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-red-500 shadow-lg hover:shadow-red-500/30 hover:scale-110 ml-auto"
            aria-label="Close image"
            type="button"
          >
            <HiX className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* Image Container with Navigation */}
        <div className="flex items-center justify-center flex-1 relative min-h-0">
          {/* Previous Button */}
          {hasMultiplePhotos && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg opacity-0 sm:opacity-100 hover:opacity-100"
              aria-label="Previous image"
            >
              <HiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Image */}
          <img
            src={currentPhoto.transformations?.large || currentPhoto.cloudinaryUrl}
            alt={currentPhoto.title || 'Photo'}
            className="w-full h-full max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            style={{ 
              maxHeight: '100%',
              maxWidth: '100%',
              height: 'auto',
              width: 'auto'
            }}
          />

          {/* Next Button */}
          {hasMultiplePhotos && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg opacity-0 sm:opacity-100 hover:opacity-100"
              aria-label="Next image"
            >
              <HiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          
          
        </div>

        {/* Photo Dots Indicator */}
        {hasMultiplePhotos && photos.length <= 10 && (
          <div className="flex justify-center mt-2 sm:mt-4 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white bg-opacity-40 hover:bg-opacity-70'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoModal
