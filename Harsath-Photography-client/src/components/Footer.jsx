import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiArrowUp } from "@react-icons/all-files/hi/HiArrowUp"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { config } from '../config/env'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Wedding Photography',
    'Portrait Sessions',
    'Commercial Shoots',
    'Event Coverage',
    'Photo Editing',
    'Video Production'
  ]

  const socialLinks = [
    { icon: FaInstagram, name: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: FaFacebook, name: 'Facebook', href: '#', color: 'hover:text-blue-400' },
    { icon: FaWhatsapp, name: 'WhatsApp', href: '#', color: 'hover:text-green-400' },
    { icon: FaTwitter, name: 'Twitter', href: '#', color: 'hover:text-blue-300' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-black to-black/95 border-t border-[#D6A33E]/10">
      
      {/* Back to Top Button - Enhanced */}
      <button
        onClick={scrollToTop}
        className="group absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#D6A33E] to-[#B8922A] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center hover:from-[#c1922f] hover:to-[#A6821F] transition-all duration-300 hover:scale-110 shadow-lg shadow-[#D6A33E]/30 hover:shadow-xl hover:shadow-[#D6A33E]/50 border border-[#D6A33E]/30 z-20 overflow-hidden hover:-translate-y-1"
        style={{
          boxShadow: `
            0 4px 15px rgba(214, 163, 62, 0.3),
            0 2px 10px rgba(214, 163, 62, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `
        }}
        aria-label="Scroll to top"
      >
        <HiArrowUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#D6A33E]/20 animate-ping group-hover:animate-none"></div>
      </button>

      <div className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 glass-golden rounded-full flex items-center justify-center">
                  <span className="text-black font-light text-2xl tracking-wider">HP</span>
                </div>
                <div>
                  <div className="text-white font-light text-3xl tracking-wider">HARSATH</div>
                  <div className="text-[#D6A33E] font-light text-lg tracking-wider -mt-1">PHOTOGRAPHY</div>
                </div>
              </div>
              
              <p className="text-gray-300 font-light text-lg leading-relaxed mb-8 max-w-lg tracking-wide">
                Capturing life's most precious moments with artistic excellence and professional dedication. 
                Creating <span className="text-[#D6A33E]">timeless memories</span> that last forever.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#D6A33E] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiPhone className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#D6A33E] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">hello@harsathphotography.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#D6A33E] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiLocationMarker className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-[#D6A33E] font-light text-2xl tracking-wider mb-8">Navigation</h3>
              <div className="w-12 h-px bg-[#D6A33E] mb-6"></div>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-[#D6A33E] transition-all duration-500 hover:translate-x-2 transform inline-block font-light tracking-wide hover-lift"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-[#D6A33E] font-light text-2xl tracking-wider mb-8">Services</h3>
              <div className="w-12 h-px bg-[#D6A33E] mb-6"></div>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 hover:text-[#D6A33E] transition-colors duration-500 font-light tracking-wide">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Social Media & Newsletter */}
          <div className="border-t border-[#D6A33E]/10 pt-12 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              
              {/* Social Media */}
              <div>
                <h4 className="text-white font-light text-xl tracking-wider mb-6 text-center md:text-left">Follow Our Journey</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-14 h-14 glass-dark rounded-full flex items-center justify-center text-gray-300 hover:glass-golden hover:text-black hover:scale-110 transition-all duration-500 hover-lift"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-6 h-6" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-[#D6A33E]/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2 text-gray-300 font-light tracking-wide">
                <span>© 2025 {config.APP_NAME}. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-8 text-gray-400 font-light tracking-wide">
                <a href="#" className="hover:text-[#D6A33E] transition-colors duration-500">Privacy Policy</a>
                <a href="#" className="hover:text-[#D6A33E] transition-colors duration-500">Terms of Service</a>
                <a href="#" className="hover:text-[#D6A33E] transition-colors duration-500">Cookie Policy</a>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300 font-light tracking-wide">
                <span>Made with</span>
                <HiHeart className="w-5 h-5 text-[#D6A33E] animate-pulse" />
                <span>in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-[#D6A33E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#D6A33E] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#D6A33E] rounded-full blur-3xl"></div>
      </div>
    </footer>
  )
}

export default Footer
