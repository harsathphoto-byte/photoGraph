import { useState, useEffect } from 'react'
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"
import PhotoGallery from './PhotoGallery'
import VideoGallery from './VideoGallery'

const Gallery = () => {
  const [activeSection, setActiveSection] = useState('photos')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

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

  // Listen for gallery section changes from other components
  useEffect(() => {
    const handleSetGallerySection = (event) => {
      setActiveSection(event.detail)
    }

    window.addEventListener('setGallerySection', handleSetGallerySection)
    return () => window.removeEventListener('setGallerySection', handleSetGallerySection)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center">
              <HiPhotograph className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of photos and videos, each telling a unique story through the lens of creativity and passion.
          </p>
        </div>

        {/* Section Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D6A33E]/20 via-[#D6A33E]/30 to-[#D6A33E]/20 rounded-2xl blur-xl"></div>
            
            {/* Toggle container */}
            <div className="relative bg-black/40 backdrop-blur-lg rounded-2xl p-2 border border-[#D6A33E]/30 shadow-2xl">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveSection('photos')}
                  className={`relative flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                    activeSection === 'photos'
                      ? 'bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-black shadow-xl shadow-[#D6A33E]/30'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`p-1 rounded-lg transition-all duration-300 ${
                    activeSection === 'photos' 
                      ? 'bg-black/20' 
                      : 'bg-[#D6A33E]/20'
                  }`}>
                    <HiPhotograph className="w-5 h-5" />
                  </div>
                  <span className="text-sm tracking-wide">Photos</span>
                  
                  {/* Active indicator */}
                  {activeSection === 'photos' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('videos')}
                  className={`relative flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                    activeSection === 'videos'
                      ? 'bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-black shadow-xl shadow-[#D6A33E]/30'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`p-1 rounded-lg transition-all duration-300 ${
                    activeSection === 'videos' 
                      ? 'bg-black/20' 
                      : 'bg-[#D6A33E]/20'
                  }`}>
                    <HiDesktopComputer className="w-5 h-5" />
                  </div>
                  <span className="text-sm tracking-wide">Videos</span>
                  
                  {/* Active indicator */}
                  {activeSection === 'videos' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photos Section */}
        {activeSection === 'photos' && (
          <div className="w-full">
            <PhotoGallery onPhotoClick={handlePhotoClick} />
          </div>
        )}

        {/* Videos Section */}
        {activeSection === 'videos' && (
          <div className="w-full">
            <VideoGallery onVideoClick={handleVideoClick} />
          </div>
        )}
        
        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-7xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closePhotoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300"
              >
                ×
              </button>

              {/* Image */}
              <div className="flex items-center justify-center h-full">
                <img
                  src={selectedPhoto.transformations?.large || selectedPhoto.cloudinaryUrl}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.description && (
                  <p className="text-gray-300 mb-3">
                    {selectedPhoto.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>
                      by {selectedPhoto.uploadedBy?.firstName} {selectedPhoto.uploadedBy?.lastName}
                    </span>
                    <span className="bg-[#D6A33E] text-black px-2 py-1 rounded font-medium">
                      {selectedPhoto.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{selectedPhoto.views || 0} views</span>
                    <span>{selectedPhoto.likeCount || 0} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-7xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300"
              >
                ×
              </button>

              {/* Video */}
              <div className="flex items-center justify-center h-full">
                <video
                  src={selectedVideo.transformations?.hd || selectedVideo.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg"
                  poster={selectedVideo.transformations?.thumbnail}
                />
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-gray-300 mb-3">
                    {selectedVideo.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>
                      by {selectedVideo.uploadedBy?.firstName} {selectedVideo.uploadedBy?.lastName}
                    </span>
                    <span className="bg-[#D6A33E] text-black px-2 py-1 rounded font-medium">
                      {selectedVideo.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{selectedVideo.views || 0} views</span>
                    <span>{selectedVideo.likeCount || 0} likes</span>
                    {selectedVideo.duration && <span>{selectedVideo.duration}s</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Gallery
