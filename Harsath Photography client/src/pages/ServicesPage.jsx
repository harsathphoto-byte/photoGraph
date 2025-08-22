const ServicesPage = () => {
  const services = [
    {
      icon: '📸',
      title: 'Wedding Photography',
      description: 'Capture your special day with elegant and timeless wedding photography',
      features: ['Pre-wedding shoot', 'Ceremony coverage', 'Reception photography', 'Edited photos delivery'],
      price: 'Starting from ₹25,000'
    },
    {
      icon: '👤',
      title: 'Portrait Photography',
      description: 'Professional portraits for individuals, families, and corporate headshots',
      features: ['Studio or outdoor sessions', 'Professional lighting', 'Multiple outfit changes', 'Retouched images'],
      price: 'Starting from ₹5,000'
    },
    {
      icon: '🎉',
      title: 'Event Photography',
      description: 'Document your special events with professional event photography',
      features: ['Full event coverage', 'Candid moments', 'Group photos', 'Quick turnaround'],
      price: 'Starting from ₹8,000'
    },
    {
      icon: '👗',
      title: 'Fashion Photography',
      description: 'Creative fashion shoots for models, brands, and fashion enthusiasts',
      features: ['Concept development', 'Styling guidance', 'Professional editing', 'Portfolio ready images'],
      price: 'Starting from ₹10,000'
    },
    {
      icon: '🎬',
      title: 'Video Production',
      description: 'Professional video production and editing services',
      features: ['Event videography', 'Promotional videos', 'Music videos', 'Professional editing'],
      price: 'Starting from ₹15,000'
    },
    {
      icon: '✂️',
      title: 'Photo Editing',
      description: 'Advanced photo retouching and enhancement services',
      features: ['Color correction', 'Skin retouching', 'Background removal', 'Creative editing'],
      price: 'Starting from ₹100/photo'
    }
  ]

  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#D6A33E]">Photography Services</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Professional photography services tailored to capture your unique moments and bring your vision to life.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-[#D6A33E] font-bold text-xl mb-3 text-center">{service.title}</h3>
              <p className="text-gray-300 text-sm mb-4 text-center">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-center">
                    <span className="text-[#D6A33E] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                <p className="text-[#D6A33E] font-semibold mb-4">{service.price}</p>
                <button className="bg-[#D6A33E] text-[#111111] px-6 py-2 rounded-full font-semibold hover:bg-[#c1922f] transition-colors w-full">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#D6A33E]">My Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#111111] font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#D6A33E]">Consultation</h3>
              <p className="text-gray-300 text-sm">Discuss your vision and requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#111111] font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#D6A33E]">Planning</h3>
              <p className="text-gray-300 text-sm">Create a detailed shoot plan and timeline</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#111111] font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#D6A33E]">Shooting</h3>
              <p className="text-gray-300 text-sm">Professional photography session</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D6A33E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#111111] font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2 text-[#D6A33E]">Delivery</h3>
              <p className="text-gray-300 text-sm">Edited photos delivered on time</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 border border-[#D6A33E] rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#D6A33E]">Ready to Book Your Session?</h2>
          <p className="text-gray-300 mb-6">
            Let's discuss your photography needs and create something amazing together.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a 
              href="#contact" 
              className="bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-full font-semibold hover:bg-[#c1922f] transition-colors inline-block"
            >
              Get Quote
            </a>
            <a 
              href="tel:+91XXXXXXXXX" 
              className="border border-[#D6A33E] text-[#D6A33E] px-8 py-3 rounded-full font-semibold hover:bg-[#D6A33E] hover:text-[#111111] transition-colors inline-block"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
