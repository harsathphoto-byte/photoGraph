const About = () => {
  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#D6A33E]">About Harsath Photography</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border-4 border-[#D6A33E]">
              <img 
                src="/api/placeholder/400/320" 
                alt="Harsath at work" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#D6A33E]">My Story</h2>
            <p className="text-gray-300 mb-4">
              Welcome to Harsath Photography, where every frame tells a unique story. I'm Harsath, 
              the founder and lead photographer behind this creative journey.
            </p>
            <p className="text-gray-300 mb-4">
              With over 5 years of experience in the photography industry, I specialize in capturing 
              life's most precious moments - from intimate weddings to corporate events, fashion shoots 
              to family portraits.
            </p>
            <p className="text-gray-300 mb-6">
              My passion lies in creating timeless memories that you'll treasure forever. Every photo 
              session is approached with creativity, professionalism, and attention to detail.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-[#D6A33E] rounded-lg p-4">
                <h3 className="text-[#111111] font-bold text-2xl">500+</h3>
                <p className="text-[#111111] text-sm">Happy Clients</p>
              </div>
              <div className="bg-[#D6A33E] rounded-lg p-4">
                <h3 className="text-[#111111] font-bold text-2xl">5+</h3>
                <p className="text-[#111111] text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#D6A33E]">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Vision</h3>
              <p className="text-gray-300 text-sm">
                Creating compelling visual narratives that capture the essence of every moment.
              </p>
            </div>
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Creativity</h3>
              <p className="text-gray-300 text-sm">
                Bringing artistic flair and innovative techniques to every project.
              </p>
            </div>
            <div className="text-center p-6 border border-[#D6A33E] rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2 text-[#D6A33E]">Partnership</h3>
              <p className="text-gray-300 text-sm">
                Working closely with clients to bring their vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#D6A33E]">Let's Create Something Beautiful Together</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
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
