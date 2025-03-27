"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface ImageUploadProps {
  onChange?: (file: File | null) => void
  onImageChange?: (file: File | null) => void // Adicionando prop alternativa para compatibilidade
  value?: string
  className?: string
  resetKey?: number
}

export function ImageUpload({ onChange, onImageChange, value, className = "", resetKey = 0 }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const lastResetKeyRef = useRef(resetKey)

  // Função que será chamada quando o usuário selecionar uma imagem
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }

    // Chamar ambas as funções de callback para garantir compatibilidade
    if (onChange) onChange(selectedFile)
    if (onImageChange) onImageChange(selectedFile)
  }

  // Função para remover a imagem
  const handleRemoveImage = () => {
    setPreview(null)
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // Chamar ambas as funções de callback para garantir compatibilidade
    if (onChange) onChange(null)
    if (onImageChange) onImageChange(null)
  }

  // Efeito para limpar a imagem quando resetKey mudar
  useEffect(() => {
    // Só limpa se o resetKey for maior que zero e tiver mudado
    if (resetKey > 0 && resetKey !== lastResetKeyRef.current) {
      setPreview(null)
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      lastResetKeyRef.current = resetKey
    }
  }, [resetKey])

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {preview ? (
        <div className="relative w-40 h-40">
          <Image src={preview || "/placeholder.svg"} alt="Preview da imagem" fill className="object-cover rounded-lg" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="w-10 h-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Clique para adicionar</p>
        </div>
      )}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  )
}

