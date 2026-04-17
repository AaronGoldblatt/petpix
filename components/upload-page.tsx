"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Sparkles, 
  ImageIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import type { PetData } from "@/app/page"

interface UploadPageProps {
  onBack: () => void
  onUploadComplete: (data: PetData) => void
}

// Dummy dog image URLs for preloading - all featuring the same golden retriever "Buddy"
const DUMMY_DOG_IMAGES = [
  "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop", // Golden retriever portrait
  "https://images.unsplash.com/photo-1612774412771-005ed8e861d2?w=400&h=400&fit=crop", // Golden retriever side view
  "https://images.unsplash.com/photo-1625316708582-7c38734d5cc8?w=400&h=400&fit=crop", // Golden retriever happy
  "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=400&h=400&fit=crop", // Golden retriever outdoor
  "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&h=400&fit=crop", // Golden retriever close-up
]

// Type for either a File or a dummy image URL
type ImageItem = File | { type: "dummy"; url: string; id: string }

export function UploadPage({ onBack, onUploadComplete }: UploadPageProps) {
  const [petName, setPetName] = useState("Buddy")
  const [email, setEmail] = useState("demo@petpix.ai")
  // Preload with 5 dummy dog images
  const [images, setImages] = useState<ImageItem[]>(
    DUMMY_DOG_IMAGES.map((url, i) => ({ type: "dummy" as const, url, id: `dummy-${i}` }))
  )
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith("image/")
    )
    setImages(prev => [...prev, ...files].slice(0, 15))
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith("image/")
      )
      setImages(prev => [...prev, ...files].slice(0, 15))
    }
  }, [])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = () => {
    if (petName.trim() && email.trim() && images.length >= 5) {
      // Convert dummy images to placeholder Files for the flow
      const imageFiles = images.map((img, i) => {
        if (img instanceof File) return img
        // Create a placeholder file for dummy images
        return new File([""], `dummy-image-${i}.jpg`, { type: "image/jpeg" })
      })
      onUploadComplete({ name: petName.trim(), email: email.trim(), images: imageFiles })
    }
  }

  const isValid = petName.trim().length > 0 && email.trim().length > 0 && images.length >= 5

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <button onClick={onBack} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PetPix</span>
          </button>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">Upload</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Training</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Generate</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Upload Your Pet&apos;s Photos
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Give your pet a unique name and upload 5-15 clear photos from different angles
            </p>
          </div>

          <div className="space-y-8">
            {/* Pet Name Input */}
            <Card>
              <CardContent className="pt-6">
                <Label htmlFor="pet-name" className="text-base font-medium">
                  What&apos;s your pet&apos;s name?
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  This unique identifier helps the AI recognize your pet in prompts
                </p>
                <Input
                  id="pet-name"
                  placeholder="e.g., Pepper, Luna, Max..."
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="text-lg h-12"
                />
                {petName.trim() && (
                  <p className="text-sm text-muted-foreground mt-2">
                    You&apos;ll use <span className="font-medium text-primary">&quot;{petName.trim()}&quot;</span> in your prompts, like: 
                    &quot;{petName.trim()} as an astronaut&quot;
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Email Input */}
            <Card>
              <CardContent className="pt-6">
                <Label htmlFor="email" className="text-base font-medium">
                  Your email address
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  We&apos;ll notify you when your pet&apos;s AI model is ready to use
                </p>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg h-12"
                />
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Label className="text-base font-medium">Upload Photos</Label>
                    <p className="text-sm text-muted-foreground">
                      5-15 clear photos with varied poses, lighting, and backgrounds
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {images.length >= 5 ? (
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={`text-sm font-medium ${images.length >= 5 ? "text-accent" : "text-muted-foreground"}`}>
                      {images.length}/15 photos
                    </span>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center transition-all
                    ${dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Drag & drop photos here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {images.map((file, index) => (
                        <div key={index} className="relative group aspect-square">
                          <div className="absolute inset-0 rounded-lg overflow-hidden bg-muted">
                            <ImagePreview file={file} />
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {images.length < 15 && (
                        <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center cursor-pointer transition-colors bg-muted/30">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Tips for best results:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Include photos from different angles (front, side, 3/4 view)</li>
                    <li>• Use varied lighting conditions</li>
                    <li>• Show your pet&apos;s full body in some photos</li>
                    <li>• Avoid blurry or heavily filtered images</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={!isValid}
                className="gap-2 text-lg px-8"
              >
                Start Training <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {!isValid && (
              <p className="text-center text-sm text-muted-foreground">
                {!petName.trim() 
                  ? "Enter your pet's name to continue"
                  : !email.trim()
                    ? "Enter your email address to continue"
                    : images.length < 5
                      ? `Upload ${5 - images.length} more photo${5 - images.length === 1 ? "" : "s"} to continue`
                      : "Fill in all fields to continue"
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ImagePreview({ file }: { file: ImageItem }) {
  const [src, setSrc] = useState<string>("")

  // Handle both File objects and dummy image URLs
  if (!src) {
    if (file instanceof File) {
      setSrc(URL.createObjectURL(file))
    } else {
      setSrc(file.url)
    }
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src || undefined} 
      alt="Pet photo" 
      className="w-full h-full object-cover bg-muted"
    />
  )
}
