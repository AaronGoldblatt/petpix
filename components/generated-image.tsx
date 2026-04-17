"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Download, Check, X, Send } from "lucide-react"

interface GeneratedImageProps {
  image: {
    id: string
    url: string
    prompt: string
    feedback: "liked" | "disliked" | null
    feedbackText?: string
  }
  onFeedback: (imageId: string, feedback: "liked" | "disliked", feedbackText?: string) => void
  onDownload: (imageId: string) => void
}

export function GeneratedImage({ image, onFeedback, onDownload }: GeneratedImageProps) {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState<"liked" | "disliked" | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [showThankYou, setShowThankYou] = useState(false)

  const handleFeedbackClick = (type: "liked" | "disliked") => {
    if (image.feedback === type) {
      // Toggle off if already selected
      onFeedback(image.id, type)
    } else {
      // Show feedback form
      setShowFeedbackForm(type)
      setFeedbackText("")
    }
  }

  const handleSubmitFeedback = () => {
    if (showFeedbackForm) {
      onFeedback(image.id, showFeedbackForm, feedbackText.trim() || undefined)
      setShowFeedbackForm(null)
      setFeedbackText("")
      setShowThankYou(true)
      setTimeout(() => setShowThankYou(false), 2500)
    }
  }

  const handleSkipFeedback = () => {
    if (showFeedbackForm) {
      onFeedback(image.id, showFeedbackForm)
      setShowFeedbackForm(null)
      setFeedbackText("")
    }
  }

  const handleDownload = () => {
    setIsDownloaded(true)
    onDownload(image.id)
    
    // Simulate download
    const link = document.createElement("a")
    link.href = image.url
    link.download = `petpix-${image.id}.jpg`
    link.target = "_blank"
    link.click()

    // Reset downloaded state after 2 seconds
    setTimeout(() => setIsDownloaded(false), 2000)
  }

  return (
    <div className="group relative aspect-square rounded-xl overflow-hidden bg-muted">
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.prompt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
        crossOrigin="anonymous"
      />

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Feedback overlay - shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center justify-between gap-2">
            {/* Feedback buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={image.feedback === "liked" ? "default" : "secondary"}
                className={`h-9 w-9 p-0 ${
                  image.feedback === "liked" 
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                    : "bg-white/90 hover:bg-white text-foreground"
                }`}
                onClick={() => handleFeedbackClick("liked")}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
              <Button
                size="sm"
                variant={image.feedback === "disliked" ? "default" : "secondary"}
                className={`h-9 w-9 p-0 ${
                  image.feedback === "disliked" 
                    ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
                    : "bg-white/90 hover:bg-white text-foreground"
                }`}
                onClick={() => handleFeedbackClick("disliked")}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="sr-only">Dislike</span>
              </Button>
            </div>

            {/* Download button */}
            <Button
              size="sm"
              variant="secondary"
              className="h-9 gap-2 bg-white/90 hover:bg-white text-foreground"
              onClick={handleDownload}
            >
              {isDownloaded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Persistent feedback indicator */}
      {image.feedback && !showFeedbackForm && !showThankYou && (
        <div className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
          image.feedback === "liked" 
            ? "bg-accent text-accent-foreground" 
            : "bg-destructive text-destructive-foreground"
        }`}>
          {image.feedback === "liked" ? (
            <ThumbsUp className="w-3.5 h-3.5" />
          ) : (
            <ThumbsDown className="w-3.5 h-3.5" />
          )}
        </div>
      )}

      {/* Feedback Form Overlay */}
      {showFeedbackForm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10">
          <div className="w-full max-w-[90%] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showFeedbackForm === "liked" ? (
                  <ThumbsUp className="w-4 h-4 text-accent" />
                ) : (
                  <ThumbsDown className="w-4 h-4 text-destructive" />
                )}
                <span className="text-white text-sm font-medium">
                  {showFeedbackForm === "liked" ? "What did you like?" : "What could be better?"}
                </span>
              </div>
              <button
                onClick={() => setShowFeedbackForm(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              placeholder={showFeedbackForm === "liked" 
                ? "e.g., Great pose, love the colors..." 
                : "e.g., The lighting could be better..."
              }
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm min-h-[60px] resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSkipFeedback}
                className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
              >
                Skip
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitFeedback}
                className={`flex-1 gap-1.5 ${
                  showFeedbackForm === "liked" 
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                    : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThankYou && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <p className="text-white font-medium">Thank you!</p>
            <p className="text-white/60 text-sm">Your feedback helps us improve</p>
          </div>
        </div>
      )}
    </div>
  )
}
