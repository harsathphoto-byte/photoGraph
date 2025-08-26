const About = () => {
  return (
    <div className="bg-animated page-bg-about relative px-4 py-12 md:py-16 lg:py-20 min-h-screen perspective-container">
      {/* Enhanced Glowing Background Effects */}
      <div className="bg-glow" style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
      <div className="bg-glow-large" style={{ top: '50%', right: '5%', animationDelay: '3s' }}></div>
      <div className="bg-orb-glow" style={{ bottom: '20%', left: '30%', animationDelay: '1.5s' }}></div>
      <div className="bg-orb-glow" style={{ top: '30%', right: '40%', animationDelay: '4s' }}></div>

      {/* Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ left: `${(i * 7) % 100}%`, animationDelay: `${i * 0.5}s` }}></div>
        ))}
      </div>

      {/* Background orbs */}
      <div className="bg-orb bg-orb-1 animate-subtle-pulse"></div>
      <div className="bg-orb bg-orb-2 animate-subtle-pulse delay-400"></div>
      
      {/* Grid lines for professional look */}
      <div className="grid-lines"></div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Professional Header */}
        <div className="text-center mb-16 animate-fadeInUp3D">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#D6A33E] mb-8 tracking-wider">ABOUT US</h1>
          <div className="w-24 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
        </div>

        {/* Main Content Section */}
        <div className="mb-16 animate-fadeInUp3D animate-delay-200">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 font-light">
              In the bustling city of Coimbatore, wedding photography finds its muse in timeless traditions and vibrant celebrations. With a decade of experience, our photography studio has been privileged to document countless love stories, weaving them into visual narratives that stand the test of time.
            </p>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="mb-16 animate-fadeInUp3D animate-delay-300">
          <div className="relative rounded-2xl overflow-hidden glass-dark hover-lift perspective-container max-w-5xl mx-auto">
            <img 
              src="https://picsum.photos/1200/600?random=50" 
              alt="Harsath Photography - Creative Wedding Photography" 
              className="w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-[#D6A33E] text-xl md:text-2xl font-light mb-2">Creative Photography</h3>
              <div className="w-16 h-0.5 bg-[#D6A33E] mb-2"></div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto mb-16 animate-fadeInUp3D animate-delay-400">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Our journey is one of passion and dedication, capturing the essence of each couple's unique bond against the backdrop of Coimbatore's picturesque landscapes and cultural heritage. From intimate moments to grand ceremonies, we specialize in candid shots that encapsulate raw emotions and fleeting glances.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              With a keen eye for detail and a commitment to excellence, we ensure that every frame tells a story, preserving cherished memories for generations to come. Our team combines technical expertise with artistic flair, delivering breathtaking images that evoke laughter, tears, and everything in between.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
              As Coimbatore's trusted wedding photography partner, we embark on each assignment with enthusiasm and reverence, honoring the sanctity of love and the beauty of union through our lens.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16 animate-fadeInUp3D animate-delay-500">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#D6A33E] mb-6 tracking-wide">Our Specializations</h2>
            <div className="w-16 h-0.5 bg-[#D6A33E] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              'Creative Weddings',
              'Post Wedding',
              'Maternity',
              'Baby Shoot',
              'Kids Portrait',
              'Family Portrait',
              'Bridal Portraits',
              'Indoor & Outdoor'
            ].map((service, index) => (
              <div key={index} className={`text-center p-4 glass-dark rounded-lg hover-lift animate-fadeInUp3D animate-delay-${(index + 1) * 100}`}>
                <p className="text-[#D6A33E] font-light tracking-wide">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16 animate-fadeInUp3D animate-delay-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Happy Couples' },
              { number: '8+', label: 'Years Experience' },
              { number: '200+', label: 'Wedding Events' },
              { number: '50+', label: 'Awards Won' }
            ].map((stat, index) => (
              <div key={index} className={`text-center glass-dark rounded-xl p-6 hover-lift animate-pulse3D animate-delay-${(index + 1) * 100}`}>
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-[#D6A33E] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm md:text-base font-light tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Section */}
        <div className="text-center mb-16 animate-fadeInUp3D animate-delay-700">
          <h3 className="text-2xl md:text-3xl font-light text-[#D6A33E] mb-6 tracking-wide">FOLLOW US ON INSTAGRAM</h3>
          <div className="w-16 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className={`aspect-square overflow-hidden rounded-lg hover-lift animate-fadeInUp3D animate-delay-${(index + 1) * 50}`}>
                <img 
                  src={`https://picsum.photos/300/300?random=${index + 100}`}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <a 
            href="https://www.instagram.com/harsath_photography" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-[#111111] px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 hover-lift"
          >
            View on Instagram
          </a>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fadeInUp3D animate-delay-800">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#D6A33E] mb-6 tracking-wide">Let's Create Something Beautiful Together</h2>
          <div className="w-16 h-0.5 bg-[#D6A33E] mx-auto mb-8"></div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Ready to capture your special moments? We'd love to discuss your photography needs and create something amazing together.
          </p>
        </div>

        <div className="mb-12 animate-fadeInUp3D animate-delay-400">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#D6A33E] animate-slideIn3D">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-100 perspective-container">
              <div className="text-4xl mb-4 animate-float3D">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Vision</h3>
              <p className="text-gray-300 text-sm">
                Creating compelling visual narratives that capture the essence of every moment.
              </p>
            </div>
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-200 perspective-container">
              <div className="text-4xl mb-4 animate-float3D animate-delay-100">💫</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Creativity</h3>
              <p className="text-gray-300 text-sm">
                Bringing artistic flair and innovative techniques to every project.
              </p>
            </div>
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-300 perspective-container">
              <div className="text-4xl mb-4 animate-float3D animate-delay-200">🤝</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Partnership</h3>
              <p className="text-gray-300 text-sm">
                Working closely with clients to bring their vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center animate-fadeInUp3D animate-delay-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#D6A33E] animate-slideIn3D">Let's Create Something Beautiful Together</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto animate-fadeInUp3D animate-delay-100">
            Ready to capture your special moments? I'd love to discuss your photography needs 
            and create something amazing together.
          </p>
          <a 
            href="#contact" 
            className="bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-full font-semibold hover:bg-[#c1922f] transition-colors inline-block"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
