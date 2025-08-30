import { useState, useEffect, useRef } from 'react'
import { HiEye } from "@react-icons/all-files/hi/HiEye"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"

const Gallery = () => {
  const [activeSection, setActiveSection] = useState('photos')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const gridRef = useRef(null)
  const [columnCount, setColumnCount] = useState(4)

  // Photos data
  const galleryImages = [
    { id: 1, url: 'https://picsum.photos/400/600?random=1', title: 'Wedding Ceremony', category: 'Wedding', likes: 234, views: 1200 },
    { id: 2, url: 'https://picsum.photos/400/500?random=2', title: 'Couple Portrait', category: 'Portrait', likes: 156, views: 890 },
    { id: 3, url: 'https://picsum.photos/400/700?random=3', title: 'Reception Dance', category: 'Wedding', likes: 189, views: 1100 },
    { id: 4, url: 'https://picsum.photos/400/550?random=4', title: 'Fashion Shoot', category: 'Fashion', likes: 298, views: 1500 },
    { id: 5, url: 'https://picsum.photos/400/650?random=5', title: 'Corporate Event', category: 'Event', likes: 145, views: 780 },
    { id: 6, url: 'https://picsum.photos/400/480?random=6', title: 'Nature Portrait', category: 'Nature', likes: 267, views: 1300 }
  ]

  // Videos data
  const galleryVideos = [
    { id: 1, thumbnail: 'https://picsum.photos/400/300?random=11', title: 'Wedding Highlights', category: 'Wedding', duration: '3:45', likes: 456, views: 2300 },
    { id: 2, thumbnail: 'https://picsum.photos/400/300?random=12', title: 'Engagement Story', category: 'Engagement', duration: '2:30', likes: 324, views: 1800 },
    { id: 3, thumbnail: 'https://picsum.photos/400/300?random=13', title: 'Event Coverage', category: 'Event', duration: '5:20', likes: 287, views: 1500 },
    { id: 4, thumbnail: 'https://picsum.photos/400/300?random=14', title: 'Fashion Film', category: 'Fashion', duration: '1:45', likes: 398, views: 2100 },
    { id: 5, thumbnail: 'https://picsum.photos/400/300?random=15', title: 'Baby Moments', category: 'Baby', duration: '2:15', likes: 234, views: 1200 },
    { id: 6, thumbnail: 'https://picsum.photos/400/300?random=16', title: 'Corporate Video', category: 'Corporate', duration: '4:10', likes: 156, views: 890 }
  ]

  // Masonry layout function matching reference style
  const createMasonryLayout = () => {
    const grid = gridRef.current
    if (!grid) return

    const items = grid.querySelectorAll('.masonry-item')
    const gap = 12 // Smaller gap like in reference
    const containerWidth = grid.offsetWidth
    const columns = columnCount
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    
    // Initialize column heights
    const columnHeights = new Array(columns).fill(0)
    
    items.forEach((item, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      
      // Position the item
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = columnHeights[shortestColumnIndex]
      
      item.style.position = 'absolute'
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${columnWidth}px`
      
      // Update column height
      columnHeights[shortestColumnIndex] += item.offsetHeight + gap
    })
    
    // Set container height
    grid.style.height = `${Math.max(...columnHeights)}px`
  }

  // Update column count based on screen size to match reference
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth
      if (width < 640) setColumnCount(2)      // 2 columns on mobile
      else if (width < 768) setColumnCount(3) // 3 columns on tablet
      else if (width < 1024) setColumnCount(4) // 4 columns on laptop
      else if (width < 1280) setColumnCount(5) // 5 columns on desktop
      else setColumnCount(6)                   // 6 columns on large screens
    }

    updateColumnCount()
    window.addEventListener('resize', updateColumnCount)
    return () => window.removeEventListener('resize', updateColumnCount)
  }, [])

  // Create masonry layout when images load or category changes
  useEffect(() => {
    const timer = setTimeout(() => {
      createMasonryLayout()
    }, 100)
    return () => clearTimeout(timer)
  }, [selectedCategory, columnCount])

  // Handle image load
  const handleImageLoad = () => {
    createMasonryLayout()
  }

  // Categories for filtering
  const photoCategories = ['All', 'Wedding', 'Portrait', 'Event', 'Fashion', 'Nature', 'Commercial']
  const videoCategories = ['All', 'Wedding', 'Engagement', 'Event', 'Fashion', 'Baby', 'Corporate']

  // Filter function
  const getFilteredContent = () => {
    if (activeSection === 'photos') {
      return selectedCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === selectedCategory)
    } else {
      return selectedCategory === 'All' ? galleryVideos : galleryVideos.filter(video => video.category === selectedCategory)
    }
  }

  const filteredContent = getFilteredContent()

  return (
    <section id="gallery" className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wider text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-gray-600 font-light tracking-wide">
            Explore our curated collection of photos and videos
          </p>
        </div>

        {/* Section Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveSection('photos')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSection === 'photos'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HiPhotograph className="w-5 h-5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setActiveSection('videos')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSection === 'videos'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HiDesktopComputer className="w-5 h-5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(activeSection === 'photos' ? photoCategories : videoCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Photos Section */}
        {activeSection === 'photos' && (
          <div 
            ref={gridRef}
            className="relative w-full"
            style={{ position: 'relative' }}
          >
            {filteredContent.map((image) => (
              <div
                key={image.id}
                className="masonry-item group cursor-pointer relative overflow-hidden rounded-lg transition-all duration-300"
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02] rounded-lg"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm font-medium mb-1">{image.title}</p>
                        <p className="text-xs text-gray-300">{image.category}</p>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <HiHeart className="w-4 h-4" />
                          <span>{image.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HiEye className="w-4 h-4" />
                          <span>{image.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Section */}
        {activeSection === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <HiPlay className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{video.category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <HiHeart className="w-4 h-4" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiEye className="w-4 h-4" />
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
            Load More {activeSection === 'photos' ? 'Photos' : 'Videos'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
