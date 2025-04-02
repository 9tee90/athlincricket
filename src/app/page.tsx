import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Star, Trophy, Play } from "lucide-react";
import { Metadata } from "next"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAppConfig } from "@/lib/edge-config"

const features = [
  {
    title: "X-Pros Create Challenges",
    description: "Former professional cricketers create video challenges to help players improve their skills",
    icon: Star,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Players Submit Entries",
    description: "Record and submit your challenge attempts to get personalized feedback from X-Pros",
    icon: Play,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Sponsors Back Talent",
    description: "Connect with emerging cricket talent and support their development journey",
    icon: Trophy,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const challengeFormats = [
  {
    title: "Batting Masterclass",
    description: "Perfect your batting technique with challenges focused on footwork, timing, and shot selection",
    image: "/images/batting.jpg",
    tags: ["Technique", "Power", "Timing"],
  },
  {
    title: "Bowling Academy",
    description: "Develop your bowling skills with drills covering pace, spin, and variations",
    image: "/images/bowling.jpg",
    tags: ["Speed", "Accuracy", "Variations"],
  },
  {
    title: "Fielding Excellence",
    description: "Enhance your fielding abilities with drills for catching, throwing, and ground fielding",
    image: "/images/fielding.jpg",
    tags: ["Agility", "Catching", "Throwing"],
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Rising Star",
    quote: "The personalized feedback from X-Pros helped me improve my batting technique significantly.",
    image: "/images/testimonial1.jpg",
  },
  {
    name: "Priya Patel",
    role: "Emerging Talent",
    quote: "The bowling challenges pushed me to perfect my variations and improve my accuracy.",
    image: "/images/testimonial2.jpg",
  },
  {
    name: "Amit Kumar",
    role: "Academy Player",
    quote: "Getting sponsored through the platform has been a game-changer for my cricket career.",
    image: "/images/testimonial3.jpg",
  },
];

const stats = [
  { label: "Active Players", value: "5,000+" },
  { label: "X-Pro Coaches", value: "50+" },
  { label: "Challenges Completed", value: "25,000+" },
  { label: "Success Stories", value: "500+" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">Join the Cricket Revolution</Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted">
              Train with X-Pros.
              <br />
              Get Discovered.
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground leading-relaxed">
              Where cricket legends train the next generation through interactive video challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register?role=player">
                <Button size="lg" className="group w-full sm:w-auto">
                  Start Training
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/register?role=xpro">
                <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
                  Join as X-Pro
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/register?role=sponsor">
                <Button size="lg" variant="outline" className="group w-full sm:w-auto">
                  Become a Sponsor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Path to Cricket Excellence</h2>
            <p className="text-lg text-muted-foreground">
              Join our community of players, coaches, and sponsors to accelerate your cricket journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-card hover:bg-card/60 transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", feature.bgColor)}>
                  <feature.icon className={cn("h-6 w-6", feature.color)} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Formats */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Challenge Formats</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Every Aspect of Cricket</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive challenges designed by X-Pros to develop your skills.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {challengeFormats.map((format, i) => (
              <div key={i} className="group bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48">
                  <Image
                    src={format.image}
                    alt={format.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{format.title}</h3>
                  <p className="text-muted-foreground mb-4">{format.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {format.tags.map((tag, j) => (
                      <Badge key={j} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hear from Our Community</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from players who have transformed their game through our platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-4">Ready to Start?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Cricket Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of players already improving their game with personalized feedback from cricket legends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/register?role=player">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/challenges">Browse Challenges</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
