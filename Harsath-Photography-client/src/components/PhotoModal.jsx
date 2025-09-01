import { HiX } from "@react-icons/all-files/hi/HiX"

const PhotoModal = ({ photo, onClose }) => {
  if (!photo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[99999] p-4">
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300 backdrop-blur-sm"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="flex items-center justify-center h-full">
          <img
            src={photo.transformations?.large || photo.cloudinaryUrl}
            alt={photo.title || 'Photo'}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-lg">
          <h3 className="text-2xl font-bold text-white mb-2">
            {photo.title || 'Untitled Photo'}
          </h3>
          {photo.description && (
            <p className="text-gray-300 mb-3">
              {photo.description}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>
                by {photo.uploadedBy?.firstName} {photo.uploadedBy?.lastName}
              </span>
              <span className="bg-[#D6A33E] text-black px-2 py-1 rounded font-medium">
                {photo.category}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{photo.views || 0} views</span>
              <span>{photo.likeCount || 0} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
