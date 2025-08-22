const Footer = () => {
  return (
    <footer className="bg-[#D6A33E] px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center">
              <span className="text-[#D6A33E] font-bold text-lg">HP</span>
            </div>
            <span className="text-[#111111] font-bold text-xl">PHOTOGRAPHY</span>
          </div>
          
          <p className="text-[#111111] text-sm mb-6 max-w-md mx-auto">
            Capturing life's most precious moments with artistic excellence and professional dedication.
          </p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-[#111111] hover:text-[#111111]/80 transition-colors font-medium">Instagram</a>
            <a href="#" className="text-[#111111] hover:text-[#111111]/80 transition-colors font-medium">Facebook</a>
            <a href="#" className="text-[#111111] hover:text-[#111111]/80 transition-colors font-medium">WhatsApp</a>
          </div>
          
          <div className="border-t border-[#111111]/20 pt-4">
            <p className="text-[#111111] text-sm">
              © 2025 Harsath Photography. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
