import { useState } from 'react'
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiClock } from "@react-icons/all-files/hi/HiClock"
import { HiUser } from "@react-icons/all-files/hi/HiUser"
import { HiChat } from "@react-icons/all-files/hi/HiChat"
import { HiCalendar } from "@react-icons/all-files/hi/HiCalendar"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: HiPhone,
      title: 'Phone',
      info: '+91 98435 35984',
      subInfo: 'Available 9 AM - 8 PM',
      action: 'tel:+919843535984'
    },
    {
      icon: HiMail,
      title: 'Email',
      info: 'hello@harsathphotography.com',
      subInfo: 'Response within 24 hours',
      action: 'mailto:hello@harsathphotography.com'
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      info: 'Chennai, Tamil Nadu',
      subInfo: 'Serving all of India',
      action: '#'
    },
    {
      icon: HiClock,
      title: 'Business Hours',
      info: 'Mon - Sat: 9 AM - 8 PM',
      subInfo: 'Sunday: By appointment',
      action: '#'
    }
  ]

  const socialLinks = [
    { icon: FaInstagram, name: 'Instagram', link: 'https://www.instagram.com/harsath_photography', color: 'from-purple-500 to-pink-500' },
    { icon: FaWhatsapp, name: 'WhatsApp', link: '#', color: 'from-green-500 to-green-600' },
    
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you! Your message has been sent successfully.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <section id="contact" className="px-4 py-16 md:py-20 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B8860B] mb-4 relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            Ready to capture your special moments? Let's discuss your vision and create something amazing together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 border border-[#B8860B]/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <HiChat className="w-6 h-6 text-[#B8860B] mr-3" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#B8860B] text-sm font-medium mb-2">
                    <HiUser className="inline w-4 h-4 mr-1" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#B8860B] focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[#B8860B] text-sm font-medium mb-2">
                    <HiMail className="inline w-4 h-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#B8860B] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#B8860B] text-sm font-medium mb-2">
                    <HiPhone className="inline w-4 h-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#B8860B] focus:outline-none transition-colors"
                    placeholder="+91 98435 35984"
                  />
                </div>
                <div>
                  <label className="block text-[#B8860B] text-sm font-medium mb-2">
                    <HiCalendar className="inline w-4 h-4 mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white focus:border-[#B8860B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#B8860B] text-sm font-medium mb-2">
                  Service Required
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white focus:border-[#B8860B] focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="commercial">Commercial Shoot</option>
                  <option value="event">Event Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B8860B] text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-[#111111] border border-[#B8860B]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#B8860B] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project, vision, and any specific requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#B8860B] text-[#111111] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#DAA520] transition-all duration-300 shadow-lg hover:shadow-[#B8860B]/30 flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <HiMail className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <a
                    key={index}
                    href={info.action}
                    className="group bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#B8860B]/20 rounded-2xl p-6 hover:border-[#B8860B] hover:shadow-lg hover:shadow-[#B8860B]/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#B8860B] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-[#111111]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#B8860B] font-semibold text-lg mb-1">{info.title}</h3>
                        <p className="text-white font-medium">{info.info}</p>
                        <p className="text-gray-400 text-sm">{info.subInfo}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#B8860B]/20 rounded-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-4">Follow Us</h3>
              <p className="text-gray-300 mb-6">Stay updated with our latest work and behind-the-scenes content</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.link}
                      className={`group w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Booking */}
            <div className="bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-2xl p-6 text-center">
              <h3 className="text-[#111111] text-xl font-bold mb-2">Quick Booking</h3>
              <p className="text-[#111111]/80 mb-4">Need immediate assistance?</p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-[#111111] text-[#B8860B] py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] transition-colors">
                  Call Now
                </button>
                <button className="flex-1 bg-[#111111]/20 text-[#111111] py-3 rounded-lg font-semibold hover:bg-[#111111]/30 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
