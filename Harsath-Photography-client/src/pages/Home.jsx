import Hero from '../components/Hero'

const Home = ({ setCurrentPage }) => {
  return (
    <div className="bg-animated page-bg-home relative">
      {/* Enhanced Floating particles */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{ animationDelay: `${i * 2.1}s` }}></div>
        ))}
      </div>
      
      {/* Enhanced Glowing Background Effects */}
      <div className="bg-glow" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
      <div className="bg-glow-large" style={{ top: '40%', right: '10%', animationDelay: '2s' }}></div>
      <div className="bg-glow" style={{ bottom: '15%', left: '60%', animationDelay: '4s' }}></div>
      <div className="bg-orb-glow" style={{ top: '60%', left: '20%', animationDelay: '1s' }}></div>
      <div className="bg-orb-glow" style={{ bottom: '30%', right: '25%', animationDelay: '3s' }}></div>

      {/* Random Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ left: `${(i * 3.7) % 100}%`, animationDelay: `${i * 0.3}s` }}></div>
        ))}
      </div>
      
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Hero setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}

export default Home
