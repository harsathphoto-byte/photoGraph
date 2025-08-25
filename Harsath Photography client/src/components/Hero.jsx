import { useState, useEffect } from 'react'
import { HiPlay } from "@react-icons/all-files/hi/HiPlay"
import { HiCamera } from "@react-icons/all-files/hi/HiCamera"
import { HiDesktopComputer } from "@react-icons/all-files/hi/HiDesktopComputer"
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph"
import { HiCollection } from "@react-icons/all-files/hi/HiCollection"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiMail } from "@react-icons/all-files/hi/HiMail"

const Hero = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCategoryClick = (path) => {
    if (path.includes('gallery')) {
      setCurrentPage('gallery')
    }
  }

  return (
    <>
      {/* Clean Layout - Removing Duplicate Header */}
      <section className="bg-[#111111] min-h-screen px-4 sm:px-6 lg:px-12 xl:px-16 pb-6 pt-20">
        
        {/* Harsath Profile Section - Clean Integration */}
        <div className="text-center mb-8 lg:mb-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[#D6A33E] mb-4 hover:border-[#c1922f] transition-all duration-300 shadow-2xl">
              <img 
                src="/api/placeholder/160/160" 
                alt="Harsath - Photographer" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Harsath</h2>
            <p className="text-[#D6A33E] text-base lg:text-lg font-medium mb-6">Founder & Lead Photographer</p>
          </div>
          
          <h3 className="text-[#D6A33E] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Capturing Timeless Moments
          </h3>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed px-2 sm:px-4 lg:px-0 max-w-4xl mx-auto">
            Specialized in wedding art and timeless photography for modern couples worldwide. Every frame tells your unique story.
          </p>
        </div>

        {/* Full-Screen Video Section with Glowing Effect */}
        <div className="mb-10 max-w-7xl mx-auto">
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D6A33E] via-[#f4c97d] to-[#D6A33E] rounded-3xl blur-lg opacity-75 animate-pulse"></div>
            
            {/* Video container with enhanced styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-black border-4 border-[#D6A33E]/80">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/api/placeholder/1200/675"
                >
                  <source src="/path/to/your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            {/* Additional glow effects */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-[#D6A33E]/10 blur-2xl -z-10"></div>
          </div>
          
          {/* Centered Explore Button */}
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-[#111111] px-12 py-4 lg:px-16 lg:py-5 rounded-full font-bold text-lg lg:text-xl flex items-center space-x-4 mx-auto hover:from-[#c1922f] hover:to-[#D6A33E] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#D6A33E]/50 border-2 border-[#D6A33E]/50">
              <HiPhotograph className="w-6 h-6 lg:w-8 lg:h-8" />
              <span>Explore Photography</span>
            </button>
          </div>
        </div>

        {/* Categories Section - Full Width */}
        <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/90 rounded-3xl p-8 lg:p-12 border border-[#D6A33E]/30 shadow-2xl max-w-7xl mx-auto mb-12">
          <h4 className="text-[#D6A33E] text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">Categories</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Wedding', path: '/gallery?category=wedding' },
              { name: 'Baby Shoots', path: '/gallery?category=baby-shoots' },
              { name: 'Fashion', path: '/gallery?category=fashion' },
              { name: 'Engagement', path: '/gallery?category=engagement' },
              { name: 'New Born', path: '/gallery?category=new-born' },
              { name: 'Events', path: '/gallery?category=events' }
            ].map((category, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer"
                onClick={() => handleCategoryClick(category.path)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-3 border-[#D6A33E]/60 group-hover:border-[#D6A33E] transition-all duration-500 bg-gradient-to-br from-[#D6A33E]/40 to-[#D6A33E]/60 flex items-center justify-center group-hover:from-[#D6A33E]/70 group-hover:to-[#D6A33E]/90 group-hover:scale-110 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#D6A33E]/30">
                  <div className="text-center">
                    <img 
                      src="/api/placeholder/120/120" 
                      alt={category.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg mx-auto mb-2"
                    />
                    <span className="text-white font-bold text-sm lg:text-base text-center group-hover:text-[#111111] transition-colors leading-tight">
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button 
              className="bg-[#D6A33E] text-[#111111] px-10 py-4 lg:px-14 lg:py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-[#c1922f] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#D6A33E]/40 border-2 border-[#D6A33E]/50"
              onClick={() => handleCategoryClick('/gallery')}
            >
              More →
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/90 rounded-3xl p-8 lg:p-12 border border-[#D6A33E]/30 shadow-2xl max-w-7xl mx-auto mb-12">
          <h4 className="text-[#D6A33E] text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 text-center">Services</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Frames', 
                description: 'Custom quality frames to preserve your most precious memories',
                icon: <HiPhotograph className="w-8 h-8" />
              },
              { 
                name: 'Video Editing', 
                description: 'Professional storytelling through cinematic video edits',
                icon: <HiDesktopComputer className="w-8 h-8" />
              },
              { 
                name: 'Photo Editing', 
                description: 'High-end retouching & color grading to enhance your perfect shot',
                icon: <HiCamera className="w-8 h-8" />
              },
              { 
                name: 'Albums', 
                description: 'Handcrafted premium albums with timeless design',
                icon: <HiCollection className="w-8 h-8" />
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-[#D6A33E]/80 to-[#c1922f]/80 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D6A33E]/30 cursor-pointer"
              >
                <div className="text-[#111111] mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h5 className="text-[#111111] font-bold text-lg lg:text-xl mb-3">{service.name}</h5>
                <p className="text-[#111111]/80 text-sm lg:text-base leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/90 rounded-3xl p-8 lg:p-12 border border-[#D6A33E]/30 shadow-2xl max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '500+', label: 'Events Captured' },
              { number: '8+', label: 'Years of Experience' },
              { number: '200+', label: 'Wedding Events' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-[#D6A33E] text-4xl lg:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg lg:text-xl font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Stats Section - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 max-w-7xl mx-auto">
          
          {/* Services Section */}
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-4 lg:p-6 border border-[#D6A33E]/20">
            <h4 className="text-[#D6A33E] text-base lg:text-lg xl:text-xl font-semibold mb-4 text-center">Our Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {[
                { 
                  name: 'Frames', 
                  icon: HiCamera,
                  description: 'Custom luxury frames'
                },
                { 
                  name: 'Video Editing', 
                  icon: HiDesktopComputer,
                  description: 'Cinematic video edits'
                },
                { 
                  name: 'Photo Editing', 
                  icon: HiPhotograph,
                  description: 'Professional retouching'
                },
                { 
                  name: 'Albums', 
                  icon: HiCollection,
                  description: 'Premium album design'
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="bg-[#D6A33E] rounded-xl p-3 lg:p-4 hover:bg-[#c1922f] transition-all duration-300 cursor-pointer hover:scale-105 shadow-md"
                  onClick={() => setCurrentPage('services')}
                >
                  <div className="flex items-start space-x-2 lg:space-x-3">
                    <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#111111] flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[#111111] font-semibold text-sm lg:text-base mb-1">{service.name}</h5>
                      <p className="text-[#111111]/80 text-xs lg:text-sm leading-tight">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-4 lg:p-6 border border-[#D6A33E]/20 flex items-center">
            <div className="w-full">
              <h4 className="text-[#D6A33E] text-base lg:text-lg xl:text-xl font-semibold mb-6 text-center">Our Achievements</h4>
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {[
                  { number: '500+', label: 'Events Captured' },
                  { number: '8+', label: 'Years Experience' },
                  { number: '200+', label: 'Wedding Events' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#D6A33E] mb-2 group-hover:text-[#c1922f]">{stat.number}</div>
                    <div className="text-gray-400 text-xs lg:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Packages Section - Full Width */}
        <div className="bg-[#1a1a1a]/50 rounded-2xl p-4 lg:p-6 border border-[#D6A33E]/20 max-w-7xl mx-auto mb-8">
            <h4 className="text-[#D6A33E] text-base lg:text-lg xl:text-xl font-semibold mb-4 text-center">Photography Packages</h4>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: 'Budget',
                  price: '₹53K',
                  features: ['Wedding Album', '2 Frames', 'HD Video', 'Calendar'],
                  popular: false
                },
                {
                  name: 'Couple',
                  price: '₹90K',
                  features: ['2 Albums', '4 Frames', 'HD Video', '2 Calendars'],
                  popular: true
                },
                {
                  name: 'Elite Plus',
                  price: '₹1.59L',
                  features: ['Premium Albums', '4 Frames', 'HD Video', 'Mini Album'],
                  popular: false
                }
              ].map((pkg, index) => (
                <div key={index} className={`bg-[#D6A33E] rounded-xl p-4 lg:p-5 hover:bg-[#c1922f] transition-all duration-300 hover:scale-105 shadow-md relative ${pkg.popular ? 'ring-2 ring-[#c1922f] transform scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#c1922f] text-[#111111] px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h5 className="text-[#111111] font-bold text-base lg:text-lg mb-2">{pkg.name}</h5>
                    <div className="text-[#111111] text-xl lg:text-2xl xl:text-3xl font-bold">{pkg.price}</div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {pkg.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-[#111111]/80 text-sm lg:text-base">
                        <span className="mr-2 text-[#111111] font-bold">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-[#111111] text-[#D6A33E] py-2 lg:py-3 rounded-lg font-semibold text-sm lg:text-base hover:bg-gray-900 transition-colors duration-300">
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>

        {/* Contact & Action Section - Full Width Layout */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Call to Action - Centered */}
          <div className="text-center bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 lg:p-8 border border-[#D6A33E]/20">
            <h4 className="text-[#D6A33E] text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">Ready to Capture Your Story?</h4>
            <p className="text-gray-300 text-sm lg:text-base mb-6 max-w-2xl mx-auto">
              Let's create timeless memories together. Book your consultation today and let's discuss your photography needs.
            </p>
            <button 
              className="bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-[#111111] px-10 py-4 lg:px-12 lg:py-5 rounded-full font-semibold text-base lg:text-lg hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg"
              onClick={() => setCurrentPage('contact')}
            >
              <span>Let's Plan Your Event</span>
              <span>→</span>
            </button>
          </div>

          {/* Contact Details & Map - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-[#D6A33E] to-[#c1922f] rounded-2xl p-6 lg:p-8 shadow-lg">
              <h4 className="text-[#111111] text-lg lg:text-xl xl:text-2xl font-semibold mb-6 text-center">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <HiLocationMarker className="w-6 h-6 lg:w-7 lg:h-7 text-[#111111] flex-shrink-0" />
                  <span className="text-[#111111] text-sm lg:text-base font-medium">No.8, Canara Bank Opp, Ugur, Coimbatore</span>
                </div>
                <div className="flex items-center space-x-4">
                  <HiPhone className="w-6 h-6 lg:w-7 lg:h-7 text-[#111111] flex-shrink-0" />
                  <span className="text-[#111111] text-sm lg:text-base font-medium">+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-4">
                  <HiMail className="w-6 h-6 lg:w-7 lg:h-7 text-[#111111] flex-shrink-0" />
                  <span className="text-[#111111] text-sm lg:text-base font-medium">harsath@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-2xl overflow-hidden h-64 lg:h-80 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3178280179554!2d77.06162707486052!3d11.014763389148861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857de0c2b4bdd%3A0x30eaf141a2f2f635!2sHarsath%20photography!5e0!3m2!1sen!2sin!4v1756100919775!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:brightness-110 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero
