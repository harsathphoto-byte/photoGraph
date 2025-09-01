import { HiX } from "@react-icons/all-files/hi/HiX"

const VideoModal = ({ video, onClose }) => {
  if (!video) return null

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

        {/* Video Player */}
        <div className="flex items-center justify-center h-full">
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

        {/* Video Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-lg">
          <h3 className="text-2xl font-bold text-white mb-2">
            {video.title || 'Untitled Video'}
          </h3>
          {video.description && (
            <p className="text-gray-300 mb-3">
              {video.description}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>
                by {video.uploadedBy?.firstName} {video.uploadedBy?.lastName}
              </span>
              <span className="bg-[#D6A33E] text-black px-2 py-1 rounded font-medium">
                {video.category}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{video.views || 0} views</span>
              <span>{video.likeCount || 0} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
