"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowLeft, 
  Sparkles, 
  Wand2,
  ThumbsUp,
  ThumbsDown,
  Download,
  RefreshCw,
  Loader2,
  Check,
  ImageIcon
} from "lucide-react"
import { GeneratedImage } from "@/components/generated-image"

interface GeneratePageProps {
  petName: string
  onBack: () => void
  onHome: () => void
}

// Sample dummy images for demonstration
const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=512&h=512&fit=crop",
]

const PROMPT_SUGGESTIONS = [
  "as an astronaut floating in space",
  "in a Pixar movie style",
  "as a renaissance painting",
  "wearing a wizard hat and robe",
  "as a superhero saving the city",
  "in a cozy coffee shop reading a book",
  "as a pirate on a ship",
  "in a Japanese anime style",
]

interface GeneratedImageData {
  id: string
  url: string
  prompt: string
  feedback: "liked" | "disliked" | null
}

export function GeneratePage({ petName, onBack, onHome }: GeneratePageProps) {
  const [prompt, setPrompt] = useState("")
  const [outputCount, setOutputCount] = useState(4)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageData[]>([])
  const [history, setHistory] = useState<{ prompt: string; images: GeneratedImageData[] }[]>([])

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedImages([])

    // Simulate generation delay (2-4 seconds)
    const delay = 2000 + Math.random() * 2000

    setTimeout(() => {
      // Generate dummy images
      const newImages: GeneratedImageData[] = Array.from({ length: outputCount }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        url: DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)],
        prompt: `${petName} ${prompt}`,
        feedback: null,
      }))

      setGeneratedImages(newImages)
      setIsGenerating(false)
    }, delay)
  }, [prompt, outputCount, petName])

  const handleRegenerate = useCallback(() => {
    // Save current to history
    if (generatedImages.length > 0) {
      setHistory(prev => [...prev, { prompt: `${petName} ${prompt}`, images: generatedImages }])
    }
    handleGenerate()
  }, [generatedImages, handleGenerate, petName, prompt])

  const handleFeedback = useCallback((imageId: string, feedback: "liked" | "disliked") => {
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === imageId 
          ? { ...img, feedback: img.feedback === feedback ? null : feedback }
          : img
      )
    )
  }, [])

  const handleDownload = useCallback((imageId: string) => {
    // Mark as implicitly liked when downloaded (implicit positive feedback)
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === imageId && img.feedback === null
          ? { ...img, feedback: "liked" }
          : img
      )
    )
  }, [])

  const handlePromptSuggestion = useCallback((suggestion: string) => {
    setPrompt(suggestion)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <button onClick={onHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PetPix</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">Model ready for</span>
            <span className="font-medium text-foreground">{petName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {/* Prompt Input */}
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-base font-medium">
                      Describe your image
                    </Label>
                    <div className="relative">
                      <Input
                        id="prompt"
                        placeholder={`${petName} as...`}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                        className="pr-10 text-base h-12"
                      />
                      <Wand2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tip: Start with &quot;{petName}&quot; followed by your creative idea
                    </p>
                  </div>

                  {/* Prompt Suggestions */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Try these prompts:</Label>
                    <div className="flex flex-wrap gap-2">
                      {PROMPT_SUGGESTIONS.slice(0, 4).map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handlePromptSuggestion(suggestion)}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Output Count Slider - OPTIONALITY PRINCIPLE */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Number of outputs</Label>
                      <span className="text-sm font-medium text-primary">{outputCount} images</span>
                    </div>
                    <Slider
                      value={[outputCount]}
                      onValueChange={([value]) => setOutputCount(value)}
                      min={1}
                      max={6}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Generate multiple options to find your perfect image
                    </p>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full gap-2 h-12 text-base"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Images
                      </>
                    )}
                  </Button>

                  {/* Regenerate Button */}
                  {generatedImages.length > 0 && !isGenerating && (
                    <Button 
                      variant="outline"
                      onClick={handleRegenerate}
                      className="w-full gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Download Model Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-foreground mb-2">Export Your Model</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download your fine-tuned {petName} model to use in your own applications
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      // Simulated download - would trigger actual model download in production
                      alert(`Downloading ${petName}'s fine-tuned model...\n\n(This is a demo - no actual model exists)`)
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download Model (.safetensors)
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Compatible with Stable Diffusion, ComfyUI, and more
                  </p>
                </CardContent>
              </Card>

              {/* Feedback Summary */}
              {generatedImages.some(img => img.feedback) && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-foreground mb-3">Your Feedback</h3>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          {generatedImages.filter(img => img.feedback === "liked").length} liked
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-destructive" />
                        <span className="text-muted-foreground">
                          {generatedImages.filter(img => img.feedback === "disliked").length} disliked
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Your feedback helps improve future generations
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="pt-6">
                  {/* Empty State */}
                  {!isGenerating && generatedImages.length === 0 && (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <ImageIcon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Ready to create magic
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        Enter a prompt and click Generate to create AI-powered images of {petName}
                      </p>
                    </div>
                  )}

                  {/* Loading State - MITIGATING LATENCY PRINCIPLE */}
                  {isGenerating && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">
                          Generating {outputCount} images...
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Please wait
                        </div>
                      </div>
                      <div className={`grid gap-4 ${
                        outputCount <= 2 ? "grid-cols-1 sm:grid-cols-2" :
                        outputCount <= 4 ? "grid-cols-2" :
                        "grid-cols-2 sm:grid-cols-3"
                      }`}>
                        {Array.from({ length: outputCount }).map((_, i) => (
                          <LoadingPlaceholder key={i} index={i} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generated Images - with FEEDBACK CAPTURE */}
                  {!isGenerating && generatedImages.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">
                          Generated Images
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {petName} {prompt}
                        </span>
                      </div>
                      <div className={`grid gap-4 ${
                        generatedImages.length <= 2 ? "grid-cols-1 sm:grid-cols-2" :
                        generatedImages.length <= 4 ? "grid-cols-2" :
                        "grid-cols-2 sm:grid-cols-3"
                      }`}>
                        {generatedImages.map((image) => (
                          <GeneratedImage
                            key={image.id}
                            image={image}
                            onFeedback={handleFeedback}
                            onDownload={handleDownload}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        Use the thumbs up/down buttons to provide feedback, or download your favorites
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI UX Principles Explanation */}
          <div className="mt-8 p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-4">AI UX Principles Demonstrated</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Optionality</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose 1-6 outputs per prompt. Multiple options give you the power to pick the best result.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5" />
                  <span className="font-medium">Mitigating Latency</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Animated rainbow placeholders and progress indicators keep you engaged while generating.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">Capturing Feedback</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Like/dislike buttons and download (implicit positive feedback) help improve the model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading placeholder with rainbow animation
function LoadingPlaceholder({ index }: { index: number }) {
  return (
    <div 
      className="aspect-square rounded-xl overflow-hidden relative"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Rainbow gradient background */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: `linear-gradient(${45 + index * 30}deg, 
            rgba(255, 107, 107, 0.3), 
            rgba(254, 202, 87, 0.3), 
            rgba(72, 219, 251, 0.3), 
            rgba(255, 159, 243, 0.3), 
            rgba(84, 160, 255, 0.3)
          )`,
          animationDuration: "1.5s",
        }}
      />
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          animation: "shimmer 2s infinite",
          animationDelay: `${index * 200}ms`,
        }}
      />
      {/* Center spinner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-white/30 border-t-white/80 animate-spin" />
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
