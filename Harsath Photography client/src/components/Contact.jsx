const Contact = () => {
  return (
    <section id="contact" className="px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D6A33E] mb-4">Get In Touch</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to capture your special moments? Let's discuss your vision
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-xl p-6 hover:bg-[#D6A33E]/10 transition-colors">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-[#D6A33E] font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-300">+91 XXXXX XXXXX</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-xl p-6 hover:bg-[#D6A33E]/10 transition-colors">
            <div className="text-3xl mb-4">✉️</div>
            <h3 className="text-[#D6A33E] font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-300">hello@harsathphotography.com</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-xl p-6 hover:bg-[#D6A33E]/10 transition-colors">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-[#D6A33E] font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-300">Your City, India</p>
          </div>
        </div>
        
        <button className="bg-[#D6A33E] text-[#111111] px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg">
          Book a Session
        </button>
      </div>
    </section>
  )
}

export default Contact
