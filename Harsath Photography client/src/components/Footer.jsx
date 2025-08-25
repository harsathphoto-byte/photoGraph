import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiArrowUp } from "@react-icons/all-files/hi/HiArrowUp"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"

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
    <footer className="relative bg-gradient-to-b from-[#111111] to-[#0a0a0a] border-t border-[#D6A33E]/20">
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D6A33E] text-[#111111] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#c1922f] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#D6A33E]/30 z-10"
      >
        <HiArrowUp className="w-5 h-5" />
      </button>

      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#D6A33E] rounded-xl flex items-center justify-center">
                  <span className="text-[#111111] font-bold text-xl">HP</span>
                </div>
                <div>
                  <span className="text-[#D6A33E] font-bold text-2xl">HARSATH</span>
                  <span className="text-white font-bold text-2xl ml-2">PHOTOGRAPHY</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Capturing life's most precious moments with artistic excellence and professional dedication. 
                Creating <span className="text-[#D6A33E]">timeless memories</span> that last forever.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[#D6A33E] transition-colors">
                  <HiPhone className="w-5 h-5 text-[#D6A33E]" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[#D6A33E] transition-colors">
                  <HiMail className="w-5 h-5 text-[#D6A33E]" />
                  <span>hello@harsathphotography.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[#D6A33E] transition-colors">
                  <HiLocationMarker className="w-5 h-5 text-[#D6A33E]" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-[#D6A33E] font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-[#D6A33E] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-[#D6A33E] font-bold text-xl mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 hover:text-[#D6A33E] transition-colors duration-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Social Media & Newsletter */}
          <div className="border-t border-[#D6A33E]/20 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              
              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-center md:text-left">Follow Our Journey</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-[#1a1a1a] border border-[#D6A33E]/30 rounded-xl flex items-center justify-center text-gray-300 hover:bg-[#D6A33E] hover:text-[#111111] hover:border-[#D6A33E] transition-all duration-300 hover:scale-110 ${social.color}`}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="text-center md:text-right">
                <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                <div className="flex max-w-sm mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#D6A33E]/30 rounded-l-lg text-white placeholder-gray-400 focus:border-[#D6A33E] focus:outline-none"
                  />
                  <button className="bg-[#D6A33E] text-[#111111] px-6 py-3 rounded-r-lg font-semibold hover:bg-[#c1922f] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-[#D6A33E]/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>© 2025 Harsath Photography. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-[#D6A33E] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D6A33E] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#D6A33E] transition-colors">Cookie Policy</a>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <span>Made with</span>
                <HiHeart className="w-4 h-4 text-[#D6A33E] animate-pulse" />
                <span>in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#D6A33E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#D6A33E] rounded-full blur-3xl"></div>
      </div>
    </footer>
  )
}

export default Footer
