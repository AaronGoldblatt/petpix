"use client"

import { useEffect, useState } from "react"
import { Sparkles, Mail, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProcessingPageProps {
  petName: string
  email: string
  imageCount: number
  onComplete: () => void
}

const processingSteps = [
  { label: "Uploading images", duration: 1000 },
  { label: "Preprocessing photos", duration: 1500 },
  { label: "Extracting features", duration: 2000 },
  { label: "Training AI model", duration: 2500 },
  { label: "Finalizing your pet's model", duration: 1000 },
]

export function ProcessingPage({ petName, email, imageCount, onComplete }: ProcessingPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let stepIndex = 0
    let totalProgress = 0
    const progressPerStep = 100 / processingSteps.length

    const runStep = () => {
      if (stepIndex >= processingSteps.length) {
        setIsComplete(true)
        setTimeout(onComplete, 1500)
        return
      }

      setCurrentStep(stepIndex)
      const step = processingSteps[stepIndex]
      const stepProgress = progressPerStep
      const increment = stepProgress / (step.duration / 50)

      const progressInterval = setInterval(() => {
        totalProgress += increment
        setProgress(Math.min(totalProgress, (stepIndex + 1) * progressPerStep))
      }, 50)

      setTimeout(() => {
        clearInterval(progressInterval)
        setProgress((stepIndex + 1) * progressPerStep)
        stepIndex++
        runStep()
      }, step.duration)
    }

    runStep()
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PetPix</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 w-full">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Upload</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">Training</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Generate</span>
            </div>
          </div>

          <div className="text-center space-y-8">
            {/* Animated Loading Visual */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
                style={{ animationDuration: "1.5s" }}
              />
              {/* Inner gradient orb - rainbow effect */}
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <div 
                  className="w-full h-full animate-spin"
                  style={{ 
                    background: "conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)",
                    animationDuration: "3s"
                  }}
                />
              </div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-lg">
                  {isComplete ? (
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            {/* Status Text */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {isComplete ? "Training Complete!" : `Training ${petName}'s Model`}
              </h1>
              <p className="text-muted-foreground">
                {isComplete 
                  ? "Your AI model is ready to create amazing images"
                  : `Learning from ${imageCount} photos...`
                }
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-2" />
              <p className="text-sm font-medium text-foreground">
                {isComplete ? "Complete!" : processingSteps[currentStep]?.label}
              </p>
            </div>

            {/* Processing Steps */}
            <div className="space-y-2 text-left bg-card rounded-xl p-4 border border-border">
              {processingSteps.map((step, index) => (
                <div 
                  key={step.label}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                    index === currentStep && !isComplete
                      ? "bg-primary/10"
                      : index < currentStep || isComplete
                        ? "opacity-60"
                        : "opacity-40"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    index < currentStep || isComplete
                      ? "bg-accent text-accent-foreground"
                      : index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {index < currentStep || isComplete ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep && !isComplete ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {index === currentStep && !isComplete && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Email Notification Note */}
            <div className="flex flex-col items-center gap-2 text-sm bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Mail className="w-4 h-4 text-primary" />
                <span>We&apos;ll email you at:</span>
              </div>
              <span className="text-primary font-medium">{email}</span>
              <span className="text-muted-foreground text-xs">(Demo mode - no email will actually be sent)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
