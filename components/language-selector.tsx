// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Globe } from "lucide-react"
// import { languages, type Language } from "@/lib/translations"

// interface LanguageSelectorProps {
//   currentLanguage: Language
//   onLanguageChange: (language: Language) => void
// }

// export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
//   const [isOpen, setIsOpen] = useState(false)

//   const handleLanguageSelect = (language: Language) => {
//     onLanguageChange(language)
//     setIsOpen(false)
//   }

//   const currentLang = languages.find((lang) => lang.code === currentLanguage)

//   return (
//     <>
//       <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
//         <Globe className="h-4 w-4" />
//         <span>{currentLang?.name}</span>
//       </Button>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-center">Choose Language / भाषा चुनें</DialogTitle>
//           </DialogHeader>
//           <div className="grid grid-cols-2 gap-3 py-4">
//             {languages.map((language) => (
//               <Card
//                 key={language.code}
//                 className={`cursor-pointer transition-colors hover:bg-accent ${
//                   currentLanguage === language.code ? "ring-2 ring-primary" : ""
//                 }`}
//                 onClick={() => handleLanguageSelect(language.code)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <div className="font-semibold text-lg mb-1">{language.name}</div>
//                   <div className="text-sm text-muted-foreground">{language.englishName}</div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// export default LanguageSelector










"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Globe } from "lucide-react"
import { languages, type Language } from "@/lib/translations"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language)
    setIsOpen(false)
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <span>{currentLang?.name}</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Language / भाषा चुनें</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {languages.map((language) => (
              <Card
                key={language.code}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  currentLanguage === language.code ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-semibold text-lg mb-1">{language.name}</div>
                  <div className="text-sm text-muted-foreground">{language.englishName}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LanguageSelector
