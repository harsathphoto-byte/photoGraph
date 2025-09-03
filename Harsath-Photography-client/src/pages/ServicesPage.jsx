const ServicesPage = () => {
  const services = [
    {
      image: 'https://picsum.photos/400/300?random=31',
      title: 'Wedding Photography',
      description: 'Capture your special day with elegant and timeless wedding photography that tells your unique love story.'
    },
    {
      image: 'https://picsum.photos/400/300?random=32',
      title: 'Portrait Photography',
      description: 'Professional portraits for individuals, families, and corporate headshots with artistic flair.'
    },
    {
      image: 'https://picsum.photos/400/300?random=33',
      title: 'Event Photography',
      description: 'Document your special events with professional event photography and candid storytelling.'
    },
    {
      image: 'https://picsum.photos/400/300?random=34',
      title: 'Fashion Photography',
      description: 'Creative fashion shoots for models, brands, and fashion enthusiasts with modern aesthetics.'
    },
    {
      image: 'https://picsum.photos/400/300?random=35',
      title: 'Video Production',
      description: 'Professional video production and editing services for all occasions and commercial needs.'
    },
    {
      image: 'https://picsum.photos/400/300?random=36',
      title: 'Photo Editing',
      description: 'Advanced photo retouching and enhancement services to make your images truly exceptional.'
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
              <span className="block text-[#B8860B] font-light">Services</span>
            </h1>
            <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
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
            <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
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
                  <h3 className="text-2xl font-light tracking-wide text-[#B8860B] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed mb-8 tracking-wide">
                    {service.description}
                  </p>
                  
                  <div className="text-center">
                    <button className="glass-golden px-8 py-3 rounded-full font-light tracking-wider hover-lift transition-all duration-300">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Packages Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 shadow-lg animate-fadeInUp3D animate-delay-600">
            <div className="text-center mb-12">
              <h4 className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#B8860B] mb-6 tracking-wider">PHOTOGRAPHY PACKAGES</h4>
              <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                Choose from our carefully crafted packages designed to capture your special moments
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  name: 'Essential',
                  price: '₹53,000',
                  features: ['Wedding Album', '2 Premium Frames', 'HD Video Coverage', 'Custom Calendar','Candid Photography'],
                  popular: false,
                  description: 'Perfect for intimate celebrations'
                },
                {
                  name: 'Premium',
                  price: '₹90,000',
                  features: ['2 Wedding Albums', '4 Premium Frames', 'Cinematic Video', '2 Custom Calendars', 'Online Gallery'],
                  popular: true,
                  description: 'Most popular choice for couples'
                },
                {
                  name: 'Luxury',
                  price: '₹1,59,000',
                  features: ['Premium Albums', '6 Luxury Frames', 'Cinematic Production', 'Mini Albums', 'Drone Coverage'],
                  popular: false,
                  description: 'Complete luxury experience'
                }
              ].map((pkg, index) => (
                <div key={index} className={`glass-dark rounded-2xl p-8 hover-lift cursor-pointer animate-fadeInUp3D animate-delay-${(index + 1) * 100} relative ${pkg.popular ? 'ring-2 ring-[#B8860B] transform scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#B8860B] text-[#111111] px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">MOST POPULAR</div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h5 className="text-[#B8860B] font-light text-2xl mb-2 tracking-wide">{pkg.name}</h5>
                    <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mb-4"></div>
                    <div className="text-white text-3xl lg:text-4xl font-light mb-2 tracking-wide">{pkg.price}</div>
                    <p className="text-gray-400 text-sm font-light">{pkg.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-gray-300 text-sm lg:text-base">
                        <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-4 flex-shrink-0"></div>
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="group w-full bg-gradient-to-br from-[#B8860B] to-[#CD853F] text-[#111111] py-3 lg:py-4 rounded-full font-medium text-base lg:text-lg hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#B8860B]/30 hover:shadow-xl hover:shadow-[#B8860B]/50 border border-[#B8860B]/30 hover-lift relative overflow-hidden tracking-wider"
                    style={{
                      boxShadow: `
                        0 4px 15px rgba(214, 163, 62, 0.3),
                        0 2px 10px rgba(214, 163, 62, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                      `
                    }}
                  >
                    <span className="relative z-10">SELECT PACKAGE</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              ))}
            </div>
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
            <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
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
                    <span className="text-2xl font-light tracking-wider text-[#B8860B]">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-light tracking-wide text-[#B8860B] mb-4">
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
              <span className="block text-[#B8860B]">Something Beautiful?</span>
            </h2>
            <div className="w-24 h-px bg-[#B8860B] mx-auto mb-8"></div>
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
                className="glass-dark px-12 py-4 rounded-full font-light tracking-wider hover-lift transition-all duration-300 border border-[#B8860B]/30"
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
