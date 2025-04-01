import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cricket-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create. Compete. Get Sponsored.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Where Ex-Pros train the next generation through viral challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join as Player
            </Button>
            <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-2 border-white">
              Become an X-Pro
            </Button>
            <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-2 border-white">
              Sponsor a Challenge
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">X-Pros Create Challenges</h3>
              <p className="text-muted-foreground">Create engaging video-led challenges to train the next generation</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Players Submit Entries</h3>
              <p className="text-muted-foreground">Submit your entries to win rewards and showcase your skills</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sponsors Back Talent</h3>
              <p className="text-muted-foreground">Sponsors support talent and earn visibility in the cricket community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Formats */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Challenge Formats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-muted relative">
                <Image src="/images/challenge-1.jpg" alt="Get Ready With Me" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Get Ready With Me</h3>
                <p className="text-muted-foreground">Show your pre-match preparation routine</p>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-muted relative">
                <Image src="/images/challenge-2.jpg" alt="Batting Drill Challenge" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Batting Drill Challenge</h3>
                <p className="text-muted-foreground">Master advanced batting techniques</p>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-muted relative">
                <Image src="/images/challenge-3.jpg" alt="Post-Match Meal" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Post-Match Meal</h3>
                <p className="text-muted-foreground">Share your recovery nutrition routine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured X-Pros */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured X-Pros</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted relative">
                  <Image src={`/images/xpro-${i}.jpg`} alt={`X-Pro ${i}`} fill className="object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-1">John Doe</h3>
                <p className="text-muted-foreground mb-4">Former International Cricketer</p>
                <Badge variant="secondary" className="mb-4">12 Challenges</Badge>
                <Button variant="outline" className="w-full">View Profile</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Winners */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Winners</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image src={`/images/winner-${i}.jpg`} alt={`Winner ${i}`} fill className="object-cover" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="bg-primary">Winner</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Back the Future of Cricket</h2>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Apply to Sponsor
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Athlin Cricket</h3>
              <p className="text-gray-400">Empowering the next generation of cricket stars</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Athlin Cricket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 