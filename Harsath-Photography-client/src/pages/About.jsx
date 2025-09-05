const About = () => {
  return (
    <div className="bg-animated page-bg-about relative px-4 pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20 min-h-screen perspective-container">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#B8860B] mb-8 tracking-wider">ABOUT US</h1>
          <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
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
              <h3 className="text-[#B8860B] text-xl md:text-2xl font-light mb-2">Creative Photography</h3>
              <div className="w-16 h-0.5 bg-[#B8860B] mb-2"></div>
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#B8860B] mb-6 tracking-wide">Our Specializations</h2>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto"></div>
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
                <p className="text-[#B8860B] font-light tracking-wide">{service}</p>
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
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-[#B8860B] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm md:text-base font-light tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Section */}
        <div className="text-center mb-16 animate-fadeInUp3D animate-delay-700">
          <h3 className="text-2xl md:text-3xl font-light text-[#B8860B] mb-6 tracking-wide">FOLLOW US ON INSTAGRAM</h3>
          <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
          
          {/* Instagram Account Display */}
          <div className="max-w-md mx-auto">
            <div className="glass-dark rounded-2xl p-8 border border-[#B8860B]/30 shadow-2xl">
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#B8860B] shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop"
                  alt="Harsath Photography"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Account Info */}
              <h4 className="text-xl font-light text-[#B8860B] mb-2">@harsath_photography</h4>
              <p className="text-gray-300 mb-6 text-sm">
                Professional Wedding & Portrait Photography<br />
                📍 Coimbatore, Tamil Nadu<br />
                📸 Capturing timeless moments since 2016
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="text-lg font-light text-white">347</div>
                  <div className="text-xs text-gray-400">Posts</div>
                </div>
                <div>
                  <div className="text-lg font-light text-white">2.8K</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-light text-white">15.2K</div>
                  <div className="text-xs text-gray-400">Likes</div>
                </div>
              </div>
              
              {/* Follow Button */}
              <a 
                href="https://www.instagram.com/harsath_photography" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#111111] px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 hover-lift shadow-lg shadow-[#B8860B]/30"
              >
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
          
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light text-sm">
            Stay updated with our latest work and behind-the-scenes moments. Follow us for daily inspiration and recent photography sessions.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fadeInUp3D animate-delay-800">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#B8860B] mb-6 tracking-wide">Let's Create Something Beautiful Together</h2>
          <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Ready to capture your special moments? We'd love to discuss your photography needs and create something amazing together.
          </p>
        </div>

        <div className="mb-12 animate-fadeInUp3D animate-delay-400">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#B8860B] animate-slideIn3D">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-[#B8860B] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-100 perspective-container">
              <div className="mb-4 animate-float3D flex justify-center">
                <svg className="w-12 h-12 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#B8860B]">Vision</h3>
              <p className="text-gray-300 text-sm">
                Creating compelling visual narratives that capture the essence of every moment.
              </p>
            </div>
            <div className="text-center p-6 border border-[#B8860B] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-200 perspective-container">
              <div className="mb-4 animate-float3D animate-delay-100 flex justify-center">
                <svg className="w-12 h-12 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#B8860B]">Creativity</h3>
              <p className="text-gray-300 text-sm">
                Bringing artistic flair and innovative techniques to every project.
              </p>
            </div>
            <div className="text-center p-6 border border-[#B8860B] rounded-lg glass-dark hover-lift animate-fadeInUp3D animate-delay-300 perspective-container">
              <div className="mb-4 animate-float3D animate-delay-200 flex justify-center">
                <svg className="w-12 h-12 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#B8860B]">Partnership</h3>
              <p className="text-gray-300 text-sm">
                Working closely with clients to bring their vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center animate-fadeInUp3D animate-delay-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#B8860B] animate-slideIn3D">Let's Create Something Beautiful Together</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto animate-fadeInUp3D animate-delay-100">
            Ready to capture your special moments? I'd love to discuss your photography needs 
            and create something amazing together.
          </p>
          <a 
            href="#contact" 
            className="bg-[#B8860B] text-[#111111] px-8 py-3 rounded-full font-semibold hover:bg-[#DAA520] transition-colors inline-block"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
