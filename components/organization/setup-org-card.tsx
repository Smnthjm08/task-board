"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SetupOrganization() {
  const [orgName, setOrgName] = useState("")
  const [slug, setSlug] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setOrgName(name)

    // Generate slug from organization name
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
    setSlug(generatedSlug)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and hyphens
    const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
    setSlug(newSlug)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ orgName, slug, logoPreview })
    // You would typically send this data to your backend
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Organization Setup</CardTitle>
        <CardDescription>Set up your organization profile and workspace</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Organization Logo</Label>
            <div className="flex flex-col items-center justify-center">
              {logoPreview ? (
                <div className="relative w-24 h-24 mb-2">
                  <Image
                    src={logoPreview || "/placeholder.svg"}
                    alt="Organization logo"
                    fill
                    className="rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeLogo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer mb-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                {logoPreview ? "Change Logo" : "Upload Logo"}
              </Button>
            </div>
          </div>

          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" placeholder="Acme Inc." value={orgName} onChange={handleOrgNameChange} required />
          </div>

          {/* Organization Slug */}
          <div className="space-y-2">
            <Label htmlFor="org-slug">Organization Slug</Label>
            <Input id="org-slug" placeholder="acme" value={slug} onChange={handleSlugChange} required />
            {slug && (
              <p className="text-sm text-muted-foreground mt-1">
                Your organization URL: <span className="font-medium">apporigin/{slug}</span>
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Organization
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

