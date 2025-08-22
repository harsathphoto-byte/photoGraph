const Gallery = () => {
  const galleryImages = [
    { id: 1, category: 'Wedding', src: '/api/placeholder/300/300' },
    { id: 2, category: 'Portrait', src: '/api/placeholder/300/300' },
    { id: 3, category: 'Event', src: '/api/placeholder/300/300' },
    { id: 4, category: 'Fashion', src: '/api/placeholder/300/300' },
    { id: 5, category: 'Nature', src: '/api/placeholder/300/300' },
    { id: 6, category: 'Commercial', src: '/api/placeholder/300/300' },
  ]

  return (
    <section id="gallery" className="px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D6A33E] mb-4">Categories</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore my diverse portfolio across different photography styles
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl border-2 border-[#D6A33E] aspect-square shadow-lg">
                <img 
                  src={image.src} 
                  alt={image.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#D6A33E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">View More</span>
                </div>
              </div>
              <p className="text-center text-sm mt-3 text-[#D6A33E] font-medium">{image.category}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-[#D6A33E] text-[#111111] px-8 md:px-12 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg">
            View Full Gallery →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
