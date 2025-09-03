import { HiX } from "@react-icons/all-files/hi/HiX"
import { useEffect } from "react"

const PhotoModal = ({ photo, onClose }) => {
  if (!photo) return null

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
      className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-[9999] p-2 sm:p-4 pt-20 sm:pt-24 md:pt-28 lg:pt-36"
      onClick={onClose} // Allow clicking backdrop to close
    >
      <div 
        className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl lg:max-w-7xl h-full max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-180px)] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking on content
      >
        {/* Close Button - At the top, above image with higher z-index */}
        <div className="flex justify-end mb-2 sm:mb-4 relative z-50">
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 hover:bg-red-600 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-red-500 shadow-lg hover:shadow-red-500/30 hover:scale-110"
            aria-label="Close image"
            type="button"
          >
            <HiX className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center flex-1 relative min-h-0">
          <img
            src={photo.transformations?.large || photo.cloudinaryUrl}
            alt={photo.title || 'Photo'}
            className="w-full h-full max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            style={{ 
              maxHeight: '100%',
              maxWidth: '100%',
              height: 'auto',
              width: 'auto'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
