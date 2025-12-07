import React from 'react';

function testHome() {
  return (
    <div>
      {' '}
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        // {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800/50 backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Netflix
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200">
              Home
            </button>
            <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200">
              Browse
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 font-semibold">
              Sign In
            </button>
          </div>
        </nav>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-black"></div>

          <div className="relative z-10 text-center max-w-2xl px-6">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Entertainment,
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {' '}
                Redefined
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Stream thousands of shows and movies, anytime, anywhere. All in
              one place.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50 transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-slate-400 text-white rounded-lg font-bold hover:border-white transition-all duration-200 hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </section>
        {/* Content Grid Placeholder */}
        <section className="px-8 py-16 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8">Trending Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-slate-700 hover:border-red-600 shadow-lg hover:shadow-red-600/20"
              ></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default testHome;
