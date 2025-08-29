import { useState, useEffect, useRef } from 'react'
import { HiEye } from "@react-icons/all-files/hi/HiEye"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"

const GalleryPage = () => {
  const [activeSection, setActiveSection] = useState('photos')
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

  // Listen for gallery section change from homepage
  useEffect(() => {
    const handleSectionChange = (event) => {
      if (event.detail === 'videos') {
        setActiveSection('videos')
        setSelectedCategory('All') // Reset category filter
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (event.detail === 'photos') {
        setActiveSection('photos')
        setSelectedCategory('All') // Reset category filter
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('setGallerySection', handleSectionChange)

    return () => {
      window.removeEventListener('setGallerySection', handleSectionChange)
    }
  }, [])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Handle image load
  const handleImageLoad = () => {
    createMasonryLayout()
  }
  
  const galleryImages = [
    { id: 1, category: 'Wedding', url: 'https://picsum.photos/400/600?random=201', title: 'Beautiful Wedding Ceremony', views: '3.2k', likes: 456 },
    { id: 2, category: 'Portrait', url: 'https://picsum.photos/400/320?random=202', title: 'Professional Portrait', views: '2.1k', likes: 234 },
    { id: 3, category: 'Event', url: 'https://picsum.photos/400/500?random=203', title: 'Corporate Event', views: '1.8k', likes: 189 },
    { id: 4, category: 'Fashion', url: 'https://picsum.photos/400/680?random=204', title: 'Fashion Shoot', views: '4.5k', likes: 567 },
    { id: 5, category: 'Nature', url: 'https://picsum.photos/400/420?random=205', title: 'Nature Photography', views: '3.1k', likes: 298 },
    { id: 6, category: 'Commercial', url: 'https://picsum.photos/400/550?random=206', title: 'Product Photography', views: '2.3k', likes: 178 },
    { id: 7, category: 'Wedding', url: 'https://picsum.photos/400/720?random=207', title: 'Wedding Reception', views: '5.2k', likes: 678 },
    { id: 8, category: 'Portrait', url: 'https://picsum.photos/400/380?random=208', title: 'Family Portrait', views: '1.9k', likes: 145 },
    { id: 9, category: 'Event', url: 'https://picsum.photos/400/480?random=209', title: 'Birthday Celebration', views: '1.2k', likes: 98 },
    { id: 10, category: 'Fashion', url: 'https://picsum.photos/400/620?random=210', title: 'Editorial Fashion', views: '3.8k', likes: 389 },
    { id: 11, category: 'Nature', url: 'https://picsum.photos/400/360?random=211', title: 'Landscape Photography', views: '4.1k', likes: 456 },
    { id: 12, category: 'Commercial', url: 'https://picsum.photos/400/580?random=212', title: 'Brand Photography', views: '2.7k', likes: 234 },
    { id: 13, category: 'Wedding', url: 'https://picsum.photos/400/450?random=213', title: 'Garden Wedding', views: '3.5k', likes: 345 },
    { id: 14, category: 'Portrait', url: 'https://picsum.photos/400/520?random=214', title: 'Business Headshot', views: '1.6k', likes: 123 },
    { id: 15, category: 'Event', url: 'https://picsum.photos/400/640?random=215', title: 'Conference', views: '2.2k', likes: 167 },
    { id: 16, category: 'Fashion', url: 'https://picsum.photos/400/400?random=216', title: 'Street Fashion', views: '2.9k', likes: 278 },
    { id: 17, category: 'Nature', url: 'https://picsum.photos/400/700?random=217', title: 'Sunset Landscape', views: '5.1k', likes: 589 },
    { id: 18, category: 'Commercial', url: 'https://picsum.photos/400/340?random=218', title: 'Restaurant Shoot', views: '1.8k', likes: 145 },
    { id: 19, category: 'Wedding', url: 'https://picsum.photos/400/560?random=219', title: 'Beach Wedding', views: '4.3k', likes: 456 },
    { id: 20, category: 'Portrait', url: 'https://picsum.photos/400/480?random=220', title: 'Creative Portrait', views: '2.5k', likes: 234 },
    { id: 21, category: 'Nature', url: 'https://picsum.photos/400/380?random=221', title: 'Forest Path', views: '3.7k', likes: 389 },
    { id: 22, category: 'Fashion', url: 'https://picsum.photos/400/660?random=222', title: 'Runway Show', views: '4.8k', likes: 567 },
    { id: 23, category: 'Event', url: 'https://picsum.photos/400/420?random=223', title: 'Music Festival', views: '3.1k', likes: 278 },
    { id: 24, category: 'Commercial', url: 'https://picsum.photos/400/540?random=224', title: 'Tech Conference', views: '2.4k', likes: 189 },
    { id: 25, category: 'Wedding', url: 'https://picsum.photos/400/600?random=225', title: 'Destination Wedding', views: '6.2k', likes: 789 },
    { id: 26, category: 'Portrait', url: 'https://picsum.photos/400/440?random=226', title: 'Senior Portrait', views: '1.7k', likes: 134 },
    { id: 27, category: 'Nature', url: 'https://picsum.photos/400/580?random=227', title: 'Mountain Vista', views: '4.5k', likes: 456 },
    { id: 28, category: 'Fashion', url: 'https://picsum.photos/400/500?random=228', title: 'Vintage Fashion', views: '3.3k', likes: 298 },
    { id: 29, category: 'Event', url: 'https://picsum.photos/400/620?random=229', title: 'Award Ceremony', views: '2.8k', likes: 234 },
    { id: 30, category: 'Commercial', url: 'https://picsum.photos/400/460?random=230', title: 'Product Launch', views: '2.1k', likes: 167 },
  ]

  // Videos data
  const galleryVideos = [
    { id: 1, thumbnail: 'https://picsum.photos/400/300?random=301', title: 'Wedding Highlights', category: 'Wedding', duration: '3:45', likes: 456, views: '2.3k' },
    { id: 2, thumbnail: 'https://picsum.photos/400/300?random=302', title: 'Engagement Story', category: 'Engagement', duration: '2:30', likes: 324, views: '1.8k' },
    { id: 3, thumbnail: 'https://picsum.photos/400/300?random=303', title: 'Event Coverage', category: 'Event', duration: '5:20', likes: 287, views: '1.5k' },
    { id: 4, thumbnail: 'https://picsum.photos/400/300?random=304', title: 'Fashion Film', category: 'Fashion', duration: '1:45', likes: 398, views: '2.1k' },
    { id: 5, thumbnail: 'https://picsum.photos/400/300?random=305', title: 'Baby Moments', category: 'Baby', duration: '2:15', likes: 234, views: '1.2k' },
    { id: 6, thumbnail: 'https://picsum.photos/400/300?random=306', title: 'Corporate Video', category: 'Corporate', duration: '4:10', likes: 156, views: '890' },
    { id: 7, thumbnail: 'https://picsum.photos/400/300?random=307', title: 'Pre Wedding', category: 'Wedding', duration: '3:20', likes: 512, views: '2.8k' },
    { id: 8, thumbnail: 'https://picsum.photos/400/300?random=308', title: 'Portrait Session', category: 'Portrait', duration: '2:45', likes: 289, views: '1.6k' },
    { id: 9, thumbnail: 'https://picsum.photos/400/300?random=309', title: 'Nature Documentary', category: 'Nature', duration: '6:30', likes: 445, views: '3.2k' },
    { id: 10, thumbnail: 'https://picsum.photos/400/300?random=310', title: 'Commercial Shoot', category: 'Commercial', duration: '3:15', likes: 198, views: '1.1k' },
    { id: 11, thumbnail: 'https://picsum.photos/400/300?random=311', title: 'Reception Highlights', category: 'Wedding', duration: '4:25', likes: 634, views: '3.5k' },
    { id: 12, thumbnail: 'https://picsum.photos/400/300?random=312', title: 'Maternity Story', category: 'Maternity', duration: '2:50', likes: 356, views: '1.9k' }
  ]

  // Categories for each section
  const photoCategories = ['All', 'Wedding', 'Portrait', 'Event', 'Fashion', 'Nature', 'Commercial']
  const videoCategories = ['All', 'Wedding', 'Engagement', 'Event', 'Fashion', 'Baby', 'Corporate', 'Portrait', 'Nature', 'Maternity']

  const categories = activeSection === 'photos' ? photoCategories : videoCategories

  // Handle video click
  const handleVideoClick = (video) => {
    // For now, we'll log the video details
    // This can be replaced with modal opening, external link, or custom video page
    console.log('Playing video:', video.title)
    // Example: window.open(video.videoUrl, '_blank') for external links
    // Or: setSelectedVideo(video) for modal
    alert(`Playing: ${video.title}\nDuration: ${video.duration}\nCategory: ${video.category}`)
  }

  return (
    <div className="bg-animated page-bg-gallery relative px-4 pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20 min-h-screen">
      {/* Enhanced Glowing Background Effects */}
      <div className="bg-glow" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
      <div className="bg-glow-large" style={{ bottom: '25%', right: '10%', animationDelay: '2s' }}></div>
      <div className="bg-orb-glow" style={{ top: '60%', left: '5%', animationDelay: '1s' }}></div>
      <div className="bg-orb-glow" style={{ top: '10%', right: '20%', animationDelay: '3s' }}></div>

      {/* Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ left: `${(i * 6) % 100}%`, animationDelay: `${i * 0.4}s` }}></div>
        ))}
      </div>

      {/* Enhanced Floating particles for gallery */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{ animationDelay: `${i * 2}s` }}></div>
        ))}
      </div>
      
      {/* Enhanced Shimmer effects for photo gallery feel */}
      <div className="absolute top-0 left-0 w-full h-32 animate-shimmer opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 animate-shimmer opacity-30" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Professional Header with Dark Theme */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#D6A33E] mb-8 tracking-wider">PORTFOLIO</h1>
          <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Explore our portfolio showcasing various photography styles and moments captured with passion, creativity, and artistic vision that tells your unique story.
          </p>
        </div>

        {/* Section Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveSection('photos')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeSection === 'photos'
                  ? 'bg-[#D6A33E] text-[#111111]'
                  : 'text-gray-300 hover:text-[#D6A33E]'
              }`}
            >
              <HiPhotograph className="w-5 h-5 mr-2" />
              Photos
            </button>
            <button
              onClick={() => setActiveSection('videos')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeSection === 'videos'
                  ? 'bg-[#D6A33E] text-[#111111]'
                  : 'text-gray-300 hover:text-[#D6A33E]'
              }`}
            >
              <HiDesktopComputer className="w-5 h-5 mr-2" />
              Videos
            </button>
          </div>
        </div>

        {/* Photos Section */}
        {activeSection === 'photos' && (
        <div>
        {/* Dark Theme Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {photoCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#D6A33E] text-[#111111]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
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
          {(selectedCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === selectedCategory)).map((image) => (
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
              
              {/* Dark Theme Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium mb-1">{image.title}</p>
                      <p className="text-xs text-[#D6A33E]">{image.category}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex items-center space-x-1">
                        <HiHeart className="w-4 h-4 text-[#D6A33E]" />
                        <span>{image.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiEye className="w-4 h-4 text-[#D6A33E]" />
                        <span>{image.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Theme Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-transparent border border-[#D6A33E] text-[#D6A33E] px-8 py-3 rounded-lg font-medium hover:bg-[#D6A33E] hover:text-[#111111] transition-colors duration-300">
            Load More
          </button>
        </div>
        </div>
        )}

        {/* Videos Section */}
        {activeSection === 'videos' && (
        <div>
        {/* Video Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {videoCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#D6A33E] text-[#111111]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(selectedCategory === 'All' ? galleryVideos : galleryVideos.filter(video => video.category === selectedCategory)).map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="group cursor-pointer relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-[#D6A33E] transition-all duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HiPlay className="w-8 h-8 text-[#111111] ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-[#D6A33E] text-sm mb-3">{video.category}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <HiHeart className="w-4 h-4 text-[#D6A33E]" />
                    <span>{video.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiEye className="w-4 h-4 text-[#D6A33E]" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-transparent border border-[#D6A33E] text-[#D6A33E] px-8 py-3 rounded-lg font-medium hover:bg-[#D6A33E] hover:text-[#111111] transition-colors duration-300">
            Load More Videos
          </button>
        </div>
        </div>
        )}

        {/* Dark Theme Call to Action */}
        <div className="text-center mt-16 p-8 border border-[#D6A33E] rounded-lg bg-[#111111]">
          <h2 className="text-2xl font-bold mb-4 text-[#D6A33E]">Love What You See?</h2>
          <p className="text-gray-300 mb-6">
            Let's create something beautiful together. Book your photography session today.
          </p>
          <a 
            href="#contact" 
            className="bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-lg font-semibold hover:bg-[#c1922f] transition-colors inline-block"
          >
            Book a Session
          </a>
        </div>
      </div>
    </div>
  )
}

export default GalleryPage
