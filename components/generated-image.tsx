"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Download, Check } from "lucide-react"

interface GeneratedImageProps {
  image: {
    id: string
    url: string
    prompt: string
    feedback: "liked" | "disliked" | null
  }
  onFeedback: (imageId: string, feedback: "liked" | "disliked") => void
  onDownload: (imageId: string) => void
}

export function GeneratedImage({ image, onFeedback, onDownload }: GeneratedImageProps) {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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
                onClick={() => onFeedback(image.id, "liked")}
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
                onClick={() => onFeedback(image.id, "disliked")}
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
      {image.feedback && (
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
    </div>
  )
}
