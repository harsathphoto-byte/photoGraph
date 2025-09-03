import { HiX } from "@react-icons/all-files/hi/HiX"
import { useEffect } from "react"

const VideoModal = ({ video, onClose }) => {
  if (!video) return null

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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[99999] p-4 pt-24 md:pt-4">
      <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col">
        {/* Close Button - At the top, above video */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="w-12 h-12 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="flex items-center justify-center flex-1">
          <video
            src={video.cloudinaryUrl || video.url}
            controls
            autoPlay
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ maxHeight: '80vh' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
