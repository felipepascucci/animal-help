"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  previewUrl?: string
  className?: string
}

export function ImageUpload({ onImageChange, previewUrl, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    } else {
      setPreview(null)
      onImageChange(null)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />

      {preview ? (
        <div className="relative w-full h-48 border rounded-md overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="h-48 border-dashed flex flex-col gap-2 items-center justify-center"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={24} />
          <span>Clique para fazer upload</span>
        </Button>
      )}
    </div>
  )
}

