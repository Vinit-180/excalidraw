import { randomInt } from "crypto";
import { Brush, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brush className="h-6 w-6" />
            <span className="text-xl font-bold">DrawCanvas</span>
          </div>

        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-violet-950 via-blue-600 to-purple-600 bg-clip-text text-transparent pb-2 animate-in slide-in-from-bottom duration-1000">
              Draw and collaborate 
              <br />
               in real-time
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Create beautiful diagrams, flowcharts, and illustrations with our intuitive canvas. Share your ideas instantly.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/canvas"
                className="px-6 py-3 bg-blue-700 text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Drawing
              </Link>
              <Link
                href={`/canvas/${randomInt(100,2000)*4}`}
                className="px-6 py-3 border border-input rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Open Shared Drawing
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              // {
              //   title: 'Infinite Canvas',
              //   description: 'Zoom in and out freely, with unlimited space for your creativity.',
              // },
              {
                title: 'Unique Shareable Links',
                description: 'Create an account and share your drawings using unique links for easy collaboration.',
              },
              {
                title: 'Instant Access Anywhere',
                description: 'Generate random shareable links to access and share your creations without the need to log in or sign up.',
              },
              {
                title: 'Device-Secure Boards 🤫',
                description: 'Create secure boards accessible only on your laptop for enhanced privacy and protection.',
              },
              
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg border bg-card"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-32 px-12">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-blue-600 to-purple-600 p-8 sm:p-16">
              <div className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to bring your ideas to life?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of creators who use DrawCanvas to visualize their ideas and collaborate with teams worldwide.
                </p>
                <Link
                  href="/canvas"
                  className="inline-flex px-8 py-4 bg-white text-black rounded-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-black/20 font-medium"
                >
                  Start Drawing Now
                </Link>
              </div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            </div>
          </div>
      </main>
    </div>
  );
}
