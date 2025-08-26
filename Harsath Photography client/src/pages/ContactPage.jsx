import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! I will get back to you soon.");

    // ✅ Reset form after submit
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-animated page-bg-contact">
      {/* Enhanced Glowing Background Effects */}
      <div className="bg-glow" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
      <div className="bg-glow-large" style={{ bottom: '30%', right: '15%', animationDelay: '3s' }}></div>
      <div className="bg-orb-glow" style={{ top: '60%', left: '70%', animationDelay: '1.5s' }}></div>
      <div className="bg-orb-glow" style={{ top: '15%', right: '25%', animationDelay: '4s' }}></div>

      {/* Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ left: `${(i * 8) % 100}%`, animationDelay: `${i * 0.6}s` }}></div>
        ))}
      </div>

      {/* Background Animation Elements */}
      <div className="bg-orb" style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
      <div className="bg-orb" style={{ top: '70%', right: '15%', animationDelay: '2s' }}></div>
      <div className="bg-orb" style={{ bottom: '20%', left: '50%', animationDelay: '4s' }}></div>
      
      {/* Gradient Wave */}
      <div className="gradient-wave"></div>
      
      {/* Grid Lines */}
      <div className="grid-lines"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-amber-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-light tracking-wider text-white mb-6">
            Let&apos;s Create
            <span className="block text-[#D6A33E]">Together</span>
          </h1>
          <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
          <p className="text-xl lg:text-2xl font-light text-gray-300 max-w-3xl mx-auto">
            Ready to capture your special moments? Let&apos;s discuss your
            photography needs and create something beautiful together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-light mb-6">Send a Message</h2>
            <div className="w-16 h-px bg-[#D6A33E] mb-6"></div>
            <p className="text-lg font-light text-gray-300 mb-8">
              Share your vision with us and let&apos;s bring it to life
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Photography</option>
                    <option value="event">Event Photography</option>
                    <option value="fashion">Fashion Photography</option>
                    <option value="video">Video Production</option>
                    <option value="editing">Photo Editing</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm mb-2">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/40 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#D6A33E] focus:bg-[#222222] transition-all duration-300"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#D6A33E] py-3 rounded-lg font-medium text-black hover:bg-[#c2922f] transition"
              >
                Send Message
              </button>
            </form>

            {/* Follow Us - Moved below form */}
            <div className="mt-12">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-light text-[#D6A33E] mb-6">Follow Us</h3>
                <div className="w-16 h-px bg-[#D6A33E] mb-6"></div>
                <div className="flex space-x-4 justify-center">
                  <a href="#" className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center hover:bg-[#D6A33E]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center hover:bg-[#D6A33E]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.436-2.878-2.436-4.632 0-3.78 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 23.998 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center hover:bg-[#D6A33E]/30 transition-colors">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & Additional Sections */}
          <div className="space-y-12">
            {/* Contact Information */}
            

            {/* Contact Information */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-3xl font-light text-[#D6A33E] mb-6 tracking-wide">Get In Touch</h3>
              <div className="w-16 h-px bg-[#D6A33E] mb-8"></div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#D6A33E] font-light text-lg mb-2">Studio Address</h4>
                    <p className="text-gray-300 font-light leading-relaxed">
                      No.8, Canara Bank Opp<br />
                      Ugur, Coimbatore<br />
                      Tamil Nadu - 641017
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#D6A33E] font-light text-lg mb-2">Phone</h4>
                    <p className="text-gray-300 font-light">+91 9876543210</p>
                    <p className="text-gray-400 text-sm">Available 9 AM - 8 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D6A33E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#D6A33E] font-light text-lg mb-2">Email</h4>
                    <p className="text-gray-300 font-light">harsath@photography.com</p>
                    <p className="text-gray-400 text-sm">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-light text-[#D6A33E] mb-6">Quick Contact</h3>
              <div className="w-16 h-px bg-[#D6A33E] mb-6"></div>
              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-center space-x-3 p-4 bg-[#D6A33E]/10 rounded-lg hover:bg-[#D6A33E]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">Call Now</span>
                </a>
                <a href="https://wa.me/919876543210" className="flex items-center space-x-3 p-4 bg-green-600/20 rounded-lg hover:bg-green-600/30 transition-colors">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-gray-300">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-light text-[#D6A33E] mb-6">Business Hours</h3>
              <div className="w-16 h-px bg-[#D6A33E] mb-6"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-[#D6A33E]">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-[#D6A33E]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-400">By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#111111] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Frequently Asked
              <span className="block text-[#D6A33E]">Questions</span>
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about our photography services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "How far in advance should I book?",
                answer: "For weddings and major events, we recommend booking 3-6 months in advance. For portrait sessions and smaller events, 2-4 weeks notice is usually sufficient."
              },
              {
                question: "What's included in your wedding packages?",
                answer: "Our wedding packages include pre-wedding consultation, full day coverage, edited high-resolution photos, online gallery, and basic retouching. Premium packages include albums and additional services."
              },
              {
                question: "Do you provide raw/unedited photos?",
                answer: "We provide professionally edited photos as our final deliverables. Raw files are available for an additional fee upon request."
              },
              {
                question: "How long does it take to receive photos?",
                answer: "Portrait sessions: 1-2 weeks. Weddings and events: 4-6 weeks. We provide a sneak peek gallery within 48-72 hours for weddings."
              },
              {
                question: "Do you travel for destination shoots?",
                answer: "Yes! We love destination photography. Travel fees may apply depending on the location. Contact us to discuss your destination shoot requirements."
              },
              {
                question: "What if weather affects our outdoor shoot?",
                answer: "We monitor weather closely and will suggest rescheduling if needed. We also have backup indoor locations and covered areas for unexpected weather changes."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-light text-[#D6A33E] mb-4">{faq.question}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Location Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Visit Our
              <span className="block text-[#D6A33E]">Studio</span>
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto">
              Located in the heart of Coimbatore, our studio is equipped with state-of-the-art equipment and comfortable spaces for all your photography needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#D6A33E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H7a2 2 0 01-2-2m2-7h.01M17 14h.01M17 17h.01M17 10h.01M7 14h.01M7 17h.01M7 10h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-[#D6A33E] mb-2">Professional Studio</h3>
              <p className="text-gray-300 text-sm">Fully equipped with professional lighting and backdrops</p>
            </div>
            
            <div className="glass-card p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#D6A33E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-[#D6A33E] mb-2">Prime Location</h3>
              <p className="text-gray-300 text-sm">Easy access with ample parking space</p>
            </div>
            
            <div className="glass-card p-6 text-center rounded-xl">
              <div className="w-16 h-16 bg-[#D6A33E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D6A33E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-[#D6A33E] mb-2">Flexible Hours</h3>
              <p className="text-gray-300 text-sm">Extended hours available for your convenience</p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3178280179554!2d77.06162707486052!3d11.014763389148861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857de0c2b4bdd%3A0x30eaf141a2f2f635!2sHarsath%20photography!5e0!3m2!1sen!2sin!4v1756100919775!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{border: 0, filter: 'grayscale(0.3) contrast(1.2)'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#D6A33E]/10 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-white mb-6">
              Ready to Create
              <span className="block text-[#D6A33E]">Something Beautiful?</span>
            </h2>
            <div className="w-24 h-px bg-[#D6A33E] mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Don't wait to capture your precious moments. Our calendar fills up quickly, especially during wedding season. Book your consultation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:+919876543210" 
                className="bg-[#D6A33E] text-black px-12 py-4 rounded-full font-light tracking-wider hover:bg-[#c1922f] transition-all duration-300 shadow-lg"
              >
                Call Now
              </a>
              <a 
                href="https://wa.me/919876543210" 
                className="bg-transparent border border-[#D6A33E] text-[#D6A33E] px-12 py-4 rounded-full font-light tracking-wider hover:bg-[#D6A33E] hover:text-black transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default ContactPage;
