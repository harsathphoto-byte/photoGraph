import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! I will get back to you soon.')
  }

  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#D6A33E]">Get In Touch</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Ready to capture your special moments? Let's discuss your photography needs and create something beautiful together.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#D6A33E]">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
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

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E]"
                  placeholder="Tell me about your project, vision, or any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D6A33E] text-[#111111] px-8 py-3 rounded-lg font-semibold hover:bg-[#c1922f] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#D6A33E]">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#111111] text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D6A33E] mb-1">Phone</h3>
                  <p className="text-gray-300">+91 XXXXX XXXXX</p>
                  <p className="text-gray-400 text-sm">Available 9 AM - 8 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#111111] text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D6A33E] mb-1">Email</h3>
                  <p className="text-gray-300">hello@harsathphotography.com</p>
                  <p className="text-gray-400 text-sm">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#111111] text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D6A33E] mb-1">Location</h3>
                  <p className="text-gray-300">Your City, India</p>
                  <p className="text-gray-400 text-sm">Available for travel</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h3 className="font-semibold text-[#D6A33E] mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center hover:bg-[#c1922f] transition-colors">
                  <span className="text-[#111111] text-xl">📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center hover:bg-[#c1922f] transition-colors">
                  <span className="text-[#111111] text-xl">📘</span>
                </a>
                <a href="#" className="w-12 h-12 bg-[#D6A33E] rounded-full flex items-center justify-center hover:bg-[#c1922f] transition-colors">
                  <span className="text-[#111111] text-xl">💬</span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6">
              <h3 className="font-semibold text-[#D6A33E] mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-gray-300">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-gray-300">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-300">By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#D6A33E]">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6">
              <h3 className="font-semibold text-[#D6A33E] mb-2">How far in advance should I book?</h3>
              <p className="text-gray-300 text-sm">I recommend booking at least 2-4 weeks in advance, especially for weddings and special events.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6">
              <h3 className="font-semibold text-[#D6A33E] mb-2">Do you travel for shoots?</h3>
              <p className="text-gray-300 text-sm">Yes, I'm available for travel photography within the region. Travel charges may apply for distant locations.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6">
              <h3 className="font-semibold text-[#D6A33E] mb-2">How long until I receive my photos?</h3>
              <p className="text-gray-300 text-sm">Edited photos are typically delivered within 1-2 weeks, depending on the scope of the project.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#D6A33E] rounded-lg p-6">
              <h3 className="font-semibold text-[#D6A33E] mb-2">What's included in your packages?</h3>
              <p className="text-gray-300 text-sm">Packages include the photo session, professional editing, and digital delivery. Physical prints available separately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
