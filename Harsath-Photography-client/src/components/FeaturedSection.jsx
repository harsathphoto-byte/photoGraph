import { useState } from 'react'
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiEye } from "@react-icons/all-files/hi/HiEye"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiStar } from "@react-icons/all-files/hi/HiStar"
import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight"

const FeaturedSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  const featuredWorks = [
    {
      id: 1,
      type: 'photo',
      title: 'Romantic Beach Wedding',
      category: 'Wedding Photography',
      image: 'https://picsum.photos/600/400?random=70',
      views: '2.5K',
      likes: '489',
      rating: 4.9
    },
    {
      id: 2,
      type: 'video',
      title: 'Cinematic Wedding Highlights',
      category: 'Wedding Videography',
      image: 'https://picsum.photos/600/400?random=71',
      views: '8.2K',
      likes: '1.2K',
      rating: 5.0,
      duration: '3:45'
    },
    {
      id: 3,
      type: 'photo',
      title: 'Corporate Brand Shoot',
      category: 'Commercial Photography',
      image: 'https://picsum.photos/600/400?random=72',
      views: '1.8K',
      likes: '324',
      rating: 4.8
    }
  ]

  return (
    <section className="px-4 py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111111] perspective-container">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp3D">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6A33E] mb-4 relative">
              Featured Work
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6A33E] to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            Showcasing our most celebrated photography and videography projects that have captured hearts and won awards
          </p>
        </div>

        {/* Main Featured Work */}
        <div className="mb-16">
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D6A33E]/20 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src="https://picsum.photos/1200/700?random=73" 
              alt="Featured Photography Work" 
              className="w-full h-72 md:h-96 lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/50 to-transparent transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-60'
            }`}>
              {/* Play Button for Main Video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-20 h-20 md:w-24 md:h-24 bg-[#D6A33E] rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'scale-110 shadow-2xl shadow-[#D6A33E]/50' : 'scale-100'
                }`}>
                  <HiPlay className="w-8 h-8 md:w-10 md:h-10 text-[#111111] ml-1" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-[#D6A33E] text-[#111111] px-4 py-2 rounded-full text-sm font-bold">
                        FEATURED
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar key={i} className="w-4 h-4 text-[#D6A33E] fill-current" />
                        ))}
                        <span className="text-white ml-2 text-sm">Award Winner</span>
                      </div>
                    </div>
                    <h3 className="text-white text-2xl md:text-4xl font-bold mb-2">
                      Cinematic Wedding Story
                    </h3>
                    <p className="text-gray-300 text-lg mb-4 max-w-2xl">
                      A breathtaking wedding film that captures the essence of love, joy, and celebration in stunning detail
                    </p>
                    <div className="flex items-center space-x-6 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <HiEye className="w-5 h-5 text-[#D6A33E]" />
                        <span>15.3K views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HiHeart className="w-5 h-5 text-[#D6A33E]" />
                        <span>2.8K likes</span>
                      </div>
                      <span>Duration: 8:42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredWorks.map((work, index) => (
            <div 
              key={work.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#D6A33E]/20 group-hover:border-[#D6A33E] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#D6A33E]/20">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Video Overlay */}
                  {work.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center">
                        <HiPlay className="w-6 h-6 text-[#111111] ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Duration Badge */}
                  {work.duration && (
                    <div className="absolute top-4 right-4 bg-[#111111]/80 text-white px-2 py-1 rounded text-sm">
                      {work.duration}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D6A33E] text-[#111111] px-3 py-1 rounded-full text-sm font-medium">
                      {work.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#D6A33E] transition-colors">
                    {work.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <HiEye className="w-4 h-4" />
                        <span>{work.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiHeart className="w-4 h-4" />
                        <span>{work.likes}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <HiStar className="w-4 h-4 text-[#D6A33E] fill-current" />
                      <span className="text-[#D6A33E] font-medium text-sm">{work.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 md:p-12 border border-[#D6A33E]/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Create Your Story?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's work together to create stunning visuals that capture your unique moments and tell your story in the most beautiful way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-[#D6A33E] text-[#111111] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#D6A33E]/30 flex items-center justify-center space-x-2">
              <HiPlay className="w-5 h-5" />
              <span>Watch Our Showreel</span>
            </button>
            <button className="group border-2 border-[#D6A33E] text-[#D6A33E] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-300 flex items-center justify-center space-x-2">
              <span>View Full Portfolio</span>
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
