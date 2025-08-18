"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Bhashini supported languages
const languages = [
  { code: "hi", name: "हिंदी", englishName: "Hindi" },
  { code: "en", name: "English", englishName: "English" },
  { code: "bn", name: "বাংলা", englishName: "Bengali" },
  { code: "te", name: "తెలుగు", englishName: "Telugu" },
  { code: "mr", name: "मराठी", englishName: "Marathi" },
  { code: "ta", name: "தமிழ்", englishName: "Tamil" },
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati" },
  { code: "kn", name: "ಕನ್ನಡ", englishName: "Kannada" },
  { code: "ml", name: "മലയാളം", englishName: "Malayalam" },
  { code: "pa", name: "ਪੰਜਾਬੀ", englishName: "Punjabi" },
]

export default function LanguageSelectionPage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedLanguage) {
      toast({
        title: "Please select a language",
        description: "You must choose a language to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Store language preference in localStorage
      localStorage.setItem("preferredLanguage", selectedLanguage)

      toast({
        title: "Language selected",
        description: "Your language preference has been saved.",
      })

      // Navigate to profession selection
      router.push("/profession-selection")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save language preference. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Choose Your Language</CardTitle>
          <CardDescription>
            Select the language you are most comfortable with. This will be used throughout the application.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent"
                  >
                    <RadioGroupItem value={language.code} id={language.code} />
                    <Label htmlFor={language.code} className="flex-1 cursor-pointer">
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-muted-foreground">{language.englishName}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
          <div className="px-6 pb-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
