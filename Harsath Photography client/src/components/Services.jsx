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
      description: 'Capture your special day with stunning wedding photography that preserves every precious moment',
      features: ['Full day coverage', 'Pre-wedding shoot', 'Edited photos', 'Online gallery'],
      color: 'from-[#D6A33E] to-[#c1922f]'
    },
    {
      icon: HiHeart,
      title: 'Portrait Sessions',
      price: 'Starting ₹8,000',
      description: 'Professional portrait photography for individuals, families, and corporate headshots',
      features: ['Studio/outdoor', '1-2 hour session', 'Multiple looks', 'High-res images'],
      color: 'from-[#c1922f] to-[#D6A33E]'
    },
    {
      icon: HiBriefcase,
      title: 'Commercial Shoots',
      price: 'Starting ₹15,000',
      description: 'Professional commercial photography for brands, products, and marketing campaigns',
      features: ['Product photography', 'Brand campaigns', 'Social media content', 'Commercial license'],
      color: 'from-[#D6A33E] to-[#b8941a]'
    },
    {
      icon: HiPlay,
      title: 'Video Production',
      price: 'Starting ₹20,000',
      description: 'Professional video editing and cinematography for events and promotional content',
      features: ['4K recording', 'Drone footage', 'Color grading', 'Motion graphics'],
      color: 'from-[#b8941a] to-[#D6A33E]'
    },
    {
      icon: HiColorSwatch,
      title: 'Photo Retouching',
      price: 'Starting ₹500/photo',
      description: 'Advanced photo editing and retouching services to enhance your images',
      features: ['Color correction', 'Skin retouching', 'Background removal', 'Creative editing'],
      color: 'from-[#D6A33E] to-[#c1922f]'
    },
    {
      icon: HiBookOpen,
      title: 'Custom Albums',
      price: 'Starting ₹5,000',
      description: 'Beautiful custom photo albums and books designed to preserve your memories',
      features: ['Premium materials', 'Custom layouts', 'Various sizes', 'Gift packaging'],
      color: 'from-[#c1922f] to-[#D6A33E]'
    },
    {
      icon: HiStar,
      title: 'Event Photography',
      price: 'Starting ₹12,000',
      description: 'Complete event coverage including corporate events, parties, and celebrations',
      features: ['Full event coverage', 'Candid moments', 'Group photos', 'Same-day preview'],
      color: 'from-[#D6A33E] to-[#b8941a]'
    },
    {
      icon: HiGlobe,
      title: 'Destination Shoots',
      price: 'Custom Quote',
      description: 'Travel photography and destination wedding coverage anywhere you need',
      features: ['Travel included', 'Multiple days', 'Location scouting', 'Adventure shoots'],
      color: 'from-[#b8941a] to-[#D6A33E]'
    }
  ]

  return (
    <section id="services" className="px-4 py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6A33E] mb-4 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6A33E] to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            Professional photography services tailored to your unique needs with competitive pricing and exceptional quality
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div 
                key={index} 
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-8 text-center hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#D6A33E]/20 transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#111111] rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#111111] rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-[#111111]/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-[#111111]" />
                      </div>
                    </div>

                    {/* Title & Price */}
                    <div className="mb-4">
                      <h3 className="text-[#111111] font-bold text-xl mb-2">{service.title}</h3>
                      <div className="text-[#111111]/80 font-semibold text-lg">{service.price}</div>
                    </div>

                    {/* Description */}
                    <p className="text-[#111111]/80 text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className={`transition-all duration-500 ${
                      hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <ul className="text-[#111111] text-sm space-y-1 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#111111] rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-[#111111] text-[#D6A33E] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-center space-x-2 group/btn">
                      <span>Learn More</span>
                      <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 md:p-12 border border-[#D6A33E]/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your specific requirements and create a custom package that fits your needs and budget perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-[#D6A33E] text-[#111111] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#D6A33E]/30 flex items-center justify-center space-x-2">
              <span>Get Custom Quote</span>
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="border-2 border-[#D6A33E] text-[#D6A33E] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D6A33E] hover:text-[#111111] transition-all duration-300 flex items-center justify-center space-x-2">
              <span>View Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
