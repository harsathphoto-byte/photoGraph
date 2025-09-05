import { useState, useEffect } from 'react'
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiBadgeCheck } from "@react-icons/all-files/hi/HiBadgeCheck"
import { HiStar } from "@react-icons/all-files/hi/HiStar"
import { HiSparkles } from "@react-icons/all-files/hi/HiSparkles"
import PhotoGallery from './PhotoGallery'
import VideoGallery from './VideoGallery'
import PhotoModal from './PhotoModal'
import VideoModal from './VideoModal'

const Gallery = ({ initialSection = 'photos' }) => {
  // Check for category from home page navigation
  const savedCategory = localStorage.getItem('selectedCategory')
  const [activeSection, setActiveSection] = useState(initialSection)
  const [activeCategory, setActiveCategory] = useState(savedCategory || 'wedding')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Clear the saved category after using it
  useEffect(() => {
    if (savedCategory) {
      localStorage.removeItem('selectedCategory')
    }
  }, [])

  // Categories for both photos and videos
  const categories = [
    { key: 'wedding', label: 'Wedding', icon: HiHeart },
    { key: 'baby-shower', label: 'Baby Shower', icon: HiBadgeCheck },
    { key: 'fashion', label: 'Fashion', icon: HiStar },
    { key: 'newborn', label: 'New Born', icon: HiSparkles },
    { key: 'traditional', label: 'Traditional', icon: HiHeart }
  ]

  // Handle photo click
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
  }

  // Handle video click
  const handleVideoClick = (video) => {
    setSelectedVideo(video)
  }

  // Close modals
  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  // Update active section when initialSection prop changes
  useEffect(() => {
    setActiveSection(initialSection)
  }, [initialSection])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Gallery
          </h1>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/10 via-[#B8860B]/20 to-[#B8860B]/10 rounded-2xl blur-xl"></div>
            
            {/* Navigation container */}
            <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-2 border border-[#B8860B]/20 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-1">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.key}
                      onClick={() => setActiveCategory(category.key)}
                      className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                        activeCategory === category.key
                          ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black shadow-xl shadow-[#B8860B]/30'
                          : 'text-white/80 hover:text-[#B8860B] hover:bg-[#B8860B]/10 hover:border hover:border-[#B8860B]/30'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm tracking-wide">{category.label}</span>
                      
                      {/* Active indicator */}
                      {activeCategory === category.key && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Mobile-First Masonry Optimized */}
        <div className="w-full max-w-7xl mx-auto px-1 sm:px-4 lg:px-8">
          {activeSection === 'photos' ? (
            <PhotoGallery category={activeCategory} onPhotoClick={handlePhotoClick} />
          ) : (
            <VideoGallery category={activeCategory} onVideoClick={handleVideoClick} />
          )}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} />
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={closeVideoModal} />
        )}

      </div>
    </div>
  )
}

export default Gallery
