import { useState, useEffect } from 'react';
import InstagramPosts from '../components/InstagramPosts';
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph";
import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import { HiUserGroup } from "@react-icons/all-files/hi/HiUserGroup";
import { HiStar } from "@react-icons/all-files/hi/HiStar";
import { HiEye } from "@react-icons/all-files/hi/HiEye";

const FollowPage = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [stats, setStats] = useState({
    followers: '2.8K',
    posts: '347',
    following: '127',
    likes: '15.2K'
  });

  // Add a subtle animation effect for stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        // Simulate small real-time changes
        followers: Math.random() > 0.8 ? '2.8K' : '2.8K',
        likes: Math.random() > 0.9 ? '15.3K' : '15.2K'
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'latest', label: 'Latest Posts', icon: HiPhotograph },
    { id: 'popular', label: 'Most Popular', icon: HiHeart },
    { id: 'behind-scenes', label: 'Behind the Scenes', icon: HiEye }
  ];

  // Simulated Instagram highlights/categories that match the total posts count
  const highlights = [
    {
      id: 1,
      title: 'Weddings',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=80&h=80&fit=crop',
      count: '124 posts'
    },
    {
      id: 2,
      title: 'Portraits',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c3434db2?w=80&h=80&fit=crop',
      count: '89 posts'
    },
    {
      id: 3,
      title: 'Baby Shoots',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop',
      count: '56 posts'
    },
    {
      id: 4,
      title: 'Traditional',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=80&h=80&fit=crop',
      count: '45 posts'
    },
    {
      id: 5,
      title: 'Events',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=80&h=80&fit=crop',
      count: '33 posts'
    }
  ];

  return (
    <div className="bg-[#111111] min-h-screen px-4 pt-32 lg:pt-40 pb-12 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className="bg-glow-large" style={{ top: '60%', right: '10%', animationDelay: '2s' }}></div>
        <div className="bg-orb-glow" style={{ bottom: '15%', left: '25%', animationDelay: '1s' }}></div>
      </div>

      {/* Sprinkle Effects */}
      <div className="sprinkles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="sprinkle" style={{ 
            left: `${(i * 5) % 100}%`, 
            animationDelay: `${i * 0.3}s`,
            top: `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInUp3D">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#B8860B] mb-8 tracking-wider">
            FOLLOW OUR JOURNEY
          </h1>
          <div className="w-24 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Stay connected with Harsath Photography and discover the latest moments we've captured. 
            From wedding magic to precious family memories, follow our Instagram for daily inspiration.
          </p>
        </div>

        {/* Instagram Profile Info */}
        <div className="glass-dark rounded-3xl p-8 lg:p-12 border border-[#B8860B]/30 shadow-2xl mb-12 animate-fadeInUp3D animate-delay-200">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[#B8860B] shadow-2xl hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop"
                  alt="Harsath Photography"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-light text-[#B8860B] mb-4 tracking-wide">
                @harsath_photography
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                🏆 Award-winning photographer in Coimbatore<br />
                📸 Specializing in weddings, portraits & events<br />
                ✨ Capturing timeless moments since 2016<br />
                📍 Based in Coimbatore, Tamil Nadu<br />
                📞 Call: +91 98435 35984
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  { icon: HiPhotograph, label: 'Posts', value: stats.posts },
                  { icon: HiUserGroup, label: 'Followers', value: stats.followers },
                  { icon: HiHeart, label: 'Likes', value: stats.likes },
                  { icon: HiStar, label: 'Following', value: stats.following }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-[#B8860B]" />
                    </div>
                    <div className="text-xl lg:text-2xl font-light text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Follow Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://www.instagram.com/harsath_photography" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#111111] px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 hover-lift shadow-lg shadow-[#B8860B]/30"
                >
                  <HiPhotograph className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                </a>
                
                <a 
                  href="tel:+919843535984"
                  className="inline-flex items-center space-x-3 bg-transparent border-2 border-[#B8860B] text-[#B8860B] px-8 py-3 rounded-full font-medium tracking-wide hover:bg-[#B8860B] hover:text-[#111111] transition-all duration-300"
                >
                  <span>Book a Session</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="mb-12 animate-fadeInUp3D animate-delay-300">
          <h3 className="text-xl lg:text-2xl font-light text-[#B8860B] mb-6 text-center">Photography Categories</h3>
          <div className="flex justify-center space-x-6 overflow-x-auto pb-4">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="flex-shrink-0 text-center group cursor-pointer">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-3 border-[#B8860B] mb-3 hover:border-[#DAA520] transition-all duration-300 hover:scale-110">
                  <img 
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm text-gray-300 group-hover:text-[#B8860B] transition-colors">
                  {highlight.title}
                </div>
                <div className="text-xs text-gray-500">
                  {highlight.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 animate-fadeInUp3D animate-delay-400">
          <div className="flex justify-center space-x-1 bg-[#1a1a1a] rounded-full p-2 max-w-md mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#B8860B] text-[#111111] shadow-lg'
                    : 'text-gray-400 hover:text-[#B8860B] hover:bg-[#B8860B]/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="animate-fadeInUp3D animate-delay-500">
          {activeTab === 'latest' && (
            <div>
              <h3 className="text-xl lg:text-2xl font-light text-[#B8860B] mb-4 text-center">Latest Posts</h3>
              <p className="text-gray-400 text-center mb-8">Recent uploads from @harsath_photography • {stats.posts} total posts</p>
              <InstagramPosts 
                postsToShow={18}
                showStats={true}
                showCaptions={false}
                gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
              />
            </div>
          )}
          
          {activeTab === 'popular' && (
            <div>
              <h3 className="text-xl lg:text-2xl font-light text-[#B8860B] mb-4 text-center">Most Popular Posts</h3>
              <p className="text-gray-400 text-center mb-8">Top-performing content with highest engagement • Sorted by likes</p>
              <InstagramPosts 
                postsToShow={12}
                showStats={true}
                showCaptions={true}
                gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              />
            </div>
          )}
          
          {activeTab === 'behind-scenes' && (
            <div>
              <h3 className="text-xl lg:text-2xl font-light text-[#B8860B] mb-4 text-center">Behind the Scenes</h3>
              <p className="text-gray-400 text-center mb-8">Exclusive behind-the-scenes moments and work process</p>
              <InstagramPosts 
                postsToShow={15}
                showStats={true}
                showCaptions={true}
                gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              />
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fadeInUp3D animate-delay-600">
          <div className="glass-dark rounded-2xl p-8 lg:p-12 border border-[#B8860B]/30">
            <h3 className="text-2xl lg:text-3xl font-light text-[#B8860B] mb-6 tracking-wide">
              Ready to Create Your Story?
            </h3>
            <div className="w-16 h-0.5 bg-[#B8860B] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Don't just follow our journey—let's create yours together! Book a session and become part of our Instagram story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919843535984?text=Hi! I'd like to book a photography session after seeing your Instagram posts. Can you provide more details about availability and packages?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#111111] px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 hover-lift shadow-lg shadow-[#B8860B]/30"
              >
                <span>Book Now via WhatsApp</span>
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center space-x-3 bg-transparent border-2 border-[#B8860B] text-[#B8860B] px-8 py-3 rounded-full font-medium tracking-wide hover:bg-[#B8860B] hover:text-[#111111] transition-all duration-300"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FollowPage;
