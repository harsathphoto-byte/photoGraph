import { useState } from 'react'
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"
import VideoGallery from '../components/VideoGallery'

const VideoGalleryPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
  }

  const closeModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#B8860B] rounded-full flex items-center justify-center">
              <HiDesktopComputer className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Video Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our cinematic storytelling through carefully crafted videos that capture emotions, moments, and memories in motion.
          </p>
        </div>

        {/* Video Gallery Component */}
        <VideoGallery onVideoClick={handleVideoClick} />

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-7xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
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
                    <span className="bg-[#B8860B] text-black px-2 py-1 rounded font-medium">
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

export default VideoGalleryPage
