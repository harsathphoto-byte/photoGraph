const ServicesPage = () => {
  const services = [
    {
      image: 'https://picsum.photos/400/300?random=31',
      title: 'Wedding Photography',
      description: 'Capture your special day with elegant and timeless wedding photography that tells your unique love story.',
      features: ['Pre-wedding shoot', 'Ceremony coverage', 'Reception photography', 'Edited photos delivery', 'Online gallery'],
      price: 'Starting from ₹25,000'
    },
    {
      image: 'https://picsum.photos/400/300?random=32',
      title: 'Portrait Photography',
      description: 'Professional portraits for individuals, families, and corporate headshots with artistic flair.',
      features: ['Studio or outdoor sessions', 'Professional lighting', 'Multiple outfit changes', 'Retouched images', 'Print options'],
      price: 'Starting from ₹5,000'
    },
    {
      image: 'https://picsum.photos/400/300?random=33',
      title: 'Event Photography',
      description: 'Document your special events with professional event photography and candid storytelling.',
      features: ['Full event coverage', 'Candid moments', 'Group photos', 'Quick turnaround', 'Social media ready'],
      price: 'Starting from ₹8,000'
    },
    {
      image: 'https://picsum.photos/400/300?random=34',
      title: 'Fashion Photography',
      description: 'Creative fashion shoots for models, brands, and fashion enthusiasts with modern aesthetics.',
      features: ['Concept development', 'Styling guidance', 'Professional editing', 'Portfolio ready images', 'Commercial use'],
      price: 'Starting from ₹10,000'
    },
    {
      image: 'https://picsum.photos/400/300?random=35',
      title: 'Video Production',
      description: 'Professional video production and editing services for all occasions and commercial needs.',
      features: ['Event videography', 'Promotional videos', 'Music videos', 'Professional editing', '4K quality'],
      price: 'Starting from ₹15,000'
    },
    {
      image: 'https://picsum.photos/400/300?random=36',
      title: 'Photo Editing',
      description: 'Advanced photo retouching and enhancement services to make your images truly exceptional.',
      features: ['Color correction', 'Skin retouching', 'Background removal', 'Creative editing', 'Fast delivery'],
      price: 'Starting from ₹100/photo'
    }
  ]

  return (
    <div className="min-h-screen bg-animated page-bg-services">
      {/* Enhanced Glowing Background Effects */}
      <div className="bg-glow" style={{ top: '15%', left: '5%', animationDelay: '0s' }}></div>
      <div className="bg-glow-large" style={{ top: '45%', right: '8%', animationDelay: '2s' }}></div>
      <div className="bg-glow" style={{ bottom: '20%', left: '50%', animationDelay: '4s' }}></div>
      <div className="bg-orb-glow" style={{ top: '70%', left: '20%', animationDelay: '1s' }}></div>
      <div className="bg-orb-glow" style={{ top: '25%', right: '15%', animationDelay: '3s' }}></div>

      {/* Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ left: `${(i * 6.5) % 100}%`, animationDelay: `${i * 0.5}s` }}></div>
        ))}
      </div>

      {/* Background Animation Elements */}
      <div className="floating-particle" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="floating-particle" style={{ left: '20%', animationDelay: '2s' }}></div>
      <div className="floating-particle" style={{ left: '30%', animationDelay: '4s' }}></div>
      <div className="floating-particle" style={{ left: '70%', animationDelay: '1s' }}></div>
      <div className="floating-particle" style={{ left: '80%', animationDelay: '3s' }}></div>
      <div className="floating-particle" style={{ left: '90%', animationDelay: '5s' }}></div>
      
      {/* Golden Glow Effects */}
      <div className="bg-glow" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
      <div className="bg-glow" style={{ top: '60%', right: '20%', animationDelay: '3s' }}></div>
      <div className="bg-glow" style={{ bottom: '10%', left: '50%', animationDelay: '6s' }}></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-amber-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp3D">
            <h1 className="text-5xl lg:text-7xl font-light tracking-wider text-white mb-6">
              Photography
              <span className="block text-[#D6A33E] font-light">Services</span>
            </h1>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
              Professional photography services tailored to capture your unique moments 
              and bring your vision to life with exceptional artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp3D">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Our Services
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto tracking-wide">
              Comprehensive photography solutions for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group glass-card hover-lift overflow-hidden animate-fadeInUp3D"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-light tracking-wide text-[#D6A33E] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed mb-6 tracking-wide">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 font-light">
                        <div className="w-2 h-2 bg-[#D6A33E] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#D6A33E] font-light text-lg tracking-wide">
                      {service.price}
                    </span>
                    <button className="glass-golden px-6 py-2 rounded-full font-light tracking-wider hover-lift transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-amber-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp3D">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Our Process
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto tracking-wide">
              A seamless journey from concept to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Discuss your vision and requirements in detail' },
              { step: '02', title: 'Planning', desc: 'Create a detailed shoot plan and timeline' },
              { step: '03', title: 'Shooting', desc: 'Professional photography session with artistic direction' },
              { step: '04', title: 'Delivery', desc: 'Expertly edited photos delivered on schedule' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center group animate-fadeInUp3D"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto glass-golden rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-light tracking-wider text-black">
                      {item.step}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#D6A33E]/50 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-light tracking-wide text-[#D6A33E] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed tracking-wide">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 animate-fadeInUp3D">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Ready to Create
              <span className="block text-[#D6A33E]">Something Beautiful?</span>
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Let's discuss your photography needs and create something amazing together. 
              Every moment deserves to be captured with perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#contact" 
                className="glass-golden px-12 py-4 rounded-full font-light tracking-wider hover-lift transition-all duration-300"
              >
                Get Quote
              </a>
              <a 
                href="tel:+91XXXXXXXXX" 
                className="glass-dark px-12 py-4 rounded-full font-light tracking-wider hover-lift transition-all duration-300 border border-[#D6A33E]/30"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default ServicesPage;