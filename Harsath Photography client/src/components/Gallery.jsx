import { useState, useEffect, useRef } from 'react'
import { HiEye } from "@react-icons/all-files/hi/HiEye"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const gridRef = useRef(null)
  const [columnCount, setColumnCount] = useState(4)

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

    const galleryImages = [
    { id: 1, category: 'Wedding', url: 'https://picsum.photos/400/600?random=101', title: 'Wedding Ceremony', views: '2.1k', likes: 234, type: 'photo' },
    { id: 2, category: 'Portrait', url: 'https://picsum.photos/400/320?random=102', title: 'Studio Portrait', views: '1.8k', likes: 189, type: 'photo' },
    { id: 3, category: 'Event', url: 'https://picsum.photos/400/500?random=103', title: 'Corporate Event', views: '1.2k', likes: 156, type: 'photo' },
    { id: 4, category: 'Fashion', url: 'https://picsum.photos/400/680?random=104', title: 'Fashion Shoot', views: '3.4k', likes: 298, type: 'photo' },
    { id: 5, category: 'Nature', url: 'https://picsum.photos/400/420?random=105', title: 'Landscape Beauty', views: '2.7k', likes: 178, type: 'photo' },
    { id: 6, category: 'Commercial', url: 'https://picsum.photos/400/550?random=106', title: 'Brand Campaign', views: '1.5k', likes: 145, type: 'photo' },
    { id: 7, category: 'Wedding', url: 'https://picsum.photos/400/720?random=107', title: 'Destination Wedding', views: '4.1k', likes: 267, type: 'photo' },
    { id: 8, category: 'Portrait', url: 'https://picsum.photos/400/380?random=108', title: 'Creative Portrait', views: '987', likes: 98, type: 'photo' },
    { id: 9, category: 'Event', url: 'https://picsum.photos/400/480?random=109', title: 'Birthday Party', views: '756', likes: 67, type: 'photo' },
    { id: 10, category: 'Fashion', url: 'https://picsum.photos/400/620?random=110', title: 'Editorial Shoot', views: '2.3k', likes: 189, type: 'photo' },
    { id: 11, category: 'Nature', url: 'https://picsum.photos/400/360?random=111', title: 'Mountain Vista', views: '3.1k', likes: 234, type: 'photo' },
    { id: 12, category: 'Commercial', url: 'https://picsum.photos/400/580?random=112', title: 'Product Launch', views: '1.8k', likes: 156, type: 'photo' },
    { id: 13, category: 'Wedding', url: 'https://picsum.photos/400/450?random=113', title: 'Beach Wedding', views: '2.9k', likes: 145, type: 'photo' },
    { id: 14, category: 'Portrait', url: 'https://picsum.photos/400/520?random=114', title: 'Business Headshot', views: '1.1k', likes: 78, type: 'photo' },
    { id: 15, category: 'Event', url: 'https://picsum.photos/400/640?random=115', title: 'Conference', views: '1.4k', likes: 92, type: 'photo' },
    { id: 16, category: 'Fashion', url: 'https://picsum.photos/400/400?random=116', title: 'Street Fashion', views: '2.2k', likes: 156, type: 'photo' },
    { id: 17, category: 'Nature', url: 'https://picsum.photos/400/700?random=117', title: 'Sunset Landscape', views: '3.8k', likes: 198, type: 'photo' },
    { id: 18, category: 'Commercial', url: 'https://picsum.photos/400/340?random=118', title: 'Restaurant Shoot', views: '1.7k', likes: 123, type: 'photo' },
    { id: 19, category: 'Wedding', url: 'https://picsum.photos/400/560?random=119', title: 'Garden Wedding', views: '2.5k', likes: 189, type: 'photo' },
    { id: 20, category: 'Portrait', url: 'https://picsum.photos/400/480?random=120', title: 'Family Portrait', views: '1.3k', likes: 145, type: 'photo' },
    { id: 21, category: 'Nature', url: 'https://picsum.photos/400/380?random=121', title: 'Forest Path', views: '2.8k', likes: 201, type: 'photo' },
    { id: 22, category: 'Fashion', url: 'https://picsum.photos/400/660?random=122', title: 'Runway Show', views: '3.2k', likes: 267, type: 'photo' },
    { id: 23, category: 'Event', url: 'https://picsum.photos/400/420?random=123', title: 'Music Festival', views: '1.9k', likes: 134, type: 'photo' },
    { id: 24, category: 'Commercial', url: 'https://picsum.photos/400/540?random=124', title: 'Tech Conference', views: '1.6k', likes: 98, type: 'photo' },
  ]

  const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Fashion', 'Nature', 'Commercial']

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wider text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-gray-600 font-light tracking-wide">
            Explore our curated collection
          </p>
        </div>

        {/* Clean Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
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
        
        {/* Clean Masonry Layout - Reference Style */}
        <div 
          ref={gridRef}
          className="relative w-full"
          style={{ position: 'relative' }}
        >
          {filteredImages.map((image) => (
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
              
              {/* Minimal Hover Overlay - Only on Hover */}
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
        
        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
