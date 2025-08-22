const Hero = () => {
  return (
    <section id="home" className="px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Logo and Branding */}
          <div className="text-center lg:text-left lg:flex-1 space-y-6">
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0 bg-[#D6A33E] rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-[#111111] font-bold text-5xl md:text-6xl lg:text-7xl">HP</span>
            </div>
            <div>
              <h1 className="text-[#D6A33E] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
                HP PHOTOGRAPHY
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 font-light">
                Every picture tells a story
              </p>
            </div>
          </div>

          {/* Photographer Profile */}
          <div className="lg:flex-1">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#D6A33E] shadow-2xl">
                <img 
                  src="/api/placeholder/350/350" 
                  alt="Harsath - Photographer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">I'm Harsath</h2>
                <p className="text-[#D6A33E] text-lg md:text-xl font-medium">Founder of Harsath Photography</p>
                <h3 className="text-[#D6A33E] text-xl md:text-2xl font-semibold">
                  Capturing Timeless Moments
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                  From heartfelt weddings to captivating portraits, I specialize in preserving your most precious memories with artistic flair and professional excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
