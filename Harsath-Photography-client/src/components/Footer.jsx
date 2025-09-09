import { HiMail } from "@react-icons/all-files/hi/HiMail"
import { HiPhone } from "@react-icons/all-files/hi/HiPhone"
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker"
import { HiHeart } from "@react-icons/all-files/hi/HiHeart"
import { HiArrowUp } from "@react-icons/all-files/hi/HiArrowUp"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube"
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
    'Photo Editing'
  ]

  const socialLinks = [
    { 
      icon: FaInstagram, 
      name: 'Instagram', 
      href: 'https://www.instagram.com/harsath_photography', 
      defaultColor: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-orange-600'
    },
    { 
      icon: FaWhatsapp, 
      name: 'WhatsApp', 
      href: 'https://wa.me/919843535984', 
      defaultColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    { 
      icon: FaFacebook, 
      name: 'Facebook', 
      href: 'https://www.facebook.com/share/17MLGEb5YH/?mibextid=wwXIfr', 
      defaultColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    { 
      icon: FaYoutube, 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@harsathphotography', 
      defaultColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700'
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-black to-black/95 border-t border-[#B8860B]/10">
      
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
                  <div className="text-[#B8860B] font-light text-lg tracking-wider -mt-1">PHOTOGRAPHY</div>
                </div>
              </div>
              
              <p className="text-gray-300 font-light text-lg leading-relaxed mb-8 max-w-lg tracking-wide">
                Capturing life's most precious moments with artistic excellence and professional dedication. 
                Creating <span className="text-[#B8860B]">timeless memories</span> that last forever.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#B8860B] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiPhone className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">+91 98435 35984</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#B8860B] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">harsathphotography@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-[#B8860B] transition-colors duration-500 group">
                  <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center group-hover:glass-golden transition-all duration-500">
                    <HiLocationMarker className="w-5 h-5" />
                  </div>
                  <span className="font-light tracking-wide">Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-[#B8860B] font-light text-2xl tracking-wider mb-8">Navigation</h3>
              <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-[#B8860B] transition-all duration-500 hover:translate-x-2 transform inline-block font-light tracking-wide hover-lift"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-[#B8860B] font-light text-2xl tracking-wider mb-8">Services</h3>
              <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 hover:text-[#B8860B] transition-colors duration-500 font-light tracking-wide">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Social Media & Newsletter */}
          <div className="border-t border-[#B8860B]/10 pt-12 mb-12">
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
                        className={`w-14 h-14 ${social.defaultColor} ${social.hoverColor} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-500 hover-lift border border-transparent shadow-lg`}
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
          <div className="border-t border-[#B8860B]/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2 text-gray-300 font-light tracking-wide">
                <span>© 2025 {config.APP_NAME}. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-8 text-gray-400 font-light tracking-wide">
                <a href="#" className="hover:text-[#B8860B] transition-colors duration-500">Privacy Policy</a>
                <a href="#" className="hover:text-[#B8860B] transition-colors duration-500">Terms of Service</a>
                <a href="#" className="hover:text-[#B8860B] transition-colors duration-500">Cookie Policy</a>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300 font-light tracking-wide">
                <span>Made with</span>
                <HiHeart className="w-5 h-5 text-[#B8860B] animate-pulse" />
                <span>in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-[#B8860B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#B8860B] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#B8860B] rounded-full blur-3xl"></div>
      </div>
    </footer>
  )
}

export default Footer
