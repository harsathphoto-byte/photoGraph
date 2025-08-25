import { useState } from 'react'
import { HiEye } from "@react-icons/all-files/hi/HiEye"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight"

const Gallery = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const galleryImages = [
    { id: 1, category: 'Wedding', src: '/api/placeholder/400/400', title: 'Romantic Wedding', likes: 124 },
    { id: 2, category: 'Portrait', src: '/api/placeholder/400/500', title: 'Professional Portrait', likes: 89 },
    { id: 3, category: 'Event', src: '/api/placeholder/500/400', title: 'Corporate Event', likes: 156 },
    { id: 4, category: 'Fashion', src: '/api/placeholder/400/600', title: 'Fashion Shoot', likes: 203 },
    { id: 5, category: 'Nature', src: '/api/placeholder/600/400', title: 'Landscape Beauty', likes: 178 },
    { id: 6, category: 'Commercial', src: '/api/placeholder/400/400', title: 'Brand Campaign', likes: 145 },
    { id: 7, category: 'Wedding', src: '/api/placeholder/500/600', title: 'Destination Wedding', likes: 267 },
    { id: 8, category: 'Portrait', src: '/api/placeholder/400/500', title: 'Creative Portrait', likes: 98 },
  ]

  const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Fashion', 'Nature', 'Commercial']

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <section id="gallery" className="px-4 py-16 md:py-20 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6A33E] mb-4 relative">
              Portfolio Gallery
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6A33E] to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            Explore my diverse portfolio showcasing different photography styles and capturing life's most beautiful moments
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#D6A33E] text-[#111111] shadow-lg shadow-[#D6A33E]/30 scale-105'
                  : 'bg-[#1a1a1a] text-gray-300 border border-[#D6A33E]/30 hover:bg-[#D6A33E]/10 hover:text-[#D6A33E] hover:border-[#D6A33E]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`group cursor-pointer transition-all duration-500 ${
                index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#D6A33E]/20 aspect-square group-hover:border-[#D6A33E] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#D6A33E]/20">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/50 to-transparent transition-all duration-500 ${
                  hoveredId === image.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#D6A33E] text-[#111111] px-3 py-1 rounded-full text-sm font-medium">
                        {image.category}
                      </span>
                      <div className="flex items-center space-x-1 text-[#D6A33E]">
                        <HiHeart className="w-4 h-4" />
                        <span className="text-sm">{image.likes}</span>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3">{image.title}</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 bg-[#D6A33E] text-[#111111] px-4 py-2 rounded-full font-medium hover:bg-[#c1922f] transition-colors">
                        <HiEye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <HiHeart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#111111]/80 backdrop-blur-sm text-[#D6A33E] px-3 py-1 rounded-full text-sm font-medium border border-[#D6A33E]/30">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 md:p-12 border border-[#D6A33E]/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            See More Amazing Work
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover hundreds of stunning photographs in my complete portfolio gallery
          </p>
          <button className="group bg-[#D6A33E] text-[#111111] px-8 md:px-12 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#D6A33E]/30 flex items-center space-x-2 mx-auto">
            <span>View Full Gallery</span>
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
