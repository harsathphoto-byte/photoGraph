import { useState } from 'react'
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import PhotoGallery from '../components/PhotoGallery'

const GalleryPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#B8860B] rounded-full flex items-center justify-center">
              <HiPhotograph className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of captured moments, each telling a unique story through the lens of creativity and passion.
          </p>
        </div>

        {/* Photo Gallery Component */}
        <PhotoGallery onPhotoClick={handlePhotoClick} />

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-7xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
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
                    <span className="bg-[#B8860B] text-black px-2 py-1 rounded text-xs font-medium">
                      {selectedPhoto.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{selectedPhoto.views || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{selectedPhoto.likeCount || 0}</span>
                    </span>
                  </div>
                </div>
                {selectedPhoto.location?.name && (
                  <div className="mt-2 text-sm text-gray-400">
                    📍 {selectedPhoto.location.name}
                  </div>
                )}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryPage
