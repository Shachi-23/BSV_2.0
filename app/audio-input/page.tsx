// "use client"

// import { CommandEmpty } from "@/components/ui/command"
// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/components/ui/use-toast"
// import { Mic, Upload, StopCircle, Loader2, Check, ChevronsUpDown } from "lucide-react"
// import { ArrowLeft } from "lucide-react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// import { cn } from "@/lib/utils"

// // Define languages supported by Bhashini (example subset)
// const languages = [
//   { code: "en", name: "English" },
//   { code: "hi", name: "Hindi" },
//   { code: "ta", name: "Tamil" },
//   { code: "bn", name: "Bengali" },
//   { code: "gu", name: "Gujarati" },
//   { code: "kn", name: "Kannada" },
//   { code: "ml", name: "Malayalam" },
//   { code: "mr", name: "Marathi" },
//   { code: "pa", name: "Punjabi" },
//   { code: "te", name: "Telugu" },
//   // Add more languages as supported by Bhashini
// ]

// export default function AudioInputPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const templateId = searchParams.get("template") // templateId will be a string like "p1", "c2"
//   const categoryId = searchParams.get("category")

//   const [isRecording, setIsRecording] = useState(false)
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [isLoading, setIsLoading] = useState(false) // Not currently used, but kept for consistency
//   const [selectedLanguage, setSelectedLanguage] = useState("en") // New state for selected language
//   const [openLanguageSelect, setOpenLanguageSelect] = useState(false) // For the combobox popover

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])

//   useEffect(() => {
//     // Check if template is selected
//     if (!templateId) {
//       toast({
//         title: "No template selected",
//         description: "Please select a template first.",
//         variant: "destructive",
//       })
//       router.push("/templates")
//     }
//   }, [router, templateId])

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       mediaRecorderRef.current = new MediaRecorder(stream)
//       audioChunksRef.current = []
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data)
//         }
//       }
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
//         setAudioBlob(audioBlob)
//         // Stop all tracks on the stream to release the microphone
//         stream.getTracks().forEach((track) => track.stop())
//       }
//       mediaRecorderRef.current.start()
//       setIsRecording(true)
//     } catch (error) {
//       console.error("Error accessing microphone:", error)
//       toast({
//         title: "Microphone Error",
//         description: "Could not access your microphone. Please check permissions.",
//         variant: "destructive",
//       })
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//     }
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Check if file is an audio file
//       if (!file.type.startsWith("audio/")) {
//         toast({
//           title: "Invalid file type",
//           description: "Please upload an audio file.",
//           variant: "destructive",
//         })
//         return
//       }
//       setAudioBlob(file)
//     }
//   }

//   const handleChooseDifferentTemplate = () => {
//     router.push("/templates")
//   }

//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       toast({
//         title: "No audio",
//         description: "Please record or upload an audio file.",
//         variant: "destructive",
//       })
//       return
//     }
//     setIsUploading(true)
//     try {
//       // Create form data to send audio, template ID, and selected language
//       const formData = new FormData()
//       formData.append("audio", audioBlob)
//       // IMPORTANT: Use templateId directly as a string, falling back to "p1" if not present
//       formData.append("templateId", templateId || "p1")
//       formData.append("language", selectedLanguage) // Append the selected language

//       // Send to backend
//       const response = await fetch("http://localhost:5000/api/process-audio", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       })
//       console.log("API Response:", response)
//       if (response.ok) {
//         const data = await response.json()
//         console.log("API Response Data:", data)
//         // Store the resume data in localStorage for use in the preview
//         localStorage.setItem("resumeData", JSON.stringify(data))
//         // Navigate to resume preview page with the template and category
//         router.push(`/resume-preview?template=${templateId || "p1"}&category=${categoryId}`)
//       } else {
//         const errorData = await response.json()
//         console.error("Backend Error Data:", errorData) // Add this line
//         toast({
//           title: "Processing Error",
//           description: errorData.message || "Failed to process audio. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error processing audio:", error)
//       toast({
//         title: "Error",
//         description: "An error occurred while processing your audio. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="mb-6">
//         <Button
//           variant="outline"
//           onClick={handleChooseDifferentTemplate}
//           className="flex items-center gap-2 bg-transparent"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Choose Different Template
//         </Button>
//       </div>
//       <h1 className="text-3xl font-bold mb-8">Record or Upload Audio</h1>
//       <p className="text-gray-600 mb-8">
//         Tell us about your experience, skills, education, and other relevant information for your resume. Speak clearly
//         and provide as much detail as possible for the best results.
//       </p>

//       {/* Language Selection Dropdown */}
//       <div className="mb-8 max-w-2xl mx-auto">
//         <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
//           Select Audio Language:
//         </label>
//         <Popover open={openLanguageSelect} onOpenChange={setOpenLanguageSelect}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={openLanguageSelect}
//               className="w-full justify-between bg-transparent"
//             >
//               {selectedLanguage ? languages.find((lang) => lang.code === selectedLanguage)?.name : "Select language..."}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
//             <Command>
//               <CommandInput placeholder="Search language..." />
//               <CommandList>
//                 <CommandEmpty>No language found.</CommandEmpty>
//                 <CommandGroup>
//                   {languages.map((lang) => (
//                     <CommandItem
//                       key={lang.code}
//                       value={lang.name}
//                       onSelect={() => {
//                         setSelectedLanguage(lang.code)
//                         setOpenLanguageSelect(false)
//                       }}
//                     >
//                       <Check
//                         className={cn("mr-2 h-4 w-4", selectedLanguage === lang.code ? "opacity-100" : "opacity-0")}
//                       />
//                       {lang.name}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <Tabs defaultValue="record" className="max-w-2xl mx-auto">
//         <TabsList className="grid w-full grid-cols-2 mb-8">
//           <TabsTrigger value="record">Record Audio</TabsTrigger>
//           <TabsTrigger value="upload">Upload Audio</TabsTrigger>
//         </TabsList>
//         <TabsContent value="record">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div
//                   className={`w-32 h-32 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"}`}
//                 >
//                   {isRecording ? (
//                     <StopCircle size={48} className="text-red-500" />
//                   ) : (
//                     <Mic size={48} className="text-gray-500" />
//                   )}
//                 </div>
//                 {audioBlob && !isRecording && (
//                   <div className="w-full">
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                   </div>
//                 )}
//                 <div className="flex space-x-4">
//                   {!isRecording ? (
//                     <Button onClick={startRecording} disabled={isUploading}>
//                       Start Recording
//                     </Button>
//                   ) : (
//                     <Button onClick={stopRecording} variant="destructive">
//                       Stop Recording
//                     </Button>
//                   )}
//                   {audioBlob && !isRecording && (
//                     <Button onClick={() => setAudioBlob(null)} variant="outline">
//                       Discard
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="upload">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
//                   <Upload size={48} className="text-gray-500" />
//                 </div>
//                 <div className="w-full">
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="audio-upload"
//                   />
//                   <label htmlFor="audio-upload">
//                     <Button variant="outline" className="w-full bg-transparent" asChild>
//                       <span>Choose Audio File</span>
//                     </Button>
//                   </label>
//                 </div>
//                 {audioBlob && (
//                   <div className="w-full">
//                     <p className="text-sm text-gray-500 mb-2">Selected file:</p>
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                     <Button onClick={() => setAudioBlob(null)} variant="outline" size="sm" className="mt-2">
//                       Remove
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//       <div className="flex justify-center mt-8">
//         <Button size="lg" onClick={handleSubmit} disabled={!audioBlob || isUploading}>
//           {isUploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             "Continue"
//           )}
//         </Button>
//       </div>
//       <div className="mt-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
//         <h3 className="font-semibold text-lg mb-4">Tips for best results:</h3>
//         <ul className="list-disc pl-5 space-y-2 text-gray-600">
//           <li>Speak clearly and at a moderate pace</li>
//           <li>Include your name, contact information, and professional summary</li>
//           <li>Describe your work experience with dates, company names, and responsibilities</li>
//           <li>List your education, certifications, and relevant skills</li>
//           <li>Mention any achievements or awards</li>
//           <li>Record in a quiet environment to minimize background noise</li>
//         </ul>
//       </div>
//     </div>
//   )
// }







// "use client"

// import { CommandEmpty } from "@/components/ui/command"
// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/components/ui/use-toast"
// import { Mic, Upload, StopCircle, Loader2, Check, ChevronsUpDown } from "lucide-react"
// import { ArrowLeft } from "lucide-react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// import { cn } from "@/lib/utils"

// // Define languages supported by Bhashini (example subset)
// const languages = [
//   { code: "en", name: "English" },
//   { code: "hi", name: "Hindi" },
//   { code: "ta", name: "Tamil" },
//   { code: "bn", name: "Bengali" },
//   { code: "gu", name: "Gujarati" },
//   { code: "kn", name: "Kannada" },
//   { code: "ml", name: "Malayalam" },
//   { code: "mr", name: "Marathi" },
//   { code: "pa", name: "Punjabi" },
//   { code: "te", name: "Telugu" },
//   // Add more languages as supported by Bhashini
// ]

// export default function AudioInputPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const templateId = searchParams.get("template") // templateId will be a string like "p1", "c2"
//   const categoryId = searchParams.get("category")

//   const [isRecording, setIsRecording] = useState(false)
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [isLoading, setIsLoading] = useState(false) // Not currently used, but kept for consistency
//   const [selectedLanguage, setSelectedLanguage] = useState("en") // New state for selected language
//   const [openLanguageSelect, setOpenLanguageSelect] = useState(false) // For the combobox popover

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])

//   useEffect(() => {
//     // Check if template is selected
//     if (!templateId) {
//       toast({
//         title: "No template selected",
//         description: "Please select a template first.",
//         variant: "destructive",
//       })
//       router.push("/templates")
//     }
//   }, [router, templateId])

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       mediaRecorderRef.current = new MediaRecorder(stream)
//       audioChunksRef.current = []
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data)
//         }
//       }
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
//         setAudioBlob(audioBlob)
//         // Stop all tracks on the stream to release the microphone
//         stream.getTracks().forEach((track) => track.stop())
//       }
//       mediaRecorderRef.current.start()
//       setIsRecording(true)
//     } catch (error) {
//       console.error("Error accessing microphone:", error)
//       toast({
//         title: "Microphone Error",
//         description: "Could not access your microphone. Please check permissions.",
//         variant: "destructive",
//       })
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//     }
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Check if file is an audio file
//       if (!file.type.startsWith("audio/")) {
//         toast({
//           title: "Invalid file type",
//           description: "Please upload an audio file.",
//           variant: "destructive",
//         })
//         return
//       }
//       setAudioBlob(file)
//     }
//   }

//   const handleChooseDifferentTemplate = () => {
//     router.push("/templates")
//   }

//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       toast({
//         title: "No audio",
//         description: "Please record or upload an audio file.",
//         variant: "destructive",
//       })
//       return
//     }
//     setIsUploading(true)
//     try {
//       // Create form data to send audio, template ID, and selected language
//       const formData = new FormData()
//       formData.append("audio", audioBlob)
//       // IMPORTANT: Use templateId directly as a string, falling back to "p1" if not present
//       formData.append("templateId", templateId || "p1")
//       formData.append("language", selectedLanguage) // Append the selected language

//       // Send to backend
//       const response = await fetch("http://localhost:5000/api/process-audio", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       })
//       console.log("API Response:", response)
//       if (response.ok) {
//         const data = await response.json()
//         console.log("API Response Data:", data)
//         // Store the resume data in localStorage for use in the preview
//         localStorage.setItem("resumeData", JSON.stringify(data))
//         // Navigate to resume preview page with the template and category
//         router.push(`/resume-preview?template=${templateId || "p1"}&category=${categoryId}`)
//       } else {
//         const errorData = await response.json()
//         console.error("Backend Error Data:", errorData) // Add this line
//         toast({
//           title: "Processing Error",
//           description: errorData.message || "Failed to process audio. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error processing audio:", error)
//       toast({
//         title: "Error",
//         description: "An error occurred while processing your audio. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="mb-6">
//         <Button
//           variant="outline"
//           onClick={handleChooseDifferentTemplate}
//           className="flex items-center gap-2 bg-transparent"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Choose Different Template
//         </Button>
//       </div>
//       <h1 className="text-3xl font-bold mb-8">Record or Upload Audio</h1>
//       <p className="text-gray-600 mb-8">
//         Tell us about your experience, skills, education, and other relevant information for your resume. Speak clearly
//         and provide as much detail as possible for the best results.
//       </p>

//       {/* Language Selection Dropdown */}
//       <div className="mb-8 max-w-2xl mx-auto">
//         <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
//           Select Audio Language:
//         </label>
//         <Popover open={openLanguageSelect} onOpenChange={setOpenLanguageSelect}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={openLanguageSelect}
//               className="w-full justify-between bg-transparent"
//             >
//               {selectedLanguage ? languages.find((lang) => lang.code === selectedLanguage)?.name : "Select language..."}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
//             <Command>
//               <CommandInput placeholder="Search language..." />
//               <CommandList>
//                 <CommandEmpty>No language found.</CommandEmpty>
//                 <CommandGroup>
//                   {languages.map((lang) => (
//                     <CommandItem
//                       key={lang.code}
//                       value={lang.name}
//                       onSelect={() => {
//                         setSelectedLanguage(lang.code)
//                         setOpenLanguageSelect(false)
//                       }}
//                     >
//                       <Check
//                         className={cn("mr-2 h-4 w-4", selectedLanguage === lang.code ? "opacity-100" : "opacity-0")}
//                       />
//                       {lang.name}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <Tabs defaultValue="record" className="max-w-2xl mx-auto">
//         <TabsList className="grid w-full grid-cols-2 mb-8">
//           <TabsTrigger value="record">Record Audio</TabsTrigger>
//           <TabsTrigger value="upload">Upload Audio</TabsTrigger>
//         </TabsList>
//         <TabsContent value="record">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div
//                   className={`w-32 h-32 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"}`}
//                 >
//                   {isRecording ? (
//                     <StopCircle size={48} className="text-red-500" />
//                   ) : (
//                     <Mic size={48} className="text-gray-500" />
//                   )}
//                 </div>
//                 {audioBlob && !isRecording && (
//                   <div className="w-full">
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                   </div>
//                 )}
//                 <div className="flex space-x-4">
//                   {!isRecording ? (
//                     <Button onClick={startRecording} disabled={isUploading}>
//                       Start Recording
//                     </Button>
//                   ) : (
//                     <Button onClick={stopRecording} variant="destructive">
//                       Stop Recording
//                     </Button>
//                   )}
//                   {audioBlob && !isRecording && (
//                     <Button onClick={() => setAudioBlob(null)} variant="outline">
//                       Discard
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="upload">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
//                   <Upload size={48} className="text-gray-500" />
//                 </div>
//                 <div className="w-full">
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="audio-upload"
//                   />
//                   <label htmlFor="audio-upload">
//                     <Button variant="outline" className="w-full bg-transparent" asChild>
//                       <span>Choose Audio File</span>
//                     </Button>
//                   </label>
//                 </div>
//                 {audioBlob && (
//                   <div className="w-full">
//                     <p className="text-sm text-gray-500 mb-2">Selected file:</p>
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                     <Button onClick={() => setAudioBlob(null)} variant="outline" size="sm" className="mt-2">
//                       Remove
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//       <div className="flex justify-center mt-8">
//         <Button size="lg" onClick={handleSubmit} disabled={!audioBlob || isUploading}>
//           {isUploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             "Continue"
//           )}
//         </Button>
//       </div>
//       <div className="mt-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
//         <h3 className="font-semibold text-lg mb-4">Tips for best results:</h3>
//         <ul className="list-disc pl-5 space-y-2 text-gray-600">
//           <li>Speak clearly and at a moderate pace</li>
//           <li>Include your name, contact information, and professional summary</li>
//           <li>Describe your work experience with dates, company names, and responsibilities</li>
//           <li>List your education, certifications, and relevant skills</li>
//           <li>Mention any achievements or awards</li>
//           <li>Record in a quiet environment to minimize background noise</li>
//         </ul>
//       </div>
//     </div>
//   )
// }











// "use client"

// import { CommandEmpty } from "@/components/ui/command"
// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/components/ui/use-toast"
// import { Mic, Upload, StopCircle, Loader2, Check, ChevronsUpDown } from "lucide-react"
// import { ArrowLeft } from "lucide-react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// import { cn } from "@/lib/utils"

// // Define languages supported by Bhashini (example subset)
// const languages = [
//   { code: "en", name: "English" },
//   { code: "hi", name: "Hindi" },
//   { code: "ta", name: "Tamil" },
//   { code: "bn", name: "Bengali" },
//   { code: "gu", name: "Gujarati" },
//   { code: "kn", name: "Kannada" },
//   { code: "ml", name: "Malayalam" },
//   { code: "mr", name: "Marathi" },
//   { code: "pa", name: "Punjabi" },
//   { code: "te", name: "Telugu" },
//   // Add more languages as supported by Bhashini
// ]

// export default function AudioInputPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const templateId = searchParams.get("template") // templateId will be a string like "p1", "c2"
//   const categoryId = searchParams.get("category")

//   const [isRecording, setIsRecording] = useState(false)
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [isLoading, setIsLoading] = useState(false) // Not currently used, but kept for consistency
//   const [selectedLanguage, setSelectedLanguage] = useState("en") // New state for selected language
//   const [openLanguageSelect, setOpenLanguageSelect] = useState(false) // For the combobox popover

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])

//   useEffect(() => {
//     // Check if template is selected
//     if (!templateId) {
//       toast({
//         title: "No template selected",
//         description: "Please select a template first.",
//         variant: "destructive",
//       })
//       router.push("/templates")
//     }
//   }, [router, templateId])

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       mediaRecorderRef.current = new MediaRecorder(stream)
//       audioChunksRef.current = []
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data)
//         }
//       }
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
//         setAudioBlob(audioBlob)
//         // Stop all tracks on the stream to release the microphone
//         stream.getTracks().forEach((track) => track.stop())
//       }
//       mediaRecorderRef.current.start()
//       setIsRecording(true)
//     } catch (error) {
//       console.error("Error accessing microphone:", error)
//       toast({
//         title: "Microphone Error",
//         description: "Could not access your microphone. Please check permissions.",
//         variant: "destructive",
//       })
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//     }
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Check if file is an audio file
//       if (!file.type.startsWith("audio/")) {
//         toast({
//           title: "Invalid file type",
//           description: "Please upload an audio file.",
//           variant: "destructive",
//         })
//         return
//       }
//       setAudioBlob(file)
//     }
//   }

//   const handleChooseDifferentTemplate = () => {
//     router.push("/templates")
//   }

//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       toast({
//         title: "No audio",
//         description: "Please record or upload an audio file.",
//         variant: "destructive",
//       })
//       return
//     }
//     setIsUploading(true)
//     try {
//       // Create form data to send audio, template ID, and selected language
//       const formData = new FormData()
//       formData.append("audio", audioBlob)
//       formData.append("templateId", templateId || "p1")
//       formData.append("language", selectedLanguage)
//       const selectedProfession = localStorage.getItem("selectedProfession") || "driver"
//       formData.append("profession", selectedProfession)

//       // Send to backend
//       const response = await fetch("http://localhost:5000/api/process-audio", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       })
//       console.log("API Response:", response)
//       if (response.ok) {
//         const data = await response.json()
//         console.log("API Response Data:", data)
//         // Store the resume data in localStorage for use in the preview
//         localStorage.setItem("resumeData", JSON.stringify(data))
//         // Navigate to resume preview page with the template and category
//         router.push(`/resume-preview?template=${templateId || "p1"}&category=${categoryId}`)
//       } else {
//         const errorData = await response.json()
//         console.error("Backend Error Data:", errorData)
//         toast({
//           title: "Processing Error",
//           description: errorData.message || "Failed to process audio. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error processing audio:", error)
//       toast({
//         title: "Error",
//         description: "An error occurred while processing your audio. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="mb-6">
//         <Button
//           variant="outline"
//           onClick={handleChooseDifferentTemplate}
//           className="flex items-center gap-2 bg-transparent"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Choose Different Template
//         </Button>
//       </div>
//       <h1 className="text-3xl font-bold mb-8">Record or Upload Audio</h1>
//       <p className="text-gray-600 mb-8">
//         Tell us about your experience, skills, education, and other relevant information for your resume. Speak clearly
//         and provide as much detail as possible for the best results.
//       </p>

//       {/* Language Selection Dropdown */}
//       <div className="mb-8 max-w-2xl mx-auto">
//         <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
//           Select Audio Language:
//         </label>
//         <Popover open={openLanguageSelect} onOpenChange={setOpenLanguageSelect}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={openLanguageSelect}
//               className="w-full justify-between bg-transparent"
//             >
//               {selectedLanguage ? languages.find((lang) => lang.code === selectedLanguage)?.name : "Select language..."}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
//             <Command>
//               <CommandInput placeholder="Search language..." />
//               <CommandList>
//                 <CommandEmpty>No language found.</CommandEmpty>
//                 <CommandGroup>
//                   {languages.map((lang) => (
//                     <CommandItem
//                       key={lang.code}
//                       value={lang.name}
//                       onSelect={() => {
//                         setSelectedLanguage(lang.code)
//                         setOpenLanguageSelect(false)
//                       }}
//                     >
//                       <Check
//                         className={cn("mr-2 h-4 w-4", selectedLanguage === lang.code ? "opacity-100" : "opacity-0")}
//                       />
//                       {lang.name}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <Tabs defaultValue="record" className="max-w-2xl mx-auto">
//         <TabsList className="grid w-full grid-cols-2 mb-8">
//           <TabsTrigger value="record">Record Audio</TabsTrigger>
//           <TabsTrigger value="upload">Upload Audio</TabsTrigger>
//         </TabsList>
//         <TabsContent value="record">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div
//                   className={`w-32 h-32 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"}`}
//                 >
//                   {isRecording ? (
//                     <StopCircle size={48} className="text-red-500" />
//                   ) : (
//                     <Mic size={48} className="text-gray-500" />
//                   )}
//                 </div>
//                 {audioBlob && !isRecording && (
//                   <div className="w-full">
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                   </div>
//                 )}
//                 <div className="flex space-x-4">
//                   {!isRecording ? (
//                     <Button onClick={startRecording} disabled={isUploading}>
//                       Start Recording
//                     </Button>
//                   ) : (
//                     <Button onClick={stopRecording} variant="destructive">
//                       Stop Recording
//                     </Button>
//                   )}
//                   {audioBlob && !isRecording && (
//                     <Button onClick={() => setAudioBlob(null)} variant="outline">
//                       Discard
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="upload">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col items-center justify-center p-8 space-y-6">
//                 <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
//                   <Upload size={48} className="text-gray-500" />
//                 </div>
//                 <div className="w-full">
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="audio-upload"
//                   />
//                   <label htmlFor="audio-upload">
//                     <Button variant="outline" className="w-full bg-transparent" asChild>
//                       <span>Choose Audio File</span>
//                     </Button>
//                   </label>
//                 </div>
//                 {audioBlob && (
//                   <div className="w-full">
//                     <p className="text-sm text-gray-500 mb-2">Selected file:</p>
//                     <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
//                     <Button onClick={() => setAudioBlob(null)} variant="outline" size="sm" className="mt-2">
//                       Remove
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//       <div className="flex justify-center mt-8">
//         <Button size="lg" onClick={handleSubmit} disabled={!audioBlob || isUploading}>
//           {isUploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             "Continue"
//           )}
//         </Button>
//       </div>
//       <div className="mt-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
//         <h3 className="font-semibold text-lg mb-4">Tips for best results:</h3>
//         <ul className="list-disc pl-5 space-y-2 text-gray-600">
//           <li>Speak clearly and at a moderate pace</li>
//           <li>Include your name, contact information, and professional summary</li>
//           <li>Describe your work experience with dates, company names, and responsibilities</li>
//           <li>List your education, certifications, and relevant skills</li>
//           <li>Mention any achievements or awards</li>
//           <li>Record in a quiet environment to minimize background noise</li>
//         </ul>
//       </div>
//     </div>
//   )
// }








"use client"

import { CommandEmpty } from "@/components/ui/command"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Mic, Upload, StopCircle, Loader2, Check, ChevronsUpDown } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

// Define languages supported by Bhashini (example subset)
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "pa", name: "Punjabi" },
  { code: "te", name: "Telugu" },
]

const translations = {
  en: {
    title: "Record or Upload Audio",
    description:
      "Tell us about your experience, skills, education, and other relevant information for your resume. Speak clearly and provide as much detail as possible for the best results.",
    chooseDifferentTemplate: "Choose Different Template",
    selectAudioLanguage: "Select Audio Language:",
    selectLanguage: "Select language...",
    searchLanguage: "Search language...",
    noLanguageFound: "No language found.",
    recordAudio: "Record Audio",
    uploadAudio: "Upload Audio",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    discard: "Discard",
    chooseAudioFile: "Choose Audio File",
    selectedFile: "Selected file:",
    remove: "Remove",
    continue: "Continue",
    processing: "Processing...",
    tipsTitle: "Tips for best results:",
    tips: [
      "Speak clearly and at a moderate pace",
      "Include your name, contact information, and professional summary",
      "Describe your work experience with dates, company names, and responsibilities",
      "List your education, certifications, and relevant skills",
      "Mention any achievements or awards",
      "Record in a quiet environment to minimize background noise",
    ],
    audioPrompt:
      "Hello! Please tell me about yourself. How did you get into your current profession? How many years of experience do you have? Share details about your background, skills, and work history. You can either record directly or upload an audio file.",
    noTemplateSelected: "No template selected",
    pleaseSelectTemplate: "Please select a template first.",
    microphoneError: "Microphone Error",
    microphonePermission: "Could not access your microphone. Please check permissions.",
    invalidFileType: "Invalid file type",
    pleaseUploadAudio: "Please upload an audio file.",
    noAudio: "No audio",
    pleaseRecordOrUpload: "Please record or upload an audio file.",
    processingError: "Processing Error",
    failedToProcess: "Failed to process audio. Please try again.",
    error: "Error",
    errorOccurred: "An error occurred while processing your audio. Please try again.",
  },
  hi: {
    title: "ऑडियो रिकॉर्ड करें या अपलोड करें",
    description:
      "अपने अनुभव, कौशल, शिक्षा और अपने रिज्यूमे के लिए अन्य प्रासंगिक जानकारी के बारे में बता���ं। स्पष्ट रूप से बोलें और सर्वोत्तम परिणामों के लिए यथासंभव विस्तार प्रदान करें।",
    chooseDifferentTemplate: "अलग टेम्प्लेट चुनें",
    selectAudioLanguage: "ऑडियो भाषा चुनें:",
    selectLanguage: "भाषा चुनें...",
    searchLanguage: "भाषा खोजें...",
    noLanguageFound: "कोई भाषा नहीं मिली।",
    recordAudio: "ऑडियो रिकॉर्ड करें",
    uploadAudio: "ऑडियो अपलोड करें",
    startRecording: "रिकॉर्डिंग शुरू करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    discard: "रद्द करें",
    chooseAudioFile: "ऑडियो फ़ाइल चुनें",
    selectedFile: "चयनित फ़ाइल:",
    remove: "हटाएं",
    continue: "जारी रखें",
    processing: "प्रसंस्करण...",
    tipsTitle: "सर्वोत्तम परिणामों के लिए सुझाव:",
    tips: [
      "स्पष्ट रूप से और मध्यम गति से बोलें",
      "अपना नाम, संपर्क जानकारी और व्यावसायिक सारांश शामिल करें",
      "तारीखों, कंपनी के नाम और जिम्मेदारियों के साथ अपने कार्य अनुभव का वर्णन करें",
      "अपनी शिक्षा, प्रमाणपत्र और प्रासंगिक कौशल सूचीबद्ध करें",
      "किसी भी उपलब्धि या पुरस्कार का उल्लेख करें",
      "पृष्ठभूमि शोर को कम करने के लिए शांत वातावरण में रिकॉर्ड करें",
    ],
    audioPrompt:
      "नमस्ते! कृपया अपने बारे में बताएं। आप अपने वर्तमान पेशे में कैसे आए? आपके पास कितने साल का अनुभव है? अपनी पृष्ठभूमि, कौशल और कार्य इतिहास के बारे में विवरण साझा करें। आप सीधे रिकॉर्ड कर सकते हैं या ऑडियो फ़ाइल अपलोड कर सकते हैं।",
    noTemplateSelected: "कोई टेम्प्लेट चयनित नहीं",
    pleaseSelectTemplate: "कृपया पहले एक टेम्प्लेट चुनें।",
    microphoneError: "माइक्रोफ़ोन त्रुटि",
    microphonePermission: "आपके माइक्रोफ़ोन तक पहुंच नहीं हो सकी। कृपया अनुमतियां जांचें।",
    invalidFileType: "अमान्य फ़ाइल प्रकार",
    pleaseUploadAudio: "कृपया एक ऑडियो फ़ाइल अपलोड करें।",
    noAudio: "कोई ऑडियो नहीं",
    pleaseRecordOrUpload: "कृपया एक ऑडियो फ़ाइल रिकॉर्ड करें या अपलोड करें।",
    processingError: "प्रसंस्करण त्रुटि",
    failedToProcess: "ऑडियो प्रसंस्करण विफल। कृपया पुनः प्रयास करें।",
    error: "त्रुटि",
    errorOccurred: "आपके ऑडियो को प्रसंस्करण करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
  },
  ta: {
    title: "ஆடியோவை பதிவு செய்யுங்கள் அல்லது பதிவேற்றுங்கள்",
    description:
      "உங்கள் அனுபவம், திறன்கள், கல்வி மற்றும் உங்கள் ரெஸ்யூமேக்கான பிற தொடர்புடைய தகவல்களைப் பற்றி எங்களிடம் கூறுங்கள். தெளிவாகப் பேசுங்கள் மற்றும் சிறந்த முடிவுகளுக்கு முடிந்தவரை விரிவாக வழங்குங்கள்.",
    chooseDifferentTemplate: "வேறு டெம்ப்ளேட்டைத் தேர்ந்தெடுக்கவும்",
    selectAudioLanguage: "ஆடியோ மொழியைத் தேர்ந்தெடுக்கவும்:",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்...",
    searchLanguage: "மொழியைத் தேடுங்கள்...",
    noLanguageFound: "எந்த மொழியும் கிடைக்கவில்லை.",
    recordAudio: "ஆடியோவைப் பதிவு செய்யுங்கள்",
    uploadAudio: "ஆடியோவைப் பதிவேற்றுங்கள்",
    startRecording: "பதிவைத் தொடங்குங்கள்",
    stopRecording: "பதிவை நிறுத்துங்கள்",
    discard: "நிராகரிக்கவும்",
    chooseAudioFile: "ஆடியோ கோப்பைத் தேர்ந்தெடுக்கவும்",
    selectedFile: "தேர்ந்தெடுக்கப்பட்ட கோப்பு:",
    remove: "அகற்றவும்",
    continue: "தொடரவும்",
    processing: "செயலாக்கம்...",
    tipsTitle: "சிறந்த முடிவுகளுக்கான குறிப்புகள்:",
    tips: [
      "தெளிவாகவும் மிதமான வேகத்திலும் பேசுங்கள்",
      "உங்கள் பெயர், தொடர்பு தகவல் மற்றும் தொழில்முறை சுருக்கத்தைச் சேர்க்கவும்",
      "தேதிகள், நிறுவன பெயர்கள் மற்றும் பொறுப்புகளுடன் உங்கள் பணி அனுபவத்தை விவரிக்கவும்",
      "உங்கள் கல்வி, சான்றிதழ்கள் மற்றும் தொடர்புடைய திறன்களைப் பட்டியலிடுங்கள்",
      "எந்தவொரு சாதனைகள் அல்லது விருதுகளையும் குறிப்பிடுங்கள்",
      "பின்னணி சத்தத்தைக் குறைக்க அமைதியான சூழலில் பதிவு செய்யுங்கள்",
    ],
    audioPrompt:
      "வணக்கம்! உங்களைப் பற்றி எங்களிடம் கூறுங்கள். நீங்கள் உங்கள் தற்போதைய தொழிலில் எப்படி வந்தீர்கள்? உங்களுக்கு எத்தனை வருட அனுபவம் உள்ளது? உங்கள் பின்னணி, திறன்கள் மற்றும் பணி வரலாறு பற்றிய விவரங்களைப் பகிருங்கள். நீங்கள் நேரடியாகப் பதிவு செய்யலாம் அல்லது ஆடியோ கோப்பைப் பதிவேற்றலாம்.",
    noTemplateSelected: "எந்த டெம்ப்ளேட்டும் தேர்ந்தெடுக்கப்படவில்லை",
    pleaseSelectTemplate: "முதலில் ஒரு டெம்ப்ளேட்டைத் தேர்ந்தெடுக்கவும்.",
    microphoneError: "மைக்ரோஃபோன் பிழை",
    microphonePermission: "உங்கள் மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்.",
    invalidFileType: "தவறான கோப்பு வகை",
    pleaseUploadAudio: "ஆடியோ கோப்பைப் பதிவேற்றவும்.",
    noAudio: "ஆடியோ இல்லை",
    pleaseRecordOrUpload: "ஆடியோ கோப்பைப் பதிவு செய்யுங்கள் அல்லது பதிவேற்றுங்கள்.",
    processingError: "செயலாக்கப் பிழை",
    failedToProcess: "ஆடியோ செயலாக்கம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    error: "பிழை",
    errorOccurred: "உங்கள் ஆடியோவைச் செயலாக்கும்போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
  },
}

export default function AudioInputPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const categoryId = searchParams.get("category")

  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [openLanguageSelect, setOpenLanguageSelect] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const speakText = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === "hi" ? "hi-IN" : lang === "ta" ? "ta-IN" : "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setCurrentLanguage(savedLanguage)
    setSelectedLanguage(savedLanguage)

    // Check if template is selected
    if (!templateId) {
      const t = translations[savedLanguage as keyof typeof translations] || translations.en
      toast({
        title: t.noTemplateSelected,
        description: t.pleaseSelectTemplate,
        variant: "destructive",
      })
      router.push("/templates")
      return
    }

    // Play audio prompt when page loads
    const timer = setTimeout(() => {
      const t = translations[savedLanguage as keyof typeof translations] || translations.en
      speakText(t.audioPrompt, savedLanguage)
    }, 1000) // Delay to ensure page is fully loaded

    return () => clearTimeout(timer)
  }, [router, templateId])

  const t = translations[currentLanguage as keyof typeof translations] || translations.en

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: t.microphoneError,
        description: t.microphonePermission,
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("audio/")) {
        toast({
          title: t.invalidFileType,
          description: t.pleaseUploadAudio,
          variant: "destructive",
        })
        return
      }
      setAudioBlob(file)
    }
  }

  const handleChooseDifferentTemplate = () => {
    router.push("/templates")
  }

  const handleSubmit = async () => {
    if (!audioBlob) {
      toast({
        title: t.noAudio,
        description: t.pleaseRecordOrUpload,
        variant: "destructive",
      })
      return
    }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob)
      formData.append("templateId", templateId || "p1")
      formData.append("language", selectedLanguage)
      const selectedProfession = localStorage.getItem("selectedProfession") || "driver"
      formData.append("profession", selectedProfession)

      const response = await fetch("http://localhost:5000/api/process-audio", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
      console.log("API Response:", response)
      if (response.ok) {
        const data = await response.json()
        console.log("API Response Data:", data)
        localStorage.setItem("resumeData", JSON.stringify(data))
        router.push(`/resume-preview?template=${templateId || "p1"}&category=${categoryId}`)
      } else {
        const errorData = await response.json()
        console.error("Backend Error Data:", errorData)
        toast({
          title: t.processingError,
          description: errorData.message || t.failedToProcess,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      toast({
        title: t.error,
        description: t.errorOccurred,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleChooseDifferentTemplate}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.chooseDifferentTemplate}
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="mb-8 max-w-2xl mx-auto">
        <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
          {t.selectAudioLanguage}
        </label>
        <Popover open={openLanguageSelect} onOpenChange={setOpenLanguageSelect}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openLanguageSelect}
              className="w-full justify-between bg-transparent"
            >
              {selectedLanguage ? languages.find((lang) => lang.code === selectedLanguage)?.name : t.selectLanguage}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <Command>
              <CommandInput placeholder={t.searchLanguage} />
              <CommandList>
                <CommandEmpty>{t.noLanguageFound}</CommandEmpty>
                <CommandGroup>
                  {languages.map((lang) => (
                    <CommandItem
                      key={lang.code}
                      value={lang.name}
                      onSelect={() => {
                        setSelectedLanguage(lang.code)
                        setCurrentLanguage(lang.code)
                        localStorage.setItem("selectedLanguage", lang.code)
                        setOpenLanguageSelect(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedLanguage === lang.code ? "opacity-100" : "opacity-0")}
                      />
                      {lang.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="record" className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="record">{t.recordAudio}</TabsTrigger>
          <TabsTrigger value="upload">{t.uploadAudio}</TabsTrigger>
        </TabsList>
        <TabsContent value="record">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"}`}
                >
                  {isRecording ? (
                    <StopCircle size={48} className="text-red-500" />
                  ) : (
                    <Mic size={48} className="text-gray-500" />
                  )}
                </div>
                {audioBlob && !isRecording && (
                  <div className="w-full">
                    <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                  </div>
                )}
                <div className="flex space-x-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} disabled={isUploading}>
                      {t.startRecording}
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} variant="destructive">
                      {t.stopRecording}
                    </Button>
                  )}
                  {audioBlob && !isRecording && (
                    <Button onClick={() => setAudioBlob(null)} variant="outline">
                      {t.discard}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload size={48} className="text-gray-500" />
                </div>
                <div className="w-full">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <span>{t.chooseAudioFile}</span>
                    </Button>
                  </label>
                </div>
                {audioBlob && (
                  <div className="w-full">
                    <p className="text-sm text-gray-500 mb-2">{t.selectedFile}</p>
                    <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                    <Button onClick={() => setAudioBlob(null)} variant="outline" size="sm" className="mt-2">
                      {t.remove}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={handleSubmit} disabled={!audioBlob || isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.processing}
            </>
          ) : (
            t.continue
          )}
        </Button>
      </div>
      <div className="mt-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">{t.tipsTitle}</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {t.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
