import { useState } from 'react'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Fashion', 'Nature', 'Commercial']
  
  const galleryImages = [
    { id: 1, category: 'Wedding', src: '/api/placeholder/400/300', title: 'Beautiful Wedding Ceremony' },
    { id: 2, category: 'Portrait', src: '/api/placeholder/400/300', title: 'Professional Portrait' },
    { id: 3, category: 'Event', src: '/api/placeholder/400/300', title: 'Corporate Event' },
    { id: 4, category: 'Fashion', src: '/api/placeholder/400/300', title: 'Fashion Shoot' },
    { id: 5, category: 'Nature', src: '/api/placeholder/400/300', title: 'Nature Photography' },
    { id: 6, category: 'Commercial', src: '/api/placeholder/400/300', title: 'Product Photography' },
    { id: 7, category: 'Wedding', src: '/api/placeholder/400/300', title: 'Wedding Reception' },
    { id: 8, category: 'Portrait', src: '/api/placeholder/400/300', title: 'Family Portrait' },
    { id: 9, category: 'Event', src: '/api/placeholder/400/300', title: 'Birthday Celebration' },
    { id: 10, category: 'Fashion', src: '/api/placeholder/400/300', title: 'Editorial Fashion' },
    { id: 11, category: 'Nature', src: '/api/placeholder/400/300', title: 'Landscape Photography' },
    { id: 12, category: 'Commercial', src: '/api/placeholder/400/300', title: 'Brand Photography' },
  ]

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory)

  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#D6A33E]">Photography Gallery</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore my portfolio showcasing various photography styles and moments captured with passion and creativity.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#D6A33E] text-[#111111]'
                  : 'bg-transparent border border-[#D6A33E] text-[#D6A33E] hover:bg-[#D6A33E] hover:text-[#111111]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg border-2 border-[#D6A33E] aspect-[4/3]">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#D6A33E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-full font-semibold hover:bg-[#c1922f] transition-colors">
            Load More Photos
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 border border-[#D6A33E] rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#D6A33E]">Love What You See?</h2>
          <p className="text-gray-300 mb-6">
            Let's create something beautiful together. Book your photography session today.
          </p>
          <a 
            href="#contact" 
            className="bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-full font-semibold hover:bg-[#c1922f] transition-colors inline-block"
          >
            Book a Session
          </a>
        </div>
      </div>
    </div>
  )
}

export default GalleryPage
