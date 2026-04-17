"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { UploadPage } from "@/components/upload-page"
import { ProcessingPage } from "@/components/processing-page"
import { GeneratePage } from "@/components/generate-page"

export type AppPage = "landing" | "upload" | "processing" | "generate"

export interface PetData {
  name: string
  email: string
  images: File[]
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<AppPage>("landing")
  const [petData, setPetData] = useState<PetData | null>(null)

  const handleStartUpload = () => {
    setCurrentPage("upload")
  }

  const handleUploadComplete = (data: PetData) => {
    setPetData(data)
    setCurrentPage("processing")
  }

  const handleProcessingComplete = () => {
    setCurrentPage("generate")
  }

  const handleBackToUpload = () => {
    setCurrentPage("upload")
  }

  const handleBackToLanding = () => {
    setCurrentPage("landing")
    setPetData(null)
  }

  return (
    <main className="min-h-screen">
      {currentPage === "landing" && (
        <LandingPage onGetStarted={handleStartUpload} />
      )}
      {currentPage === "upload" && (
        <UploadPage 
          onBack={handleBackToLanding} 
          onUploadComplete={handleUploadComplete} 
        />
      )}
      {currentPage === "processing" && petData && (
        <ProcessingPage 
          petName={petData.name}
          email={petData.email}
          imageCount={petData.images.length}
          onComplete={handleProcessingComplete}
        />
      )}
      {currentPage === "generate" && petData && (
        <GeneratePage 
          petName={petData.name}
          onBack={handleBackToUpload}
          onHome={handleBackToLanding}
        />
      )}
    </main>
  )
}
