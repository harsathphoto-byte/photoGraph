import { useState } from 'react'
import { HiCamera } from "@react-icons/all-files/hi/HiCamera"
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiColorSwatch } from "@react-icons/all-files/hi/HiColorSwatch"
import { HiBookOpen } from "@react-icons/all-files/hi/HiBookOpen"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiBriefcase } from "@react-icons/all-files/hi/HiBriefcase"
import { HiStar } from "@react-icons/all-files/hi/HiStar"
import { HiGlobe } from "@react-icons/all-files/hi/HiGlobe"
import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight"

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      icon: HiCamera,
      title: 'Wedding Photography',
      price: 'Starting ₹25,000',
      description: 'Capture your special day with stunning wedding photography that preserves every precious moment forever',
      features: ['Full day coverage', 'Pre-wedding shoot', 'Edited photos', 'Online gallery', 'Print options'],
      image: 'https://picsum.photos/400/300?random=41'
    },
    {
      icon: HiHeart,
      title: 'Portrait Sessions',
      price: 'Starting ₹8,000',
      description: 'Professional portrait photography for individuals, families, and corporate headshots with artistic flair',
      features: ['Studio/outdoor', '1-2 hour session', 'Multiple looks', 'High-res images', 'Retouching'],
      image: 'https://picsum.photos/400/300?random=42'
    },
    {
      icon: HiBriefcase,
      title: 'Commercial Shoots',
      price: 'Starting ₹15,000',
      description: 'Professional commercial photography for brands, products, and marketing campaigns with creative vision',
      features: ['Product photography', 'Brand campaigns', 'Social media content', 'Commercial license', 'Creative direction'],
      image: 'https://picsum.photos/400/300?random=43'
    },
    {
      icon: HiPlay,
      title: 'Video Production',
      price: 'Starting ₹20,000',
      description: 'Professional video editing and cinematography for events and promotional content with cinematic quality',
      features: ['4K recording', 'Drone footage', 'Color grading', 'Motion graphics', 'Professional editing'],
      image: 'https://picsum.photos/400/300?random=44'
    },
    {
      icon: HiColorSwatch,
      title: 'Photo Retouching',
      price: 'Starting ₹500/photo',
      description: 'Advanced photo editing and retouching services to enhance your images with artistic precision',
      features: ['Color correction', 'Skin retouching', 'Background removal', 'Creative editing', 'Fast delivery'],
      image: 'https://picsum.photos/400/300?random=45'
    },
    {
      icon: HiBookOpen,
      title: 'Custom Albums',
      price: 'Starting ₹5,000',
      description: 'Beautiful custom photo albums and books designed to preserve your memories with premium craftsmanship',
      features: ['Premium materials', 'Custom layouts', 'Various sizes', 'Gift packaging', 'Lifetime quality'],
      image: 'https://picsum.photos/400/300?random=46'
    },
    {
      icon: HiStar,
      title: 'Event Photography',
      price: 'Starting ₹12,000',
      description: 'Complete event coverage including corporate events, parties, and celebrations with professional storytelling',
      features: ['Full event coverage', 'Candid moments', 'Group photos', 'Same-day preview', 'Social media ready'],
      image: 'https://picsum.photos/400/300?random=47'
    },
    {
      icon: HiGlobe,
      title: 'Destination Shoots',
      price: 'Custom Quote',
      description: 'Travel photography and destination wedding coverage anywhere you need with adventure and elegance',
      features: ['Travel included', 'Multiple days', 'Location scouting', 'Adventure shoots', 'Local expertise'],
      image: 'https://picsum.photos/400/300?random=48'
    }
  ]

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-black via-black to-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp3D">
          <h2 className="text-4xl lg:text-6xl font-light tracking-wider text-white mb-6">
            Our Services
          </h2>
          <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Professional photography services tailored to your unique needs with 
            exceptional quality and artistic vision
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div 
                key={index} 
                className="group glass-card hover-lift overflow-hidden animate-fadeInUp3D"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 glass-golden rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl lg:text-2xl font-light tracking-wide text-[#B8860B] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#B8860B] font-light text-lg mb-4 tracking-wide">
                      {service.price}
                    </p>
                    <p className="text-gray-300 font-light leading-relaxed mb-6 tracking-wide">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-300 font-light">
                          <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-3 flex-shrink-0"></div>
                          <span className="tracking-wide text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-8">
                    <button className="w-full glass-dark border border-[#B8860B]/30 py-3 rounded-full font-light tracking-wider hover:glass-golden hover:border-[#B8860B] transition-all duration-500 group-hover:scale-105">
                      Book Now
                      <HiArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center animate-fadeInUp3D">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-light tracking-wider text-white mb-6">
              Need a Custom Package?
            </h3>
            <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Every project is unique. Let's discuss your specific requirements 
              and create a customized photography package that perfectly fits your vision and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="glass-golden px-12 py-4 rounded-full font-light tracking-wider hover-lift transition-all duration-500">
                Get Custom Quote
                <HiArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
              <button className="glass-dark border border-[#B8860B]/30 px-12 py-4 rounded-full font-light tracking-wider hover-lift transition-all duration-500">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
