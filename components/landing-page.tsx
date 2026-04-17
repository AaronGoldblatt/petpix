"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Upload, Wand2, Heart, ArrowRight } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PetPix</span>
          </div>
          <Button onClick={onGetStarted} className="gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Pet Portraits
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Transform Your Pet Into{" "}
                <span className="text-primary">Magical Art</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Upload photos of your furry friend, and our AI will learn their unique features 
                to create stunning, personalized artwork in any style you can imagine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onGetStarted} className="gap-2 text-lg px-8">
                  Start Creating <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-lg">
                  See Examples
                </Button>
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 animate-pulse" />
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-accent/20 via-primary/20 to-accent/10 animate-pulse delay-100" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-bl from-primary/20 via-accent/20 to-primary/10 animate-pulse delay-200" />
                  <div className="aspect-square rounded-2xl bg-gradient-to-tl from-accent/20 via-primary/20 to-accent/10 animate-pulse delay-300" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Your pet&apos;s magical portraits await</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to create personalized AI art of your beloved pet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Upload Photos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share 5-15 clear photos of your pet from different angles. The more variety, the better!
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Wand2 className="w-8 h-8 text-primary" />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Training</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI learns your pet&apos;s unique features, creating a personalized model just for them.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Generate Magic</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create unlimited stunning portraits with text prompts. Astronaut? Pixar style? You name it!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={onGetStarted} className="gap-2 text-lg px-8">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">PetPix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with love for pet lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
