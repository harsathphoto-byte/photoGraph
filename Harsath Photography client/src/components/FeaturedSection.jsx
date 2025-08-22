const FeaturedSection = () => {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D6A33E]/20">
          <img 
            src="/api/placeholder/1000/600" 
            alt="Featured Photography Work" 
            className="w-full h-72 md:h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="text-center mt-8">
          <button className="bg-[#D6A33E] text-[#111111] px-8 md:px-12 py-4 rounded-full font-semibold text-lg hover:bg-[#c1922f] hover:scale-105 transition-all duration-300 shadow-lg">
            Explore Videos ▷
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
