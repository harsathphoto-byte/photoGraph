const Services = () => {
  const services = [
    {
      icon: '📸',
      title: 'Photoshoot',
      description: 'Professional photography sessions for all occasions'
    },
    {
      icon: '🎬',
      title: 'Video Editing',
      description: 'Expert video editing and post-production services'
    },
    {
      icon: '✂️',
      title: 'Photo Editing',
      description: 'Advanced photo retouching and enhancement'
    },
    {
      icon: '📚',
      title: 'Albums',
      description: 'Beautiful custom photo albums and books'
    }
  ]

  return (
    <section id="services" className="px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D6A33E] mb-4">Services</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional photography services tailored to your unique needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-[#D6A33E] to-[#c1922f] rounded-2xl p-8 text-center hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300 service-card">
              <div className="text-4xl md:text-5xl mb-6">{service.icon}</div>
              <h3 className="text-[#111111] font-bold text-xl mb-4">{service.title}</h3>
              <p className="text-[#111111] text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
