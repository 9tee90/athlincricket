import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create. Compete. Get Sponsored.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Where Ex-Pros train the next generation through viral challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={{ pathname: '/auth/register', query: { role: 'player' } }}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Join as Player
            </Link>
            <Link
              href={{ pathname: '/auth/register', query: { role: 'xpro' } }}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Become an X-Pro
            </Link>
            <Link
              href={{ pathname: '/auth/register', query: { role: 'sponsor' } }}
              className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Sponsor a Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">X-Pros Create Challenges</h3>
              <p className="text-gray-600">Create engaging video-led challenges to train the next generation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Players Submit Entries</h3>
              <p className="text-gray-600">Submit your entries to win rewards and showcase your skills</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Sponsors Back Talent</h3>
              <p className="text-gray-600">Sponsors support talent and earn visibility in the cricket community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Formats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Challenge Formats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Get Ready With Me</h3>
              <p className="text-gray-600">Show your pre-match preparation routine</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Batting Drill Challenge</h3>
              <p className="text-gray-600">Master advanced batting techniques</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Post-Match Meal</h3>
              <p className="text-gray-600">Share your recovery nutrition routine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured X-Pros Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured X-Pros</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((pro) => (
              <div key={pro} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">John Doe</h3>
                <p className="text-gray-600 mb-4">Former International Cricketer</p>
                <p className="text-sm text-gray-500">12 Challenges</p>
                <Link href={{ pathname: '/dashboard/xpro' }} className="text-blue-600 hover:underline mt-4 inline-block">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Winners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Winners</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((winner) => (
              <div key={winner} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Winner {winner}</h3>
                <p className="text-gray-600">Winner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Back the Future of Cricket</h2>
          <Link
            href={{ pathname: '/auth/register', query: { role: 'sponsor' } }}
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Apply to Sponsor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Athlin Cricket</h3>
              <p className="text-gray-400">Empowering the next generation of cricket stars</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href={{ pathname: '/' }} className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link href={{ pathname: '/challenges' }} className="text-gray-400 hover:text-white">Challenges</Link></li>
                  <li><Link href={{ pathname: '/dashboard' }} className="text-gray-400 hover:text-white">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2025 Athlin Cricket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
