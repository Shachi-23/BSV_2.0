// // // "use client"
// // // import { useState, useEffect } from "react"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent } from "@/components/ui/card"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { useRouter, useSearchParams } from "next/navigation"
// // // import { ArrowLeft } from "lucide-react"

// // // export default function TemplatesPage() {
// // //   const router = useRouter()
// // //   const searchParams = useSearchParams()
// // //   const categoryFromUrl = searchParams.get("category") || "1"
// // //   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)

// // //   // Template categories
// // //   const categories = [
// // //     { id: "1", name: "Professional" },
// // //     { id: "2", name: "Creative" },
// // //     { id: "3", name: "Minimal" },
// // //     { id: "4", name: "Executive" },
// // //   ]

// // //   // Templates for each category with descriptions
// // //   const templates = {
// // //     "1": [
// // //       { id: "p1", name: "Corporate", description: "Traditional two-column layout with sidebar" },
// // //       { id: "p2", name: "Business", description: "Clean centered design with section dividers" },
// // //       { id: "p3", name: "Executive Pro", description: "Header-focused layout with timeline" },
// // //       { id: "p4", name: "Modern Professional", description: "Card-based sections with accent colors" },
// // //       { id: "p5", name: "Classic", description: "Single column with elegant typography" },
// // //     ],
// // //     "2": [
// // //       { id: "c1", name: "Designer", description: "Colorful sidebar with circular profile" },
// // //       { id: "c2", name: "Artistic", description: "Asymmetric layout with creative elements" },
// // //       { id: "c3", name: "Digital Creative", description: "Modern grid with gradient accents" },
// // //       { id: "c4", name: "Portfolio Plus", description: "Image-focused with portfolio sections" },
// // //       { id: "c5", name: "Innovation", description: "Geometric shapes with bold typography" },
// // //     ],
// // //     "3": [
// // //       { id: "m1", name: "Clean", description: "Ultra-minimal with subtle dividers" },
// // //       { id: "m2", name: "Simplicity", description: "Typography-focused single column" },
// // //       { id: "m3", name: "Essentials", description: "Compact layout with essential info only" },
// // //       { id: "m4", name: "Minimalist Pro", description: "Spacious design with selective emphasis" },
// // //       { id: "m5", name: "Whitespace", description: "Maximum whitespace with minimal text" },
// // //     ],
// // //     "4": [
// // //       { id: "e1", name: "Leadership", description: "Bold header with executive summary focus" },
// // //       { id: "e2", name: "C-Suite", description: "Formal layout with achievement highlights" },
// // //       { id: "e3", name: "Director", description: "Professional columns with metrics emphasis" },
// // //       { id: "e4", name: "Board Member", description: "Distinguished design with board experience" },
// // //       { id: "e5", name: "Executive Elite", description: "Premium layout with luxury styling" },
// // //     ],
// // //   }

// // //   const handlePreview = (categoryId: string, templateId: string) => {
// // //     router.push(`/preview-template/${categoryId}/${templateId}`)
// // //   }

// // //   const handleBackToDashboard = () => {
// // //     router.push("/dashboard")
// // //   }

// // //   // Generate preview thumbnails for each template
// // //   const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
// // //     const templateType = templateId.charAt(0)
// // //     const templateNumber = templateId.substring(1)
// // //     switch (templateType) {
// // //       case "p":
// // //         return <ProfessionalThumbnail variant={templateNumber} />
// // //       case "c":
// // //         return <CreativeThumbnail variant={templateNumber} />
// // //       case "m":
// // //         return <MinimalThumbnail variant={templateNumber} />
// // //       case "e":
// // //         return <ExecutiveThumbnail variant={templateNumber} />
// // //       default:
// // //         return <ProfessionalThumbnail variant="1" />
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     const categoryFromUrl = searchParams.get("category") || "1"
// // //     setSelectedCategory(categoryFromUrl)
// // //   }, [searchParams])

// // //   return (
// // //     <div className="container mx-auto py-8 px-6">
// // //       {/* Back to Dashboard Button */}
// // //       <div className="mb-6">
// // //         <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
// // //           <ArrowLeft className="h-4 w-4" />
// // //           Back to Dashboard
// // //         </Button>
// // //       </div>

// // //       <div className="text-center mb-10">
// // //         <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
// // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // //           Select a template that best represents your professional style. Each template offers a unique design approach
// // //           within its category.
// // //         </p>
// // //       </div>

// // //       <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
// // //         <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
// // //           {categories.map((category) => (
// // //             <TabsTrigger key={category.id} value={category.id} className="w-full">
// // //               {category.name}
// // //             </TabsTrigger>
// // //           ))}
// // //         </TabsList>

// // //         {categories.map((category) => (
// // //           <TabsContent key={category.id} value={category.id}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //               {templates[category.id as keyof typeof templates].map((template) => (
// // //                 <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
// // //                   <CardContent className="p-0">
// // //                     <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(category.id, template.id)}</div>
// // //                     <div className="p-4">
// // //                       <div className="mb-2">
// // //                         <h3 className="font-semibold text-lg">{template.name}</h3>
// // //                         <p className="text-sm text-gray-600">{template.description}</p>
// // //                       </div>
// // //                       <Button size="sm" className="w-full" onClick={() => handlePreview(category.id, template.id)}>
// // //                         Preview & Select
// // //                       </Button>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               ))}
// // //             </div>
// // //           </TabsContent>
// // //         ))}
// // //       </Tabs>
// // //     </div>
// // //   )
// // // }

// // // // Thumbnail components for each template type
// // // function ProfessionalThumbnail({ variant }: { variant: string }) {
// // //   const thumbnails = {
// // //     "1": ( // Corporate - Two column with sidebar
// // //       <div className="w-full h-full p-2 bg-white">
// // //         <div className="flex h-full gap-1">
// // //           <div className="w-1/3 bg-blue-50 p-2">
// // //             <div className="w-full h-3 bg-blue-200 mb-2"></div>
// // //             <div className="space-y-1">
// // //               <div className="w-full h-1 bg-gray-300"></div>
// // //               <div className="w-3/4 h-1 bg-gray-300"></div>
// // //               <div className="w-full h-1 bg-gray-300"></div>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 p-2">
// // //             <div className="w-3/4 h-4 bg-gray-800 mb-2"></div>
// // //             <div className="w-1/2 h-2 bg-gray-400 mb-3"></div>
// // //             <div className="space-y-1">
// // //               <div className="w-full h-1 bg-gray-300"></div>
// // //               <div className="w-full h-1 bg-gray-300"></div>
// // //               <div className="w-2/3 h-1 bg-gray-300"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "2": ( // Business - Centered with dividers
// // //       <div className="w-full h-full p-3 bg-white">
// // //         <div className="text-center mb-3">
// // //           <div className="w-2/3 h-4 bg-gray-800 mx-auto mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-400 mx-auto"></div>
// // //           <div className="w-full h-px bg-gray-300 mt-2"></div>
// // //         </div>
// // //         <div className="space-y-2">
// // //           <div className="w-1/3 h-2 bg-gray-600"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-5/6 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "3": ( // Executive Pro - Header with timeline
// // //       <div className="w-full h-full bg-white">
// // //         <div className="bg-gray-800 p-2 text-white">
// // //           <div className="w-2/3 h-3 bg-white mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-300"></div>
// // //         </div>
// // //         <div className="p-2">
// // //           <div className="flex items-center gap-2 mb-2">
// // //             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// // //             <div className="w-1/2 h-2 bg-gray-600"></div>
// // //           </div>
// // //           <div className="ml-3 space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-3/4 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "4": ( // Modern Professional - Cards
// // //       <div className="w-full h-full p-2 bg-gray-50">
// // //         <div className="bg-white p-2 rounded mb-2">
// // //           <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-blue-500"></div>
// // //         </div>
// // //         <div className="grid grid-cols-2 gap-1">
// // //           <div className="bg-white p-1 rounded">
// // //             <div className="w-full h-1 bg-gray-400 mb-1"></div>
// // //             <div className="w-3/4 h-1 bg-gray-300"></div>
// // //           </div>
// // //           <div className="bg-white p-1 rounded">
// // //             <div className="w-full h-1 bg-gray-400 mb-1"></div>
// // //             <div className="w-2/3 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "5": ( // Classic - Single column elegant
// // //       <div className="w-full h-full p-3 bg-white">
// // //         <div className="text-center mb-4">
// // //           <div className="w-3/4 h-4 bg-gray-800 mx-auto mb-2"></div>
// // //           <div className="w-1/2 h-2 bg-gray-500 mx-auto"></div>
// // //         </div>
// // //         <div className="space-y-3">
// // //           <div>
// // //             <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
// // //             <div className="space-y-1">
// // //               <div className="w-full h-1 bg-gray-300"></div>
// // //               <div className="w-4/5 h-1 bg-gray-300"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //   }
// // //   return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
// // // }

// // // function CreativeThumbnail({ variant }: { variant: string }) {
// // //   const thumbnails = {
// // //     "1": ( // Designer - Colorful sidebar
// // //       <div className="w-full h-full flex bg-white">
// // //         <div className="w-1/3 bg-gradient-to-b from-purple-400 to-pink-400 p-2">
// // //           <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
// // //           <div className="text-center">
// // //             <div className="w-full h-2 bg-white/80 mb-1"></div>
// // //             <div className="w-3/4 h-1 bg-white/60 mx-auto"></div>
// // //           </div>
// // //         </div>
// // //         <div className="flex-1 p-2">
// // //           <div className="w-3/4 h-3 bg-gray-800 mb-2"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-5/6 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "2": ( // Artistic - Asymmetric
// // //       <div className="w-full h-full bg-white relative overflow-hidden">
// // //         <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-orange-300 to-red-300"></div>
// // //         <div className="p-2 relative z-10">
// // //           <div className="w-2/3 h-4 bg-gray-800 mb-2"></div>
// // //           <div className="w-1/2 h-2 bg-orange-500 mb-3"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-3/4 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "3": ( // Digital Creative - Grid with gradients
// // //       <div className="w-full h-full p-2 bg-gradient-to-br from-blue-50 to-purple-50">
// // //         <div className="grid grid-cols-3 gap-1 mb-2">
// // //           <div className="col-span-2 bg-white p-1 rounded">
// // //             <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
// // //           </div>
// // //           <div className="bg-white p-1 rounded">
// // //             <div className="w-full h-2 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //         <div className="bg-white p-2 rounded">
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-4/5 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "4": ( // Portfolio Plus - Image focused
// // //       <div className="w-full h-full bg-white p-2">
// // //         <div className="flex gap-2 mb-2">
// // //           <div className="w-1/3 h-12 bg-gradient-to-br from-green-300 to-blue-300 rounded"></div>
// // //           <div className="flex-1">
// // //             <div className="w-full h-3 bg-gray-800 mb-1"></div>
// // //             <div className="w-2/3 h-2 bg-green-500"></div>
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-3 gap-1">
// // //           <div className="h-6 bg-gray-200 rounded"></div>
// // //           <div className="h-6 bg-gray-200 rounded"></div>
// // //           <div className="h-6 bg-gray-200 rounded"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "5": ( // Innovation - Geometric
// // //       <div className="w-full h-full bg-white relative overflow-hidden">
// // //         <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 transform rotate-45 -translate-x-2 -translate-y-2"></div>
// // //         <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full translate-x-3 translate-y-3"></div>
// // //         <div className="p-3">
// // //           <div className="w-3/4 h-4 bg-gray-800 mb-2"></div>
// // //           <div className="w-1/2 h-2 bg-yellow-500 mb-3"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-2/3 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //   }
// // //   return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
// // // }

// // // function MinimalThumbnail({ variant }: { variant: string }) {
// // //   const thumbnails = {
// // //     "1": ( // Clean - Subtle dividers
// // //       <div className="w-full h-full p-4 bg-white">
// // //         <div className="mb-4">
// // //           <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-400"></div>
// // //         </div>
// // //         <div className="space-y-3">
// // //           <div className="border-b border-gray-200 pb-2">
// // //             <div className="w-1/4 h-1 bg-gray-500 mb-2"></div>
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "2": ( // Simplicity - Typography focused
// // //       <div className="w-full h-full p-4 bg-white">
// // //         <div className="text-center mb-6">
// // //           <div className="w-3/4 h-4 bg-gray-900 mx-auto mb-2"></div>
// // //           <div className="w-1/2 h-1 bg-gray-400 mx-auto"></div>
// // //         </div>
// // //         <div className="space-y-2">
// // //           <div className="w-1/3 h-1 bg-gray-600"></div>
// // //           <div className="w-full h-1 bg-gray-300"></div>
// // //           <div className="w-5/6 h-1 bg-gray-300"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "3": ( // Essentials - Compact
// // //       <div className="w-full h-full p-2 bg-white">
// // //         <div className="mb-2">
// // //           <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="flex gap-2 text-xs">
// // //             <div className="w-1/4 h-1 bg-gray-400"></div>
// // //             <div className="w-1/4 h-1 bg-gray-400"></div>
// // //           </div>
// // //         </div>
// // //         <div className="space-y-1">
// // //           <div className="w-1/4 h-1 bg-gray-600"></div>
// // //           <div className="w-full h-1 bg-gray-300"></div>
// // //           <div className="w-3/4 h-1 bg-gray-300"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "4": ( // Minimalist Pro - Spacious
// // //       <div className="w-full h-full p-6 bg-white">
// // //         <div className="mb-6">
// // //           <div className="w-1/2 h-3 bg-gray-800 mb-2"></div>
// // //           <div className="w-1/3 h-1 bg-gray-400"></div>
// // //         </div>
// // //         <div className="space-y-4">
// // //           <div className="w-1/5 h-1 bg-gray-500"></div>
// // //           <div className="w-4/5 h-1 bg-gray-300"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "5": ( // Whitespace - Maximum space
// // //       <div className="w-full h-full p-8 bg-white">
// // //         <div className="text-center mb-8">
// // //           <div className="w-1/2 h-2 bg-gray-800 mx-auto"></div>
// // //         </div>
// // //         <div className="space-y-6">
// // //           <div className="w-1/6 h-1 bg-gray-400"></div>
// // //           <div className="w-3/4 h-1 bg-gray-300"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //   }
// // //   return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
// // // }

// // // function ExecutiveThumbnail({ variant }: { variant: string }) {
// // //   const thumbnails = {
// // //     "1": ( // Leadership - Bold header
// // //       <div className="w-full h-full bg-white">
// // //         <div className="bg-gray-900 p-2 mb-2">
// // //           <div className="w-3/4 h-3 bg-white mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-300"></div>
// // //         </div>
// // //         <div className="p-2">
// // //           <div className="w-1/3 h-2 bg-gray-700 mb-2"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-4/5 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "2": ( // C-Suite - Formal with highlights
// // //       <div className="w-full h-full p-2 bg-gray-50">
// // //         <div className="bg-white p-2 border-l-4 border-blue-600 mb-2">
// // //           <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-blue-600"></div>
// // //         </div>
// // //         <div className="bg-white p-2">
// // //           <div className="flex justify-between mb-1">
// // //             <div className="w-1/3 h-1 bg-gray-600"></div>
// // //             <div className="w-1/4 h-1 bg-gray-400"></div>
// // //           </div>
// // //           <div className="w-full h-1 bg-gray-300"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "3": ( // Director - Professional columns
// // //       <div className="w-full h-full p-2 bg-white">
// // //         <div className="border-b-2 border-gray-800 pb-2 mb-2">
// // //           <div className="w-3/4 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-600"></div>
// // //         </div>
// // //         <div className="grid grid-cols-2 gap-2">
// // //           <div>
// // //             <div className="w-full h-1 bg-gray-600 mb-1"></div>
// // //             <div className="w-3/4 h-1 bg-gray-300"></div>
// // //           </div>
// // //           <div>
// // //             <div className="w-full h-1 bg-gray-600 mb-1"></div>
// // //             <div className="w-2/3 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "4": ( // Board Member - Distinguished
// // //       <div className="w-full h-full bg-white border-2 border-gray-300">
// // //         <div className="bg-gray-100 p-2 border-b">
// // //           <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-gray-600"></div>
// // //         </div>
// // //         <div className="p-2">
// // //           <div className="w-1/3 h-2 bg-gray-700 mb-2"></div>
// // //           <div className="space-y-1">
// // //             <div className="w-full h-1 bg-gray-300"></div>
// // //             <div className="w-5/6 h-1 bg-gray-300"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ),
// // //     "5": ( // Executive Elite - Premium
// // //       <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 text-white p-2">
// // //         <div className="mb-3">
// // //           <div className="w-3/4 h-3 bg-white mb-1"></div>
// // //           <div className="w-1/2 h-2 bg-yellow-400"></div>
// // //         </div>
// // //         <div className="space-y-2">
// // //           <div className="w-1/3 h-1 bg-gray-300"></div>
// // //           <div className="w-full h-1 bg-gray-400"></div>
// // //           <div className="w-4/5 h-1 bg-gray-400"></div>
// // //         </div>
// // //       </div>
// // //     ),
// // //   }
// // //   return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
// // // }























// // "use client"
// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { useRouter, useSearchParams } from "next/navigation"
// // import { ArrowLeft, Car, Package, Zap, Scissors, ChefHat, Shield, ShoppingCart, Wrench } from "lucide-react"

// // export default function TemplatesPage() {
// //   const router = useRouter()
// //   const searchParams = useSearchParams()
// //   const categoryFromUrl = searchParams.get("category") || "1"
// //   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)

// //   const categories = [
// //     { id: "1", name: "Driver", icon: Car },
// //     { id: "2", name: "Delivery Partner", icon: Package },
// //     { id: "3", name: "Electrician", icon: Zap },
// //     { id: "4", name: "Tailor", icon: Scissors },
// //     { id: "5", name: "Cook/Chef", icon: ChefHat },
// //     { id: "6", name: "Security Guard", icon: Shield },
// //     { id: "7", name: "Sales Assistant", icon: ShoppingCart },
// //     { id: "8", name: "Mechanic", icon: Wrench },
// //   ]

// //   const templates = {
// //     "1": [
// //       // Driver templates
// //       { id: "d1", name: "Professional Driver", description: "Clean layout emphasizing licenses and safety record" },
// //       { id: "d2", name: "Commercial Driver", description: "Focused on vehicle types and route experience" },
// //       { id: "d3", name: "Delivery Driver", description: "Highlights delivery stats and customer service" },
// //     ],
// //     "2": [
// //       // Delivery Partner templates
// //       { id: "dp1", name: "Food Delivery Pro", description: "Emphasizes speed, ratings, and food handling" },
// //       { id: "dp2", name: "Courier Specialist", description: "Focuses on package handling and reliability" },
// //       { id: "dp3", name: "Multi-Platform Partner", description: "Shows experience across delivery platforms" },
// //     ],
// //     "3": [
// //       // Electrician templates
// //       { id: "e1", name: "Licensed Electrician", description: "Highlights certifications and safety training" },
// //       { id: "e2", name: "Residential Specialist", description: "Focuses on home electrical work and repairs" },
// //       { id: "e3", name: "Commercial Electrician", description: "Emphasizes industrial and commercial projects" },
// //     ],
// //     "4": [
// //       // Tailor templates
// //       { id: "t1", name: "Master Tailor", description: "Showcases craftsmanship and specializations" },
// //       { id: "t2", name: "Alterations Expert", description: "Focuses on alteration skills and quick turnaround" },
// //       { id: "t3", name: "Fashion Tailor", description: "Highlights custom design and fashion expertise" },
// //     ],
// //     "5": [
// //       // Cook/Chef templates
// //       { id: "c1", name: "Professional Chef", description: "Emphasizes cuisine expertise and kitchen leadership" },
// //       { id: "c2", name: "Home Cook", description: "Focuses on family cooking and meal preparation" },
// //       { id: "c3", name: "Restaurant Cook", description: "Highlights fast-paced kitchen experience" },
// //     ],
// //     "6": [
// //       // Security Guard templates
// //       { id: "s1", name: "Licensed Security", description: "Emphasizes licenses and security training" },
// //       { id: "s2", name: "Corporate Security", description: "Focuses on office and corporate security" },
// //       { id: "s3", name: "Event Security", description: "Highlights crowd control and event management" },
// //     ],
// //     "7": [
// //       // Sales Assistant templates
// //       { id: "sa1", name: "Retail Associate", description: "Focuses on customer service and product knowledge" },
// //       { id: "sa2", name: "Shop Assistant", description: "Emphasizes POS systems and inventory management" },
// //       { id: "sa3", name: "Sales Specialist", description: "Highlights sales metrics and customer relationships" },
// //     ],
// //     "8": [
// //       // Mechanic templates
// //       { id: "m1", name: "Auto Mechanic", description: "Focuses on car repair and diagnostic skills" },
// //       { id: "m2", name: "Two-Wheeler Specialist", description: "Emphasizes motorcycle and scooter expertise" },
// //       { id: "m3", name: "Multi-Vehicle Mechanic", description: "Shows experience with various vehicle types" },
// //     ],
// //   }

// //   const handlePreview = (categoryId: string, templateId: string) => {
// //     router.push(`/preview-template/${categoryId}/${templateId}`)
// //   }

// //   const handleBackToDashboard = () => {
// //     router.push("/dashboard")
// //   }

// //   const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
// //     const templateType = templateId.substring(0, templateId.length - 1) // Remove number
// //     switch (templateType) {
// //       case "d":
// //         return <DriverThumbnail variant={templateId.slice(-1)} />
// //       case "dp":
// //         return <DeliveryPartnerThumbnail variant={templateId.slice(-1)} />
// //       case "e":
// //         return <ElectricianThumbnail variant={templateId.slice(-1)} />
// //       case "t":
// //         return <TailorThumbnail variant={templateId.slice(-1)} />
// //       case "c":
// //         return <CookChefThumbnail variant={templateId.slice(-1)} />
// //       case "s":
// //         return <SecurityGuardThumbnail variant={templateId.slice(-1)} />
// //       case "sa":
// //         return <SalesAssistantThumbnail variant={templateId.slice(-1)} />
// //       case "m":
// //         return <MechanicThumbnail variant={templateId.slice(-1)} />
// //       default:
// //         return <DriverThumbnail variant="1" />
// //     }
// //   }

// //   useEffect(() => {
// //     const categoryFromUrl = searchParams.get("category") || "1"
// //     setSelectedCategory(categoryFromUrl)
// //   }, [searchParams])

// //   return (
// //     <div className="container mx-auto py-8 px-6">
// //       {/* Back to Dashboard Button */}
// //       <div className="mb-6">
// //         <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
// //           <ArrowLeft className="h-4 w-4" />
// //           Back to Dashboard
// //         </Button>
// //       </div>

// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl font-bold mb-4">Choose Your Profession Template</h1>
// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           Select a template designed specifically for your profession. Each template includes relevant sections and
// //           formatting optimized for your field of work.
// //         </p>
// //       </div>

// //       <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
// //         <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 h-auto">
// //           {categories.map((category) => {
// //             const IconComponent = category.icon
// //             return (
// //               <TabsTrigger
// //                 key={category.id}
// //                 value={category.id}
// //                 className="w-full flex flex-col items-center gap-1 p-3"
// //               >
// //                 <IconComponent className="h-4 w-4" />
// //                 <span className="text-xs">{category.name}</span>
// //               </TabsTrigger>
// //             )
// //           })}
// //         </TabsList>

// //         {categories.map((category) => (
// //           <TabsContent key={category.id} value={category.id}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {templates[category.id as keyof typeof templates].map((template) => (
// //                 <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
// //                   <CardContent className="p-0">
// //                     <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(category.id, template.id)}</div>
// //                     <div className="p-4">
// //                       <div className="mb-2">
// //                         <h3 className="font-semibold text-lg">{template.name}</h3>
// //                         <p className="text-sm text-gray-600">{template.description}</p>
// //                       </div>
// //                       <Button size="sm" className="w-full" onClick={() => handlePreview(category.id, template.id)}>
// //                         Preview & Select
// //                       </Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>
// //         ))}
// //       </Tabs>
// //     </div>
// //   )
// // }

// // function DriverThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Car className="h-4 w-4 text-blue-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-blue-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="w-3/4 h-1 bg-gray-300"></div>
// //         <div className="flex gap-2 mt-2">
// //           <div className="w-1/4 h-1 bg-green-500"></div>
// //           <div className="w-1/4 h-1 bg-green-500"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function DeliveryPartnerThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Package className="h-4 w-4 text-orange-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-orange-600 mb-1"></div>
// //         <div className="flex justify-between">
// //           <div className="w-1/3 h-1 bg-gray-300"></div>
// //           <div className="w-1/4 h-1 bg-yellow-500"></div>
// //         </div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //       </div>
// //     </div>
// //   )
// // }

// // function ElectricianThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Zap className="h-4 w-4 text-yellow-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-yellow-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="grid grid-cols-3 gap-1">
// //           <div className="h-2 bg-yellow-200"></div>
// //           <div className="h-2 bg-yellow-200"></div>
// //           <div className="h-2 bg-yellow-200"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function TailorThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Scissors className="h-4 w-4 text-purple-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-purple-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="flex gap-1">
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function CookChefThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <ChefHat className="h-4 w-4 text-red-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-red-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="w-3/4 h-1 bg-gray-300"></div>
// //         <div className="flex gap-2">
// //           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
// //           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function SecurityGuardThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Shield className="h-4 w-4 text-blue-800" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-blue-800 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="border border-blue-300 p-1">
// //           <div className="w-3/4 h-1 bg-gray-300"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function SalesAssistantThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <ShoppingCart className="h-4 w-4 text-green-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-green-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="flex justify-between">
// //           <div className="w-1/3 h-1 bg-gray-300"></div>
// //           <div className="w-1/4 h-1 bg-green-400"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function MechanicThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Wrench className="h-4 w-4 text-gray-700" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="grid grid-cols-2 gap-1">
// //           <div className="h-2 bg-gray-200"></div>
// //           <div className="h-2 bg-gray-200"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }





// // "use client"
// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { useRouter, useSearchParams } from "next/navigation"
// // import { ArrowLeft, Car, Package, Zap, Scissors, ChefHat, Shield, ShoppingCart, Wrench } from "lucide-react"
// // import { getTranslation, type Language } from "@/lib/translations"

// // export default function TemplatesPage() {
// //   const router = useRouter()
// //   const searchParams = useSearchParams()
// //   const categoryFromUrl = searchParams.get("category") || "1"
// //   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)
// //   const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

// //   const categories = [
// //     { id: "1", name: "driver", icon: Car },
// //     { id: "2", name: "deliveryPartner", icon: Package },
// //     { id: "3", name: "electrician", icon: Zap },
// //     { id: "4", name: "tailor", icon: Scissors },
// //     { id: "5", name: "cookChef", icon: ChefHat },
// //     { id: "6", name: "securityGuard", icon: Shield },
// //     { id: "7", name: "salesAssistant", icon: ShoppingCart },
// //     { id: "8", name: "mechanic", icon: Wrench },
// //   ]

// //   const templates = {
// //     "1": [
// //       // Driver templates
// //       { 
// //         id: "d1", 
// //         name: {
// //           hi: 'पेशेवर ड्राइवर',
// //           en: 'Professional Driver',
// //           bn: 'পেশাদার চালক',
// //           te: 'వృత్తిపరమైన డ్రైవర్',
// //           mr: 'व्यावसायिक चालक',
// //           ta: 'தொழில்முறை ஓட்டுநர்',
// //           gu: 'વ્યાવસાયિક ડ્રાઇવર',
// //           kn: 'ವೃತ್ತಿಪರ ಚಾಲಕ',
// //           ml: 'പ്രൊഫഷണൽ ഡ്രൈവർ',
// //           pa: 'ਪੇਸ਼ੇਵਰ ਡਰਾਈਵਰ'
// //         },
// //         description: {
// //           hi: 'लाइसेंस और सुरक्षा रिकॉर्ड पर जोर देने वाला साफ लेआउट',
// //           en: 'Clean layout emphasizing licenses and safety record',
// //           bn: 'লাইসেন্স এবং নিরাপত্তা রেকর্ডের উপর জোর দিয়ে পরিষ্কার লেআউট',
// //           te: 'లైసెన్స్‌లు మరియు భద్రతా రికార్డ్‌ను నొక్కిచెప్పే క్లీన్ లేఅవుట్',
// //           mr: 'परवाने आणि सुरक्षा रेकॉर्डवर भर देणारा स्वच्छ लेआउट',
// //           ta: 'உரிமங்கள் மற்றும் பாதுகாப்பு பதிவை வலியுறுத்தும் தூய்மையான அமைப்பு',
// //           gu: 'લાઇસન્સ અને સલામતી રેકોર્ડ પર ભાર મૂકતું સ્વચ્છ લેઆઉટ',
// //           kn: 'ಪರವಾನಗಿಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ದಾಖಲೆಯನ್ನು ಒತ್ತಿಹೇಳುವ ಸ್ವಚ್ಛ ವಿನ್ಯಾಸ',
// //           ml: 'ലൈസൻസുകളും സുരക്ഷാ റെക്കോർഡും ഊന്നിപ്പറയുന്ന വൃത്തിയുള്ള ലേഔട്ട്',
// //           pa: 'ਲਾਇਸੈਂਸ ਅਤੇ ਸੁਰੱਖਿਆ ਰਿਕਾਰਡ ਤੇ ਜ਼ੋਰ ਦੇਣ ਵਾਲਾ ਸਾਫ਼ ਲੇਆਉਟ'
// //         }
// //       },
// //       { 
// //         id: "d2", 
// //         name: {
// //           hi: 'कमर्शियल ड्राइवर',
// //           en: 'Commercial Driver',
// //           bn: 'বাণিজ্যিক চালক',
// //           te: 'వాణిజ్య డ్రైవర్',
// //           mr: 'व्यावसायिक चालक',
// //           ta: 'வணிக ஓட்டுநர்',
// //           gu: 'કોમર્શિયલ ડ્રાઇવર',
// //           kn: 'ವಾಣಿಜ್ಯ ಚಾಲಕ',
// //           ml: 'കൊമേഴ്‌സ്യൽ ഡ്രൈവർ',
// //           pa: 'ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰ'
// //         },
// //         description: {
// //           hi: 'वाहन के प्रकार और मार्ग के अनुभव पर केंद्रित',
// //           en: 'Focused on vehicle types and route experience',
// //           bn: 'যানবাহনের ধরন এবং রুট অভিজ্ঞতার উপর ফোকাস',
// //           te: 'వాహన రకాలు మరియు మార్గ అనుభవంపై దృష్టి సారించింది',
// //           mr: 'वाहनाचे प्रकार आणि मार्ग अनुभवावर केंद्रित',
// //           ta: 'வாகன வகைகள் மற்றும் பாதை அனுபவத்தில் கவனம் செலுத்துகிறது',
// //           gu: 'વાહનના પ્રકારો અને રૂટ અનુભવ પર ધ્યાન કેન્દ્રિત',
// //           kn: 'ವಾಹನ ಪ್ರಕಾರಗಳು ಮತ್ತು ಮಾರ್ಗ ಅನುಭವದ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತ',
// //           ml: 'വാഹന തരങ്ങളിലും റൂട്ട് അനുഭവത്തിലും ശ്രദ്ധ കേന്ദ്രീകരിച്ചു',
// //           pa: 'ਵਾਹਨ ਦੀਆਂ ਕਿਸਮਾਂ ਅਤੇ ਰੂਟ ਦੇ ਤਜਰਬੇ ਤੇ ਕੇਂਦ੍ਰਿਤ'
// //         }
// //       },
// //       { 
// //         id: "d3", 
// //         name: {
// //           hi: 'डिलीवरी ड्राइवर',
// //           en: 'Delivery Driver',
// //           bn: 'ডেলিভারি চালক',
// //           te: 'డెలివరీ డ్రైవర్',
// //           mr: 'डिलिव्हरी चालक',
// //           ta: 'டெலிவரி ஓட்டுநர்',
// //           gu: 'ડિલિવરી ડ્રાઇવર',
// //           kn: 'ಡೆಲಿವರಿ ಚಾಲಕ',
// //           ml: 'ഡെലിവറി ഡ്രൈവർ',
// //           pa: 'ਡਿਲੀਵਰੀ ਡਰਾਈਵਰ'
// //         },
// //         description: {
// //           hi: 'डिलीवरी आंकड़े और ग्राहक सेवा को उजागर करता है',
// //           en: 'Highlights delivery stats and customer service',
// //           bn: 'ডেলিভারি পরিসংখ্যান এবং গ্রাহক সেবা তুলে ধরে',
// //           te: 'డెలివరీ గణాంకాలు మరియు కస్టమర్ సేవను హైలైట్ చేస్తుంది',
// //           mr: 'डिलिव्हरी आकडेवारी आणि ग्राहक सेवा हायलाइट करते',
// //           ta: 'டெலிவரி புள்ளிவிவரங்கள் மற்றும் வாடிக்கையாளர் சேவையை முன்னிலைப்படுத்துகிறது',
// //           gu: 'ડિલિવરી આંકડા અને ગ્રાહક સેવાને હાઇલાઇટ કરે છે',
// //           kn: 'ಡೆಲಿವರಿ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ',
// //           ml: 'ഡെലിവറി സ്ഥിതിവിവരക്കണക്കുകളും ഉപഭോക്തൃ സേവനവും ഹൈലൈറ്റ് ചെയ്യുന്നു',
// //           pa: 'ਡਿਲੀਵਰੀ ਅੰਕੜੇ ਅਤੇ ਗਾਹਕ ਸੇਵਾ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ'
// //         }
// //       },
// //     ],
// //     "2": [
// //       // Delivery Partner templates
// //       { id: "dp1", name: "Food Delivery Pro", description: "Emphasizes speed, ratings, and food handling" },
// //       { id: "dp2", name: "Courier Specialist", description: "Focuses on package handling and reliability" },
// //       { id: "dp3", name: "Multi-Platform Partner", description: "Shows experience across delivery platforms" },
// //     ],
// //     "3": [
// //       // Electrician templates
// //       { id: "e1", name: "Licensed Electrician", description: "Highlights certifications and safety training" },
// //       { id: "e2", name: "Residential Specialist", description: "Focuses on home electrical work and repairs" },
// //       { id: "e3", name: "Commercial Electrician", description: "Emphasizes industrial and commercial projects" },
// //     ],
// //     "4": [
// //       // Tailor templates
// //       { id: "t1", name: "Master Tailor", description: "Showcases craftsmanship and specializations" },
// //       { id: "t2", name: "Alterations Expert", description: "Focuses on alteration skills and quick turnaround" },
// //       { id: "t3", name: "Fashion Tailor", description: "Highlights custom design and fashion expertise" },
// //     ],
// //     "5": [
// //       // Cook/Chef templates\
// //       { id: "c1", name: "Professional Chef", description: "Emphasizes cuisine expertise and kitchen leadership" },
// //       { id: "c2", name: "Home Cook", description: "Focuses on family cooking and meal preparation" },
// //       { id: "c3", name: "Restaurant Cook", description: "Highlights fast-paced kitchen experience" },
// //     ],
// //     "6": [
// //       // Security Guard templates
// //       { id: "s1", name: "Licensed Security", description: "Emphasizes licenses and security training" },
// //       { id: "s2", name: "Corporate Security", description: "Focuses on office and corporate security" },
// //       { id: "s3", name: "Event Security", description: "Highlights crowd control and event management" },
// //     ],
// //     "7": [
// //       // Sales Assistant templates
// //       { id: "sa1", name: "Retail Associate", description: "Focuses on customer service and product knowledge" },
// //       { id: "sa2", name: "Shop Assistant", description: "Emphasizes POS systems and inventory management" },
// //       { id: "sa3", name: "Sales Specialist", description: "Highlights sales metrics and customer relationships" },
// //     ],
// //     "8": [
// //       // Mechanic templates
// //       { id: "m1", name: "Auto Mechanic", description: "Focuses on car repair and diagnostic skills" },
// //       { id: "m2", name: "Two-Wheeler Specialist", description: "Emphasizes motorcycle and scooter expertise" },
// //       { id: "m3", name: "Multi-Vehicle Mechanic", description: "Shows experience with various vehicle types" },
// //     ],
// //   }

// //   const handlePreview = (categoryId: string, templateId: string) => {
// //     router.push(`/preview-template/${categoryId}/${templateId}?lang=${currentLanguage}`)
// //   }

// //   const handleBackToDashboard = () => {
// //     router.push("/dashboard")
// //   }

// //   const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
// //     const templateType = templateId.substring(0, templateId.length - 1) // Remove number
// //     switch (templateType) {
// //       case "d":
// //         return <DriverThumbnail variant={templateId.slice(-1)} />
// //       case "dp":
// //         return <DeliveryPartnerThumbnail variant={templateId.slice(-1)} />
// //       case "e":
// //         return <ElectricianThumbnail variant={templateId.slice(-1)} />
// //       case "t":
// //         return <TailorThumbnail variant={templateId.slice(-1)} />
// //       case "c":
// //         return <CookChefThumbnail variant={templateId.slice(-1)} />
// //       case "s":
// //         return <SecurityGuardThumbnail variant={templateId.slice(-1)} />
// //       case "sa":
// //         return <SalesAssistantThumbnail variant={templateId.slice(-1)} />
// //       case "m":
// //         return <MechanicThumbnail variant={templateId.slice(-1)} />
// //       default:
// //         return <DriverThumbnail variant="1" />
// //     }
// //   }

// //   useEffect(() => {
// //     const categoryFromUrl = searchParams.get("category") || "1"
// //     const langFromUrl = searchParams.get("lang") as Language || 'en'
// //     setSelectedCategory(categoryFromUrl)
// //     setCurrentLanguage(langFromUrl)
// //   }, [searchParams])

// //   return (
// //     <div className="container mx-auto py-8 px-6">
// //       {/* Language Selector and Back Button */}
// //       <div className="flex justify-between items-center mb-6">
// //         <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
// //           <ArrowLeft className="h-4 w-4" />
// //           {getTranslation('ui.backToDashboard', currentLanguage)}
// //         </Button>
// //         <LanguageSelector 
// //           currentLanguage={currentLanguage} 
// //           onLanguageChange={setCurrentLanguage}
// //         />
// //       </div>

// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl font-bold mb-4">
// //           {getTranslation('ui.chooseTemplate', currentLanguage)}
// //         </h1>
// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           {getTranslation('ui.templateDescription', currentLanguage)}
// //         </p>
// //       </div>

// //       <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
// //         <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 h-auto">
// //           {categories.map((category) => {
// //             const IconComponent = category.icon
// //             return (
// //               <TabsTrigger
// //                 key={category.id}
// //                 value={category.id}
// //                 className="w-full flex flex-col items-center gap-1 p-3"
// //               >
// //                 <IconComponent className="h-4 w-4" />
// //                 <span className="text-xs">
// //                   {getTranslation(`categories.${category.name}`, currentLanguage)}
// //                 </span>
// //               </TabsTrigger>
// //             )
// //           })}
// //         </TabsList>

// //         {categories.map((category) => (
// //           <TabsContent key={category.id} value={category.id}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {templates[category.id as keyof typeof templates].map((template) => (
// //                 <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
// //                   <CardContent className="p-0">
// //                     <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(category.id, template.id)}</div>
// //                     <div className="p-4">
// //                       <div className="mb-2">
// //                         <h3 className="font-semibold text-lg">
// //                           {template.name[currentLanguage]}
// //                         </h3>
// //                         <p className="text-sm text-gray-600">
// //                           {template.description[currentLanguage]}
// //                         </p>
// //                       </div>
// //                       <Button size="sm" className="w-full" onClick={() => handlePreview(category.id, template.id)}>
// //                         {getTranslation('ui.previewAndSelect', currentLanguage)}
// //                       </Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>
// //         ))}
// //       </Tabs>
// //     </div>
// //   )
// // }

// // function DriverThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Car className="h-4 w-4 text-blue-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-blue-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="w-3/4 h-1 bg-gray-300"></div>
// //         <div className="flex gap-2 mt-2">
// //           <div className="w-1/4 h-1 bg-green-500"></div>
// //           <div className="w-1/4 h-1 bg-green-500"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function DeliveryPartnerThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Package className="h-4 w-4 text-orange-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-orange-600 mb-1"></div>
// //         <div className="flex justify-between">
// //           <div className="w-1/3 h-1 bg-gray-300"></div>
// //           <div className="w-1/4 h-1 bg-yellow-500"></div>
// //         </div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //       </div>
// //     </div>
// //   )
// // }

// // function ElectricianThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Zap className="h-4 w-4 text-yellow-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-yellow-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="grid grid-cols-3 gap-1">
// //           <div className="h-2 bg-yellow-200"></div>
// //           <div className="h-2 bg-yellow-200"></div>
// //           <div className="h-2 bg-yellow-200"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function TailorThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Scissors className="h-4 w-4 text-purple-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-purple-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="flex gap-1">
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function CookChefThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <ChefHat className="h-4 w-4 text-red-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-red-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="w-3/4 h-1 bg-gray-300"></div>
// //         <div className="flex gap-2">
// //           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
// //           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function SecurityGuardThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Shield className="h-4 w-4 text-blue-800" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-blue-800 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="border border-blue-300 p-1">\
// //           <div className="w-3/4 h-1 bg-gray-300"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function SalesAssistantThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <ShoppingCart className="h-4 w-4 text-green-600" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-green-600 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="flex justify-between">
// //           <div className="w-1/3 h-1 bg-gray-300"></div>
// //           <div className="w-1/4 h-1 bg-green-400"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function MechanicThumbnail({ variant }: { variant: string }) {
// //   return (
// //     <div className="w-full h-full p-3 bg-white">
// //       <div className="flex items-center gap-2 mb-3">
// //         <Wrench className="h-4 w-4 text-gray-700" />
// //         <div className="w-2/3 h-3 bg-gray-800"></div>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
// //         <div className="w-full h-1 bg-gray-300"></div>
// //         <div className="grid grid-cols-2 gap-1">
// //           <div className="h-2 bg-gray-200"></div>
// //           <div className="h-2 bg-gray-200"></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }










// "use client"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useRouter, useSearchParams } from "next/navigation"
// import { ArrowLeft, Car, Package, Zap, Scissors, ChefHat, Shield, ShoppingCart, Wrench } from "lucide-react"
// import { getTranslation, type Language } from "@/lib/translations"
// import LanguageSelector from "@/components/language-selector"

// export default function TemplatesPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const categoryFromUrl = searchParams.get("category") || "1"
//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)
//   const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

//   const categories = [
//     { id: "1", name: "driver", icon: Car },
//     { id: "2", name: "deliveryPartner", icon: Package },
//     { id: "3", name: "electrician", icon: Zap },
//     { id: "4", name: "tailor", icon: Scissors },
//     { id: "5", name: "cookChef", icon: ChefHat },
//     { id: "6", name: "securityGuard", icon: Shield },
//     { id: "7", name: "salesAssistant", icon: ShoppingCart },
//     { id: "8", name: "mechanic", icon: Wrench },
//   ]

//   interface TemplateItem {
//     id: string
//     name: Record<Language, string>
//     description: Record<Language, string>
//   }

//   const templates: Record<string, TemplateItem[]> = {
//     "1": [
//       // Driver templates
//       {
//         id: "d1",
//         name: {
//           hi: "पेशेवर ड्राइवर",
//           en: "Professional Driver",
//           bn: "পেশাদার চালক",
//           te: "వృత్తిపరమైన డ్రైవర్",
//           mr: "व्यावसायिक चालक",
//           ta: "தொழில்முறை ஓட்டுநர்",
//           gu: "વ્યાવસાયિક ડ્રાઇવર",
//           kn: "ವೃತ್ತಿಪರ ಚಾಲಕ",
//           ml: "പ്രൊഫഷണൽ ഡ്രൈവർ",
//           pa: "ਪੇਸ਼ੇਵਰ ਡਰਾਈਵਰ",
//         },
//         description: {
//           hi: "लाइसेंस और सुरक्षा रिकॉर्ड पर जोर देने वाला साफ लेआउट",
//           en: "Clean layout emphasizing licenses and safety record",
//           bn: "লাইসেন্স এবং নিরাপত্তা রেকর্ডের উপর জোর দিয়ে পরিষ্কার লেআউট",
//           te: "లైసెన్స్‌లు మరియు భద్రతా రికార్డ్‌ను నొక్కిచెప్పే క్లీన్ లేఅవుట్",
//           mr: "परवाने आणि सुरक्षा रेकॉर्डवर भर देणारा स्वच्छ लेआउट",
//           ta: "உரிமங்கள் மற்றும் பாதுகாப்பு பதிவை வலியுறுத்தும் தூய்மையான அமைப்பு",
//           gu: "લાઇસન્સ અને સલામતી રેકોર્ડ પર ભાર મૂકતું સ્વચ્છ લેઆઉટ",
//           kn: "ಪರವಾನಗಿಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ದಾಖಲೆಯನ್ನು ಒತ್ತಿಹೇಳುವ ಸ್ವಚ್ಛ ವಿನ್ಯಾಸ",
//           ml: "ലൈസൻസുകളും സുരക്ഷാ റെക്കോർഡും ഊന്നിപ്പറയുന്ന വൃത്തിയുള്ള ലേഔട്ട്",
//           pa: "ਲਾਇਸੈਂਸ ਅਤੇ ਸੁਰੱਖਿਆ ਰਿਕਾਰਡ ਤੇ ਜ਼ੋਰ ਦੇਣ ਵਾਲਾ ਸਾਫ਼ ਲੇਆਉਟ",
//         },
//       },
//       {
//         id: "d2",
//         name: {
//           hi: "कमर्शियल ड्राइवर",
//           en: "Commercial Driver",
//           bn: "বাণিজ্যিক চালক",
//           te: "వాణిజ్య డ్రైవర్",
//           mr: "व्यावसायिक चालक",
//           ta: "வணிக ஓட்டுநர்",
//           gu: "કોમર્શિયલ ડ્રાઇવર",
//           kn: "ವಾಣಿಜ್ಯ ಚಾಲಕ",
//           ml: "കൊമേഴ്‌സ്യൽ ഡ്രൈവർ",
//           pa: "ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰ",
//         },
//         description: {
//           hi: "वाहन के प्रकार और मार्ग के अनुभव पर केंद्रित",
//           en: "Focused on vehicle types and route experience",
//           bn: "যানবাহনের ধরন এবং রুট অভিজ্ঞতার উপর ফোকাস",
//           te: "వాహన రకాలు మరియు మార్గ అనుభవంపై దృష్టి సారించింది",
//           mr: "वाहनाचे प्रकार आणि मार्ग अनुभवावर केंद्रित",
//           ta: "வாகன வகைகள் மற்றும் பாதை அனுபவத்தில் கவனம் செலுத்துகிறது",
//           gu: "વાહનના પ્રકારો અને રૂટ અનુભવ પર ધ્યાન કેન્દ્રિત",
//           kn: "ವಾಹನ ಪ್ರಕಾರಗಳು ಮತ್ತು ಮಾರ್ಗ ಅನುಭವದ ಮೇಲೆ ಕೇಂದ್ರೀকೃತ",
//           ml: "വാഹന തരങ്ങളിലും റൂട്ട് അനുഭവത്തിലും ശ്രദ്ധ കേന്ദ്രീകരിച്ചു",
//           pa: "ਵਾਹਨ ਦੀਆਂ ਕਿਸਮਾਂ ਅਤੇ ਰੂਟ ਦੇ ਤਜਰਬੇ ਤੇ ਕੇਂਦ੍ਰਿਤ",
//         },
//       },
//       {
//         id: "d3",
//         name: {
//           hi: "डिलीवरी ड्राइवर",
//           en: "Delivery Driver",
//           bn: "ডেলিভারি চালক",
//           te: "డెలివరీ డ్రైవర్",
//           mr: "डिलिव्हरी चालक",
//           ta: "டெலிவரி ஓட்டுநர்",
//           gu: "ડિલિવરી ડ્રાઇવર",
//           kn: "ಡೆಲಿವರಿ ಚಾಲಕ",
//           ml: "ഡെലിവറി ഡ്രൈവർ",
//           pa: "ਡਿਲੀਵਰੀ ਡਰਾਈਵਰ",
//         },
//         description: {
//           hi: "डिलीवरी आंकड़े और ग्राहक सेवा को उजागर करता है",
//           en: "Highlights delivery stats and customer service",
//           bn: "ডেলিভারি পরিসংখ্যান এবং গ্রাহক সেবা তুলে ধরে",
//           te: "డెలివరీ గణాంకాలు మరియు కస్టమర్ సేవను హైలైట్ చేస్తుంది",
//           mr: "डिलिव्हरी आकडेवारी आणि ग्राहक सेवा हायलाइट करते",
//           ta: "டெலிவரி புள்ளிவிவரங்கள் மற்றும் வாடிக்கையாளர் சேவையை முன்னிலைப்படுத்துகிறது",
//           gu: "ડિલિવરી આંકડા અને ગ્રાહક સેવાને હાઇલાઇટ કરે છે",
//           kn: "ಡೆಲಿವರಿ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "ഡെലിവറി സ്ഥിതിവിവരക്കണക്കുകളും ഉപഭോക്തൃ സേവനവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਡਿਲੀਵਰੀ ਅੰਕੜੇ ਅਤੇ ਗਾਹਕ ਸੇਵਾ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//     ],
//     "2": [
//       // Delivery Partner templates - using fallback for now
//       {
//         id: "dp1",
//         name: {
//           hi: "फूड डिलीवरी प्रो",
//           en: "Food Delivery Pro",
//           bn: "ফুড ডেলিভারি প্রো",
//           te: "ఫుడ్ డెలివరీ ప్రో",
//           mr: "फूड डिलिव्हरी प्रो",
//           ta: "உணவு டெலிவரி ப்ரோ",
//           gu: "ફૂડ ડિલિવરી પ્રો",
//           kn: "ಫುಡ್ ಡೆಲಿವರಿ ಪ್ರೊ",
//           ml: "ഫുഡ് ഡെലിവറി പ്രോ",
//           pa: "ਫੂਡ ਡਿਲੀਵਰੀ ਪ੍ਰੋ",
//         },
//         description: {
//           hi: "गति, रेटिंग और खाद्य हैंडलिंग पर जोर",
//           en: "Emphasizes speed, ratings, and food handling",
//           bn: "গতি, রেটিং এবং খাদ্য হ্যান্ডলিং এর উপর জোর",
//           te: "వేగం, రేటింగ్‌లు మరియు ఆహార నిర్వహణపై దృష్టి",
//           mr: "वेग, रेटिंग आणि अन्न हाताळणीवर भर",
//           ta: "வேகம், மதிப்பீடுகள் மற்றும் உணவு கையாளுதலை வலியுறுத்துகிறது",
//           gu: "ઝડપ, રેટિંગ અને ખોરાક હેન્ડલિંગ પર ભાર",
//           kn: "ವೇಗ, ರೇಟಿಂಗ್‌ಗಳು ಮತ್ತು ಆಹಾರ ನಿರ್ವಹಣೆಯ ಮೇಲೆ ಒತ್ತು",
//           ml: "വേഗത, റേറ്റിംഗുകൾ, ഭക്ഷണ കൈകാര്യം ചെയ്യൽ എന്നിവയ്ക്ക് ഊന്നൽ",
//           pa: "ਗਤੀ, ਰੇਟਿੰਗ ਅਤੇ ਭੋਜਨ ਹੈਂਡਲਿੰਗ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//       {
//         id: "dp2",
//         name: {
//           hi: "कूरियर विशेषज्ञ",
//           en: "Courier Specialist",
//           bn: "কুরিয়ার বিশেষজ্ঞ",
//           te: "కొరియర్ స్పెషలిస్ట్",
//           mr: "कुरिअर तज्ञ",
//           ta: "கூரியர் நிபுணர்",
//           gu: "કુરિયર નિષ્ણાત",
//           kn: "ಕೊರಿಯರ್ ಸ್ಪೆಷಲಿಸ್ಟ್",
//           ml: "കൊറിയർ സ്പെഷ്യലിസ്റ്റ്",
//           pa: "ਕੂਰੀਅਰ ਸਪੈਸ਼ਲਿਸਟ",
//         },
//         description: {
//           hi: "पैकेज हैंडलिंग और विश्वसनीयता पर केंद्रित",
//           en: "Focuses on package handling and reliability",
//           bn: "প্যাকেজ হ্যান্ডলিং এবং নির্ভরযোগ্যতার উপর ফোকাস",
//           te: "ప్యాకేజ్ హ్యాండ్లింగ్ మరియు విశ్వసనీయతపై దృష్టి",
//           mr: "पॅकेज हाताळणी आणि विश्वसनीयतेवर लक्ष",
//           ta: "பேக்கேஜ் கையாளுதல் மற்றும் நம்பகத்தன்மையில் கவனம் செலுத்துகிறது",
//           gu: "પેકેજ હેન્ડલિંગ અને વિશ્વસનીયતા પર ધ્યાન",
//           kn: "ಪ್ಯಾಕೇಜ್ ಹ್ಯಾಂಡ್ಲಿಂಗ್ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "പാക്കേജ് കൈകാര്യം ചെയ്യലും വിശ്വാസ്യതയും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਪੈਕੇਜ ਹੈਂਡਲਿੰਗ ਅਤੇ ਭਰੋਸੇਯੋਗਤਾ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "dp3",
//         name: {
//           hi: "मल्टी-प्लेटफॉर्म पार्टनर",
//           en: "Multi-Platform Partner",
//           bn: "মাল্টি-প্ল্যাটফর্ম পার্টনার",
//           te: "మల్టీ-ప్లాట్‌ఫారమ్ పార్టనర్",
//           mr: "मल्टी-प्लॅफॉર्म पार्टनर",
//           ta: "மல்டி-பிளாட்ஃபார்ம் பார்ட்னர்",
//           gu: "મલ્ટી-પ્લેટફોર્મ પાર્ટનર",
//           kn: "ಮಲ್ಟಿ-ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಪಾರ್ಟ್ನರ್",
//           ml: "മൾട്ടി-പ്ലാറ്റ്ഫോം പാർട്ണർ",
//           pa: "ਮਲਟੀ-ਪਲੇਟਫਾਰਮ ਪਾਰਟਨਰ",
//         },
//         description: {
//           hi: "डिलीवरी प्लेटफॉर्म में अनुभव दिखाता है",
//           en: "Shows experience across delivery platforms",
//           bn: "ডেলিভারি প্ল্যাটফর্ম জুড়ে অভিজ্ঞতা দেখায়",
//           te: "డెలివరీ ప్లాట్‌ఫారమ్‌లలో అనుభవాన్ని చూపిస్తుంది",
//           mr: "डिलिव्हरी प्लॅफॉર्मवरील अनुभव दाखवते",
//           ta: "டெலிவரி பிளாட்ஃபார்ம்களில் அனுபவத்தைக் காட்டுகிறது",
//           gu: "ડિલિવરી પ્લેટફોર્મ પર અનુભવ બતાવે છે",
//           kn: "ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ ಅನುಭವವನ್ನು ತೋರಿಸುತ್ತದೆ",
//           ml: "ഡെലിവറി പ്ലാറ്റ്ഫോമുകളിലുടനീളം അനുഭവം കാണിക്കുന്നു",
//           pa: "ਡਿਲੀਵਰੀ ਪਲੇਟਫਾਰਮਾਂ ਵਿੱਚ ਤਜਰਬਾ ਦਿਖਾਉਂਦਾ ਹੈ",
//         },
//       },
//     ],
//     "3": [
//       {
//         id: "e1",
//         name: {
//           hi: "लाइसेंसशुदा इलेक्ट्रीशियन",
//           en: "Licensed Electrician",
//           bn: "লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান",
//           te: "లైసెన్స్ పొందిన ఎలక్ట్రీషియన్",
//           mr: "परवानाधारक इलेक्ट्रिशियन",
//           ta: "உரிமம் பெற்ற மின்சாரம்",
//           gu: "લાઇસન્સ પ્રાપ્ત ઇલેક્ટ્રિશિયન",
//           kn: "ಪರವಾನಗಿ ಪಡೆದ ಎಲೆక್ಟ್રಿಷಿಯನ್",
//           ml: "ലൈസൻസുള്ള ഇലക്ട്രീഷ്യൻ",
//           pa: "ਲਾਇਸੈਂਸਸ਼ੁਦਾ ਇਲੈਕਟ੍ਰੀਸ਼ਿਅਨ",
//         },
//         description: {
//           hi: "प्रमाणन और सुरक्षा प्रशिक्षण को उजागर करता है",
//           en: "Highlights certifications and safety training",
//           bn: "সার্টিফিকেশন এবং নিরাপত্তা প্রশিক্ষণ তুলে ধরে",
//           te: "సర్టిఫికేషన్లు మరియు భద్రతా శిక్షణను హైలైట్ చేస్తుంది",
//           mr: "प्रमाणपत्रे आणि सुरक्षा प्रशिक्षण हायलाइट करते",
//           ta: "சான்றிதழ்கள் மற்றும் பாதுகாப்பு பயிற்சியை முன்னிலைப்படுத்துகிறது",
//           gu: "પ્રમાણપત્રો અને સલામતી તાલીમને હાઇલાઇટ કરે છે",
//           kn: "ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ತರಬೇತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "സർട്ടിഫിക്കേഷനുകളും സുരക്ഷാ പരിശീലനവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਸਰਟੀਫਿਕੇਸ਼ਨ ਅਤੇ ਸੁਰੱਖਿਆ ਸਿਖਲਾਈ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//       {
//         id: "e2",
//         name: {
//           hi: "आवासीय विशेषज्ञ",
//           en: "Residential Specialist",
//           bn: "আবাসিক বিশেষজ্ঞ",
//           te: "రెసిడెన్షియల్ స్పెషలిస్ట్",
//           mr: "निवासी तज्ञ",
//           ta: "குடியிருப்பு நிபுணர்",
//           gu: "રેસિડેન્શિયલ સ્પેશિયાલિસ્ટ",
//           kn: "ವಸತಿ ವಿಶೇಷಜ್ಞ",
//           ml: "റെസിഡൻഷ്യൽ സ്പെഷ്യലിസ്റ്റ്",
//           pa: "ਰਿਹਾਇਸ਼ੀ ਸਪੈਸ਼ਲਿਸਟ",
//         },
//         description: {
//           hi: "घरेलू विद्युत कार्य और मरम्मत पर केंद्रित",
//           en: "Focuses on home electrical work and repairs",
//           bn: "বাড়ির বৈদ্যুতিক কাজ এবং মেরামতের উপর ফোকাস",
//           te: "గృహ విద్యుత్ పని మరియు మరమ్మతులపై దృష్టి",
//           mr: "घरगुती विद्युत कामे आणि दुरुस्तीवर लक্ṣ",
//           ta: "வீட்டு மின்சார வேலை மற்றும் பழுதுபார்ப்பில் கவனம் செலுத்துகிறது",
//           gu: "ઘરના વિદ્યુત કામ અને સમારકામ પર ધ્યાન",
//           kn: "ಮನೆಯ ವಿದ್ಯುತ್ ಕೆಲಸ ಮತ್ತು ದುರಸ್ತಿಯ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "വീട്ടിലെ വൈദ്യുത ജോലികളിലും അറ്റകുറ്റപ്പണികളിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਘਰੇਲੂ ਬਿਜਲੀ ਦੇ ਕੰਮ ਅਤੇ ਮੁਰੰਮਤ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "e3",
//         name: {
//           hi: "कमर्शियल इलेक्ट्रीशियन",
//           en: "Commercial Electrician",
//           bn: "বাণিজ্যিক ইলেকট্রিশিয়ান",
//           te: "కమర్షియల్ ఎలక్ట్రీషియన్",
//           mr: "व्यावसायिक इलेक्ट्रिशियन",
//           ta: "வணிக மின்சாரம்",
//           gu: "કોમર્શિયલ ઇલેક્ટ્રિશિયન",
//           kn: "ವಾಣಿಜ್ಯ ಎಲೆಕ್ಟ್રಿಷಿಯನ್",
//           ml: "കൊമേഴ്‌സ്യൽ ഇലക്ട്രീഷ്യൻ",
//           pa: "ਕਮਰਸ਼ੀਅਲ ਇਲੈਕਟ੍ਰੀਸ਼ਿਅਨ",
//         },
//         description: {
//           hi: "औद्योगिक और वाणिज्यिक परियोजनाओं पर जोर",
//           en: "Emphasizes industrial and commercial projects",
//           bn: "শিল্প এবং বাণিজ্যিক প্রকল্পের উপর জোর",
//           te: "పారిశ్రామిక మరియు వాణిజ్య ప్రాజెక్టులను నొక్కిచెప్పుతుంది",
//           mr: "औद्योगिक आणि व्यावसायिक प्रकल्पांवर भर",
//           ta: "தொழில்துறை மற்றும் வணிக திட்டங்களை வலியுறுத்துகிறது",
//           gu: "ઔદ્યોગિક અને વ્યાવસાયિક પ્રોજેક્ટ્સ પર ભાર",
//           kn: "ಕೈಗಾರಿಕಾ ಮತ್ತು ವಾಣಿಜ್ಯ ಯೋಜನೆಗಳನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
//           ml: "വ്യാവസായിക, വാണിജ്യ പദ്ധതികൾക്ക് ഊന്നൽ",
//           pa: "ਉਦਯੋਗਿਕ ਅਤੇ ਵਪਾਰਕ ਪ੍ਰੋਜੈਕਟਾਂ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//     ],
//     "4": [
//       {
//         id: "t1",
//         name: {
//           hi: "मास्टर टेलर",
//           en: "Master Tailor",
//           bn: "মাস্টার টেইলর",
//           te: "మాస్టర్ టైలర్",
//           mr: "मास्टर टेलर",
//           ta: "மாஸ்டர் டெய்லர்",
//           gu: "માસ્ટર ટેલર",
//           kn: "ಮಾಸ್ಟರ್ ಟೈಲರ್",
//           ml: "മാസ്റ്റർ ടെയിലർ",
//           pa: "ਮਾਸਟਰ ਟੇਲਰ",
//         },
//         description: {
//           hi: "शिल्प कौशल और विशेषज्ञताओं को प्रदर्शित करता है",
//           en: "Showcases craftsmanship and specializations",
//           bn: "কারুশিল্প এবং বিশেষত্ব প্রদর্শন করে",
//           te: "హస్తకళ మరియు ప్రత్యేకతలను ప్రదర్శిస్తుంది",
//           mr: "कारागिरी आणि विशेषज्ञता दाखवते",
//           ta: "கைவினை மற்றும் சிறப்புகளை காட்டுகிறது",
//           gu: "કારીગરી અને વિશેષતાઓ દર્શાવે છે",
//           kn: "ಕരಕುಶಲತೆ ಮತ್ತು ವಿಶೇಷತೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ",
//           ml: "കരകൗശലവും സ്പെഷ്യലൈസേഷനുകളും പ്രദർശിപ്പിക്കുന്നു",
//           pa: "ਕਾਰੀਗਰੀ ਅਤੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦਿਖਾਉਂਦਾ ਹੈ",
//         },
//       },
//       {
//         id: "t2",
//         name: {
//           hi: "अल्टरेशन एक्सपर्ट",
//           en: "Alterations Expert",
//           bn: "পরিবর্তন বিশেষজ্ঞ",
//           te: "మార్పుల నిపుణుడు",
//           mr: "बदल तज्ञ",
//           ta: "மாற்றங்கள் நிபுணர்",
//           gu: "ફેરફાર નિષ્ણાત",
//           kn: "ಬದಲಾವಣೆ ತಜ್ಞ",
//           ml: "മാറ്റങ്ങളുടെ വിദഗ്ധൻ",
//           pa: "ਤਬਦੀਲੀ ਮਾਹਿਰ",
//         },
//         description: {
//           hi: "परिवर्तन कौशल और त्वरित टर्नअराउंड पर केंद्रित",
//           en: "Focuses on alteration skills and quick turnaround",
//           bn: "পরিবর্তন দক্ষতা এবং দ্রুত টার্নঅ্যারাউন্ডের উপর ফোকাস",
//           te: "మార్పు నైపుణ్యాలు మరియు త్వరిత టర్న్‌అరౌండ్‌పై దృష్టి",
//           mr: "बदल कौशल्ये आणि जलद टर्नअરाउंडवर लक्ष",
//           ta: "மாற்றும் திறன்கள் மற்றும் விரைவான திருப்பத்தில் கவனம் செலுத்துகிறது",
//           gu: "ફેરફાર કુશળતા અને ઝડપી ટર્નઅરાઉન્ડ પર ધ્યાન",
//           kn: "ಬದಲಾವಣೆ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ತ್ವರಿತ ಟರ್ನ್‌ಅರೌಂಡ್‌ನ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "മാറ്റം വരുത്തുന്ന കഴിവുകളിലും വേഗത്തിലുള്ള ടേൺഅറൗണ്ടിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਤਬਦੀਲੀ ਦੇ ਹੁਨਰ ਅਤੇ ਤੇਜ਼ ਟਰਨਅਰਾਊਂਡ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "t3",
//         name: {
//           hi: "फैशन टेलर",
//           en: "Fashion Tailor",
//           bn: "ফ্যাশন টেইলর",
//           te: "ఫ్యాషన్ టైలర్",
//           mr: "फॅशन टेलर",
//           ta: "பேஷன் டெய்லர்",
//           gu: "ફેશન ટેલર",
//           kn: "ಫ್ಯಾಷನ್ ಟೈಲರ್",
//           ml: "ഫാഷൻ ടെയിലർ",
//           pa: "ਫੈਸ਼ਨ ਟੇਲਰ",
//         },
//         description: {
//           hi: "कस्टम डिज़ाइन और फैशन विशेषज्ञता को उजागर करता है",
//           en: "Highlights custom design and fashion expertise",
//           bn: "কাস্টম ডিজাইন এবং ফ্যাশন দক্ষতা তুলে ধরে",
//           te: "కస్టమ్ డిజైన్ మరియు ఫ్యాషన్ నైపుణ్యాన్ని హైలైట్ చేస్తుంది",
//           mr: "सानुकूल डिझाइन आणि फॅशन तज्ञता हायलाइट करते",
//           ta: "தனிப்பயன் வடிவமைப்பு மற்றும் பேஷன் நிபுணத்துவத்தை முன்னிலைப்படுத்துகிறது",
//           gu: "કસ્ટમ ડિઝાઇન અને ફેશન નિપુણતાને હાઇલાઇટ કરે છે",
//           kn: "ಕас್ಟમ್ ಡಿಸೈನ್ ಮತ್ತು ಫ್ಯಾಷನ್ ಪರಿಣತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "കസ്റ്റം ഡിസൈനും ഫാഷൻ വൈദഗ്ധ്യവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਕਸਟਮ ਡਿਜ਼ਾਈਨ ਅਤੇ ਫੈਸ਼ਨ ਮਾਹਰਤਾ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//     ],
//     "5": [
//       {
//         id: "c1",
//         name: {
//           hi: "प्रोफेशनल शेफ",
//           en: "Professional Chef",
//           bn: "পেশাদার শেফ",
//           te: "ప్రొఫెషనల్ చెఫ్",
//           mr: "व्यावसायिक शेफ",
//           ta: "தொழில்முறை சமையல்காரர்",
//           gu: "પ્રોફેશનલ શેફ",
//           kn: "ವೃತ್ತಿರ ಬಾಣಸಿಗ",
//           ml: "പ്രൊഫഷണൽ ഷെഫ്",
//           pa: "ਪੇਸ਼ੇਵਰ ਸ਼ੈੱਫ",
//         },
//         description: {
//           hi: "व्यंजन विशेषज्ञता और रसोई नेतृत्व पर जोर",
//           en: "Emphasizes cuisine expertise and kitchen leadership",
//           bn: "রান্নার দক্ষতা এবং রান্নাঘরের নেতৃত্বের উপর জোর",
//           te: "వంటకాల నైపుణ్యం మరియు వంటగది నాయకత్వాన్ని నొక్కిచెప్పుతుంది",
//           mr: "स्वयंपाक तज्ञता आणि स्वयंપाकघर नेतृत्वावर भर",
//           ta: "சமையல் நிபுணத்துவம் மற்றும் சமையலறை தலைமையை வலியுறுத்துகிறது",
//           gu: "રસોઈ નિપુણતા અને રસોડાના નેતૃત્વ પર ભાર",
//           kn: "ಪಾಕಶಾಸ್ತ್ರದ ಪരಿಣತಿ ಮತ್ತು ಅಡುಗೆಮನೆಯ ನಾಯಕತ್ವವನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
//           ml: "പാചക വൈദഗ്ധ്യവും അടുക്കള നേതൃത്വവും ഊന്നിപ്പറയുന്നു",
//           pa: "ਪਕਵਾਨ ਮਾਹਰਤਾ ਅਤੇ ਰਸੋਈ ਦੀ ਅਗਵਾਈ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//       {
//         id: "c2",
//         name: {
//           hi: "होम कुक",
//           en: "Home Cook",
//           bn: "হোম কুক",
//           te: "హోమ్ కుక్",
//           mr: "होम कुक",
//           ta: "வீட்டு சமையல்காரர்",
//           gu: "હોમ કુક",
//           kn: "ಮನೆ ಬಾಣಸಿಗ",
//           ml: "ഹോം കുക്ക്",
//           pa: "ਘਰੇਲੂ ਰਸੋਈਏ",
//         },
//         description: {
//           hi: "पारिवारिक खाना पकाने और भोजन तैयारी पर केंद्रित",
//           en: "Focuses on family cooking and meal preparation",
//           bn: "পারিবারিক রান্না এবং খাবার প্রস্তুতির উপর ফোকাস",
//           te: "కుటుంబ వంట మరియు భోజన తయారీపై దృష్టి",
//           mr: "कौुंबिक स्वयंपाक आणि जेवण तयारीवर लक्ष",
//           ta: "குடும்ப சமையல் மற்றும் உணவு தயாரிப்பில் கவனம் செலுத்துகிறது",
//           gu: "કુટુંબના રસોઈ અને ભોજન તૈયારી પર ધ્યાન",
//           kn: "ಕುಟುಂಬ ಅಡುಗೆ ಮತ್ತು ಊಟ ತಯಾರಿಕೆಯ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "കുടുംബ പാചകത്തിലും ഭക്ഷണ തയ്യാറാക്കലിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਪਰਿਵਾਰਕ ਖਾਣਾ ਪਕਾਉਣ ਅਤੇ ਭੋਜਨ ਤਿਆਰ ਕਰਨ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "c3",
//         name: {
//           hi: "रेस्टोरेंट कुक",
//           en: "Restaurant Cook",
//           bn: "রেস্তোরাঁ কুক",
//           te: "రెస్టారెంట్ కుక్",
//           mr: "रेस्टॉरंट कुक",
//           ta: "உணவகம் சமையல்காரர்",
//           gu: "રેસ્ટોરન્ટ કુક",
//           kn: "ರೆಸ್ಟೋರೆಂಟ್ ಕುಕ್",
//           ml: "റെസ്റ്റോറന്റ് കുക്ക്",
//           pa: "ਰੈਸਟੋਰੈਂਟ ਕੁੱਕ",
//         },
//         description: {
//           hi: "तेज़-तर्रार रसोई के अनुभव को उजागर करता है",
//           en: "Highlights fast-paced kitchen experience",
//           bn: "দ্রুত গতির রান্নাঘরের অভিজ্ঞতা তুলে ধরে",
//           te: "వేగవంతమైన వంటగది అనుభవాన్ని హైలైట్ చేస్తుంది",
//           mr: "जलद गतीच्या स्वयंपाकघरातील अनुभव हायलाइट करते",
//           ta: "வேகமான சமையலறை அனுபவத்தை முன்னிலைப்படுத்துகிறது",
//           gu: "ઝડપી ગતિના રસોડાના અનુભવને હાઇલાઇટ કરે છે",
//           kn: "ವೇಗದ ಅಡುಗೆಮನೆಯ ಅನುಭವವನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "വേഗതയേറിയ അടുക്കള അനുഭവം ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਤੇਜ਼-ਰਫ਼ਤਾਰ ਰਸੋਈ ਦੇ ਤਜਰਬੇ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//     ],
//     "6": [
//       {
//         id: "s1",
//         name: {
//           hi: "लाइसेंसशुदा सिक्योरिटी",
//           en: "Licensed Security",
//           bn: "লাইসেন্সপ্রাপ্ত নিরাপত্তা",
//           te: "లైసెన్స్ పొందిన భద్రత",
//           mr: "परवानाधारक सुरक्षा",
//           ta: "உரிமம் பெற்ற பாதுகாப்பு",
//           gu: "લાઇસન્સ પ્રાપ્ત સિક્યુરિટી",
//           kn: "ಪರವಾನಗಿ ಪಡೆದ ಭದ್ರತೆ",
//           ml: "ലൈസൻസുള്ള സെക്യൂരിറ്റി",
//           pa: "ਲਾਇਸੈਂਸਸ਼ੁਦਾ ਸਿਕਿਓਰਿਟੀ",
//         },
//         description: {
//           hi: "लाइसेंस और सुरक्षा प्रशिक्षण पर जोर",
//           en: "Emphasizes licenses and security training",
//           bn: "লাইসেন্স এবং নিরাপত্তা প্রশিক্ষণের উপর জোর",
//           te: "లైసెన్స్‌లు మరియు భద్రతా శిక్షణను నొక్కిచెప్పుతుంది",
//           mr: "परवाने आणि सुरक्षा प्रशिक्षणावर भर",
//           ta: "உரிமங்கள் மற்றும் பாதுகாப்பு பயிற்சியை வலியுறுத்துகிறது",
//           gu: "લાઇસન્સ અને સિક્યુરિટી ટ્રેનિંગ પર ભાર",
//           kn: "ಪರವಾನಗಿಗಳು ಮತ್ತು ಭದ್ರತಾ ತರಬೇತಿಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
//           ml: "ലൈസൻസുകളും സുരക്ഷാ പരിശീലനവും ഊന്നിപ്പറയുന്നു",
//           pa: "ਲਾਇਸੈਂਸ ਅਤੇ ਸਿਕਿਓਰਿਟੀ ਸਿਖਲਾਈ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//       {
//         id: "s2",
//         name: {
//           hi: "कॉर्पोरेट सिक्योरिटी",
//           en: "Corporate Security",
//           bn: "কর্পোরেট নিরাপত্তা",
//           te: "కార్పొరేట్ భద్రత",
//           mr: "कॉર्पोरेट सुरक्षा",
//           ta: "கார்ப்பரேட் பாதுகாப்பு",
//           gu: "કોર્પોરેટ સિક્યુરિટી",
//           kn: "ಕಾರ್ಪೊರೇಟ್ ಭದ್ರತೆ",
//           ml: "കോർപ്പറേറ്റ് സെക്യൂരിറ്റി",
//           pa: "ਕਾਰਪੋਰੇਟ ਸਿਕਿਓਰਿਟੀ",
//         },
//         description: {
//           hi: "कार्यালय और कॉর्पोरेट सुरक्षा पर केंद्रित",
//           en: "Focuses on office and corporate security",
//           bn: "অফিস এবং কর্পোরেট নিরাপত্তার উপর ফোকাস",
//           te: "కార్యాలయం మరియు కార్పొరేట్ భద్రతపై దృష్టి",
//           mr: "कार्यालय आणि कॉર्पोરेट सुরक्षेवર लक्ष",
//           ta: "அலுவலகம் மற்றும் கார்ப்பரேட் பாதுகாப்பில் கவனம் செலுத்துகிறது",
//           gu: "ઓફિસ અને કોર્પોરેટ સિક્યુરિટી પર ધ્યાન",
//           kn: "ಕಚೇರಿ ಮತ್ತು ಕಾರ್ಪೊરೇಟ್ ಭದ್ರತೆಯ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "ഓഫീസ്, കോർപ്പറേറ്റ് സെക്യൂരിറ്റിയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਦਫ਼ਤਰ ਅਤੇ ਕਾਰਪੋਰੇਟ ਸਿਕਿਓਰਿਟੀ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "s3",
//         name: {
//           hi: "इवेंट सिक्योरिटी",
//           en: "Event Security",
//           bn: "ইভেন্ট নিরাপত্তা",
//           te: "ఈవెంట్ భద్రత",
//           mr: "इव्हेंट सुरक्षा",
//           ta: "நிகழ்வு பாதுகாப்பு",
//           gu: "ઇવેન્ટ સિક્યુરિટી",
//           kn: "ಈವೆಂಟ್ ಭದ್ರತೆ",
//           ml: "ഇവന്റ് സെക്യൂരിറ്റി",
//           pa: "ਇਵੈਂਟ ਸਿਕਿਓਰਿਟੀ",
//         },
//         description: {
//           hi: "भीड़ नियंत्रण और कार्यक्रम प्रबंधन को उजागर करता है",
//           en: "Highlights crowd control and event management",
//           bn: "ভিড় নিয়ন্ত্রণ এবং ইভেন্ট ব্যবস্থাপনা তুলে ধরে",
//           te: "గుంపు నియంత్రణ మరియు ఈవెంట్ నిర్వహణను హైలైట్ చేస్తుంది",
//           mr: "गर्दी नियंत्रण आणि कार्यक्रम व्यवस्थापन हायलाइट करते",
//           ta: "கூட்டம் கட்டுப்பாடு மற்றும் நிகழ்வு மேலாண்மையை முன்னிலைப்படுத்துகிறது",
//           gu: "ભીડ નિયંત્રણ અને ઇવેન્ટ મેનેજમેન્ટને હાઇલાઇટ કરે છે",
//           kn: "ಜನಸಮೂಹ ನಿಯಂತ್રಣ ಮತ್ತು ಈವೆಂಟ್ ನಿರ್ವಹಣೆಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "ജനക്കൂട്ടത്തെ നിയന്ത്രിക്കലും ഇവന്റ് മാനേജ്‌മെന്റും ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਭੀੜ ਕੰਟਰੋਲ ਅਤੇ ਇਵੈਂਟ ਮੈਨੇਜਮੈਂਟ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//     ],
//     "7": [
//       {
//         id: "sa1",
//         name: {
//           hi: "रिटेल एसोसिएट",
//           en: "Retail Associate",
//           bn: "খুচরা সহযোগী",
//           te: "రిటైల్ అసోసియేట్",
//           mr: "किरकोळ सहयोगी",
//           ta: "சில்லறை கூட்டாளர்",
//           gu: "રિટેલ એસોસિએટ",
//           kn: "ಚಿಲ್ಲರೆ ಸಹಯೋಗಿ",
//           ml: "റീട്ടെയിൽ അസോസിയേറ്റ്",
//           pa: "ਰਿਟੇਲ ਐਸੋਸੀਏਟ",
//         },
//         description: {
//           hi: "ग्राहक सेवा और उत्पाद ज्ञान पर केंद्रित",
//           en: "Focuses on customer service and product knowledge",
//           bn: "গ্রাহক সেবা এবং পণ্য জ্ঞানের উপর ফোকাস",
//           te: "కస్టమర్ సేవ మరియు ఉత్పత్తి జ్ఞానంపై దృష్టి",
//           mr: "ग्रাহक सेवा आणि उत्पादन ज्ञानावर लक्ष",
//           ta: "வாடிக்கையாளர் சேவை மற்றும் தயாரிப்பு அறிவில் கவனம் செலுத்துகிறது",
//           gu: "ગ્રાહક સેવા અને ઉત્પાદન જ્ઞાન પર ધ્યાન",
//           kn: "ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ಉత್ಪನ್ನ ಜ್ಞಾನದ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "ഉപഭോക്തൃ സേവനത്തിലും ഉൽപ്പന്ന അറിവിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਗਾਹਕ ਸੇਵਾ ਅਤੇ ਉਤਪਾਦ ਗਿਆਨ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "sa2",
//         name: {
//           hi: "शॉप असिस्टेंट",
//           en: "Shop Assistant",
//           bn: "দোকান সহায়ক",
//           te: "షాప్ అసిస్టెంట్",
//           mr: "दुकान सहाय्यक",
//           ta: "கடை உதவியாளர்",
//           gu: "શોપ આસિસ્ટન્ટ",
//           kn: "ಅಂಗಡಿ ಸಹಾಯಕ",
//           ml: "ഷോപ്പ് അസിസ്റ്ടന്റ്",
//           pa: "ਸ਼ਾਪ ਅਸਿਸਟੈਂਟ",
//         },
//         description: {
//           hi: "POS सिस्टम और इन्वेंटरी प्रबंधन पर जोर",
//           en: "Emphasizes POS systems and inventory management",
//           bn: "POS সিস্টেম এবং ইনভেন্টরি ব্যবস্থাপনার উপর জোর",
//           te: "POS సిస్టమ్‌లు మరియు ఇన్వెంటరీ నిర్వహణను నొక్కిచెప్పుతుంది",
//           mr: "POS सिस्टम आणि इन्व्हेंटरी व्यवস्थापनावर भर",
//           ta: "POS அமைப்புகள் மற்றும் சரக்கு மேலாண்மையை வலியுறுத்துகிறது",
//           gu: "POS સિસ્ટમ અને ઇન્વેન્ટરી મેનેજમેન્ટ પર ભાર",
//           kn: "POS ಸಿಸ್ಟಮ್‌ಗಳು ಮತ್ತು ದಾಸ್ತಾನು ನಿರ್ವಹಣೆಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
//           ml: "POS സിസ്റ്റങ്ങളും ഇൻവെന്ററി മാനേജ്‌മെന്റും ഊന്നിപ്പറയുന്നു",
//           pa: "POS ਸਿਸਟਮ ਅਤੇ ਇਨਵੈਂਟਰੀ ਮੈਨੇਜਮੈਂਟ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//       {
//         id: "sa3",
//         name: {
//           hi: "सेल्स स्पेशलिस्ट",
//           en: "Sales Specialist",
//           bn: "বিক্রয় বিশেষজ্ঞ",
//           te: "సేల్స్ స్పెషలిస్ట్",
//           mr: "विक्री तज्ञ",
//           ta: "விற்பனை நிபுணர்",
//           gu: "સેલ્સ સ્પેશિયાલિસ્ટ",
//           kn: "ಮಾರಾಟ ವಿಶೇಷಜ್ಞ",
//           ml: "സെയിൽസ് സ്പെഷ്യലിസ്റ്റ്",
//           pa: "ਸੇਲਜ਼ ਸਪੈਸ਼ਲਿਸਟ",
//         },
//         description: {
//           hi: "बिक्री मेट्रिक्स और ग्राहक संबंधों को उजागर करता है",
//           en: "Highlights sales metrics and customer relationships",
//           bn: "বিক্রয় মেট্রিক্স এবং গ্রাহক সম্পর্ক তুলে ধরে",
//           te: "సేల్స్ మెట్రిక్స్ మరియు కస్టమర్ రిలేషన్‌షిప్‌లను హైలైట్ చేస్తుంది",
//           mr: "विक्री मेट्रिक्स आणि ग्राहक संबंध हायलाइट करते",
//           ta: "விற்பனை அளவீடுகள் மற்றும் வாடிக்கையாளர் உறவுகளை முன்னிலைப்படுத்துகிறது",
//           gu: "સેલ્સ મેટ્રિક્સ અને કસ્ટમર રિલેશનશિપને હાઇલાઇટ કરે છે",
//           kn: "ಮಾರಾಟ ಮೆಟ್રಿಕ್ಸ್ ಮತ್ತು ಗ್ರಾಹಕ ಸಂಬಂಧಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
//           ml: "സെയിൽസ് മെട്രിക്സും ഉപഭോക്തൃ ബന്ധങ്ങളും ഹൈലൈറ്റ് ചെയ്യുന്നു",
//           pa: "ਸੇਲਜ਼ ਮੈਟ੍ਰਿਕਸ ਅਤੇ ਗਾਹਕ ਰਿਸ਼ਤਿਆਂ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
//         },
//       },
//     ],
//     "8": [
//       {
//         id: "m1",
//         name: {
//           hi: "ऑटो मैकेनिक",
//           en: "Auto Mechanic",
//           bn: "অটো মেকানিক",
//           te: "ఆటో మెకానిక్",
//           mr: "ऑटो मेकॅनिक",
//           ta: "ஆட்டோ மெக்கானிக்",
//           gu: "ઓટો મિકેનિક",
//           kn: "ಆಟೋ ಮೆಕ್ಯಾನಿಕ್",
//           ml: "ഓട്ടോ മെക്കാനിക്",
//           pa: "ਆਟੋ ਮਕੈਨਿਕ",
//         },
//         description: {
//           hi: "कार की मरम्मत और डायग्नोस्टिक कौशल पर केंद्रित",
//           en: "Focuses on car repair and diagnostic skills",
//           bn: "গাড়ি মেরামত এবং ডায়াগনস্টিক দক্ষতার উপর ফোকাস",
//           te: "కార్ రిపేర్ మరియు డయాగ్నోస్టిక్ స్కిల్స్‌పై దృష్టి",
//           mr: "कार दुरुस्ती आणि निदान कौशल्यांवर लक्ष",
//           ta: "கார் பழுதுபார்ப்பு மற்றும் கண்டறியும் திறன்களில் கவனம் செலுத்துகிறது",
//           gu: "કાર રિપેર અને ડાયગ્નોસ્ટિક સ્કિલ્સ પર ધ્યાન",
//           kn: "ಕಾರ್ ರಿಪೇર್ ಮತ್ತು ಡಯಾગ್ನೋಸ್ಟಿಕ್ ಕೌಶಲ್ಯಗಳ ಮೇಲೆ ಕೇಂದ್રೀಕರಿಸುತ್ತದೆ",
//           ml: "കാർ റിപ്പയറിലും ഡയഗ്നോസ്റ്റിക് കഴിവുകളിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
//           pa: "ਕਾਰ ਦੀ ਮੁਰੰਮਤ ਅਤੇ ਡਾਇਗਨੌਸਟਿਕ ਹੁਨਰ 'ਤੇ ਧਿਆਨ",
//         },
//       },
//       {
//         id: "m2",
//         name: {
//           hi: "टू-व्हीलर स्पेशलिस्ट",
//           en: "Two-Wheeler Specialist",
//           bn: "দুই চাকার বিশেষজ্ঞ",
//           te: "టూ-వీలర్ స్పెషలిస్ట్",
//           mr: "द्विचाकी तज्ञ",
//           ta: "இரு சக்கர வாகன நிபுணர்",
//           gu: "ટુ-વ્હીલર સ્પેશિયાલિસ્ટ",
//           kn: "ಎರಡು ಚಕ್ರ ವಿಶೇಷಜ್ಞ",
//           ml: "ടു-വീലർ സ്പെഷ്യലിസ്റ്റ്",
//           pa: "ਟੂ-ਵ੍ਹੀਲਰ ਸਪੈਸ਼ਲਿਸਟ",
//         },
//         description: {
//           hi: "मोटरसाइकिल और स्कूटर विशेषज्ञता पर जोर",
//           en: "Emphasizes motorcycle and scooter expertise",
//           bn: "মোটরসাইকেল এবং স্কুটার দক্ষতার উপর জোর",
//           te: "మోటార్‌సైకిల్ మరియు స్కూటర్ నైపుణ్యాన్ని నొక్కిచెప్పుతుంది",
//           mr: "मोटरसायकल आणि स्कूटर तज्ञतेवर भर",
//           ta: "மோட்டார் சைக்கிள் மற்றும் ஸ்கூட்டர் நிபுணத்துவத்தை வலியுறுத்துகிறது",
//           gu: "મોટરસાઇકલ અને સ્કૂટર નિપુણતા પર ભાર",
//           kn: "ಮೋಟಾರ್‌ಸೈಕಲ್ ಮತ್ತು ಸ್ಕೂಟರ್ ಪரಿಣತಿಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
//           ml: "മോട്ടോർസൈക്കിൾ, സ്കൂട്ടർ വൈദഗ്ധ്യം ഊന്നിപ്പറയുന്നു",
//           pa: "ਮੋਟਰਸਾਈਕਲ ਅਤੇ ਸਕੂਟਰ ਮਾਹਰਤਾ 'ਤੇ ਜ਼ੋਰ",
//         },
//       },
//       {
//         id: "m3",
//         name: {
//           hi: "मल्टी-व्हीकल मैकेनिक",
//           en: "Multi-Vehicle Mechanic",
//           bn: "মাল্টি-ভেহিকেল মেকানিক",
//           te: "మల్టీ-వెహికల్ మెకానిక్",
//           mr: "मल्टी-व्हेहिकल मेकॅनिक",
//           ta: "பல வாகன மெக்கானிக்",
//           gu: "મલ્ટી-વ્હીકલ મિકેનિક",
//           kn: "ಮಲ್ಟಿ-ವೆಹಿಕಲ್ ಮೆಕ್ಯಾನಿಕ್",
//           ml: "മൾട്ടി-വെഹിക്കിൾ മെക്കാനിക്",
//           pa: "ਮਲਟੀ-ਵਹੀਕਲ ਮਕੈਨਿਕ",
//         },
//         description: {
//           hi: "विभिन्न वाहन प्रकारों के साथ अनुभव दिखाता है",
//           en: "Shows experience with various vehicle types",
//           bn: "বিভিন্ন যানবাহনের ধরনের সাথে অভিজ্ঞতা দেখায়",
//           te: "వివిధ వాహన రకాలతో అనుభవాన్ని చూపిస్తుంది",
//           mr: "विविध वाहन प्रकारांसह अनुभव दाखवते",
//           ta: "பல்வேறு வாகன வகைகளுடன் அனுபவத்தைக் காட்டுகிறது",
//           gu: "વિવિધ વાહન પ્રકારો સાથે અનુભવ બતાવે છે",
//           kn: "ವಿವಿಧ ವಾಹನ ಪ್ರಕಾರಗಳೊಂದಿಗೆ ಅನುಭವವನ್ನು ತೋರಿಸುತ್ತದೆ",
//           ml: "വിവിധ വാഹന തരങ്ങളുമായുള്ള അനുഭവം കാണിക്കുന്നു",
//           pa: "ਵੱਖ-ਵੱਖ ਵਾਹਨ ਕਿਸਮਾਂ ਨਾਲ ਤਜਰਬਾ ਦਿਖਾਉਂਦਾ ਹੈ",
//         },
//       },
//     ],
//   }

//   const handlePreview = (categoryId: string, templateId: string) => {
//     router.push(`/preview-template/${categoryId}/${templateId}?lang=${currentLanguage}`)
//   }

//   const handleBackToDashboard = () => {
//     router.push("/dashboard")
//   }

//   const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
//     const templateType = templateId.substring(0, templateId.length - 1) // Remove number
//     switch (templateType) {
//       case "d":
//         return <DriverThumbnail variant={templateId.slice(-1)} />
//       case "dp":
//         return <DeliveryPartnerThumbnail variant={templateId.slice(-1)} />
//       case "e":
//         return <ElectricianThumbnail variant={templateId.slice(-1)} />
//       case "t":
//         return <TailorThumbnail variant={templateId.slice(-1)} />
//       case "c":
//         return <CookChefThumbnail variant={templateId.slice(-1)} />
//       case "s":
//         return <SecurityGuardThumbnail variant={templateId.slice(-1)} />
//       case "sa":
//         return <SalesAssistantThumbnail variant={templateId.slice(-1)} />
//       case "m":
//         return <MechanicThumbnail variant={templateId.slice(-1)} />
//       default:
//         return <DriverThumbnail variant="1" />
//     }
//   }

//   useEffect(() => {
//     const categoryFromUrl = searchParams.get("category") || "1"
//     const langFromUrl = (searchParams.get("lang") as Language) || "en"
//     setSelectedCategory(categoryFromUrl)
//     setCurrentLanguage(langFromUrl)
//   }, [searchParams])

//   return (
//     <div className="container mx-auto py-8 px-6">
//       <div className="flex justify-between items-center mb-6">
//         <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
//           <ArrowLeft className="h-4 w-4" />
//           {getTranslation("ui.backToDashboard", currentLanguage)}
//         </Button>
//         <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
//       </div>

//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold mb-4">{getTranslation("ui.chooseTemplate", currentLanguage)}</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">{getTranslation("ui.templateDescription", currentLanguage)}</p>
//       </div>

//       <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
//         <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 h-auto">
//           {categories.map((category) => {
//             const IconComponent = category.icon
//             return (
//               <TabsTrigger
//                 key={category.id}
//                 value={category.id}
//                 className="w-full flex flex-col items-center gap-1 p-3"
//               >
//                 <IconComponent className="h-4 w-4" />
//                 <span className="text-xs">{getTranslation(`categories.${category.name}`, currentLanguage)}</span>
//               </TabsTrigger>
//             )
//           })}
//         </TabsList>

//         {categories.map((category) => (
//           <TabsContent key={category.id} value={category.id}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {templates[category.id as keyof typeof templates].map((template) => (
//                 <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                   <CardContent className="p-0">
//                     <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(category.id, template.id)}</div>
//                     <div className="p-4">
//                       <div className="mb-2">
//                         <h3 className="font-semibold text-lg">{template.name[currentLanguage]}</h3>
//                         <p className="text-sm text-gray-600">{template.description[currentLanguage]}</p>
//                       </div>
//                       <Button size="sm" className="w-full" onClick={() => handlePreview(category.id, template.id)}>
//                         {getTranslation("ui.previewAndSelect", currentLanguage)}
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }

// function DriverThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Car className="h-4 w-4 text-blue-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-blue-600 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="w-3/4 h-1 bg-gray-300"></div>
//         <div className="flex gap-2 mt-2">
//           <div className="w-1/4 h-1 bg-green-500"></div>
//           <div className="w-1/4 h-1 bg-green-500"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function DeliveryPartnerThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Package className="h-4 w-4 text-orange-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-orange-600 mb-1"></div>
//         <div className="flex justify-between">
//           <div className="w-1/3 h-1 bg-gray-300"></div>
//           <div className="w-1/4 h-1 bg-yellow-500"></div>
//         </div>
//         <div className="w-full h-1 bg-gray-300"></div>
//       </div>
//     </div>
//   )
// }

// function ElectricianThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Zap className="h-4 w-4 text-yellow-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-yellow-600 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="grid grid-cols-3 gap-1">
//           <div className="h-2 bg-yellow-200"></div>
//           <div className="h-2 bg-yellow-200"></div>
//           <div className="h-2 bg-yellow-200"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function TailorThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Scissors className="h-4 w-4 text-purple-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-purple-600 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="flex gap-1">
//           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
//           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
//           <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function CookChefThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <ChefHat className="h-4 w-4 text-red-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-red-600 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="w-3/4 h-1 bg-gray-300"></div>
//         <div className="flex gap-2">
//           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
//           <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function SecurityGuardThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Shield className="h-4 w-4 text-blue-800" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-blue-800 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="border border-blue-300 p-1">
//           <div className="w-3/4 h-1 bg-gray-300"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function SalesAssistantThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <ShoppingCart className="h-4 w-4 text-green-600" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-green-600 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="flex justify-between">
//           <div className="w-1/3 h-1 bg-gray-300"></div>
//           <div className="w-1/4 h-1 bg-green-400"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function MechanicThumbnail({ variant }: { variant: string }) {
//   return (
//     <div className="w-full h-full p-3 bg-white">
//       <div className="flex items-center gap-2 mb-3">
//         <Wrench className="h-4 w-4 text-gray-700" />
//         <div className="w-2/3 h-3 bg-gray-800"></div>
//       </div>
//       <div className="space-y-2">
//         <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
//         <div className="w-full h-1 bg-gray-300"></div>
//         <div className="grid grid-cols-2 gap-1">
//           <div className="h-2 bg-gray-200"></div>
//           <div className="h-2 bg-gray-200"></div>
//         </div>
//       </div>
//     </div>
//   )
// }











"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Car, Package, Zap, Scissors, ChefHat, Shield, ShoppingCart, Wrench, Volume2 } from "lucide-react"
import { getTranslation, type Language } from "@/lib/translations"

export default function TemplatesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [selectedProfession, setSelectedProfession] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const playAudioGuide = () => {
    if ("speechSynthesis" in window) {
      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(getTranslation("ui.templateDescription", currentLanguage))

        // Set language for speech synthesis
        const langMap: Record<Language, string> = {
          hi: "hi-IN",
          en: "en-US",
          bn: "bn-IN",
          te: "te-IN",
          mr: "mr-IN",
          ta: "ta-IN",
          gu: "gu-IN",
          kn: "kn-IN",
          ml: "ml-IN",
          pa: "pa-IN",
        }

        utterance.lang = langMap[currentLanguage] || "en-US"
        utterance.rate = 0.8
        utterance.pitch = 1

        const voices = speechSynthesis.getVoices()
        const targetLang = langMap[currentLanguage] || "en-US"
        const voice =
          voices.find((v) => v.lang.startsWith(targetLang.split("-")[0])) || voices.find((v) => v.lang === targetLang)

        if (voice) {
          utterance.voice = voice
        }

        speechSynthesis.speak(utterance)
      }

      if (speechSynthesis.getVoices().length > 0) {
        speak()
      } else {
        speechSynthesis.onvoiceschanged = () => {
          speak()
          speechSynthesis.onvoiceschanged = null
        }
      }
    }
  }

  const categories = [
    { id: "1", name: "driver", icon: Car },
    { id: "2", name: "deliveryPartner", icon: Package },
    { id: "3", name: "electrician", icon: Zap },
    { id: "4", name: "tailor", icon: Scissors },
    { id: "5", name: "cookChef", icon: ChefHat },
    { id: "6", name: "securityGuard", icon: Shield },
    { id: "7", name: "salesAssistant", icon: ShoppingCart },
    { id: "8", name: "mechanic", icon: Wrench },
  ]

  const professionToCategoryMap: { [key: string]: string } = {
    driver: "1",
    delivery: "2",
    electrician: "3",
    tailor: "4",
    cook: "5",
    security: "6",
    sales: "7",
    mechanic: "8",
  }

  const selectedCategoryId = professionToCategoryMap[selectedProfession] || "1"

  interface TemplateItem {
    id: string
    name: Record<Language, string>
    description: Record<Language, string>
  }

  const templates: Record<string, TemplateItem[]> = {
    "1": [
      // Driver templates
      {
        id: "d1",
        name: {
          hi: "पेशेवर ड्राइवर",
          en: "Professional Driver",
          bn: "পেশাদার চালক",
          te: "వృత్తిపరమైన డ్రైవర్",
          mr: "व्यावसायिक चालक",
          ta: "தொழில்முறை ஓட்டுநர்",
          gu: "વ્યાવસાયિક ડ્રાઇવર",
          kn: "ವೃತ್ತಿಪರ ಚಾಲಕ",
          ml: "പ്രൊഫഷണൽ ഡ്രൈവർ",
          pa: "ਪੇਸ਼ੇਵਰ ਡਰਾਈਵਰ",
        },
        description: {
          hi: "लाइसेंस और सुरक्षा रिकॉर्ड पर जोर देने वाला साफ लेआउट",
          en: "Clean layout emphasizing licenses and safety record",
          bn: "লাইসেন্স এবং নিরাপত্তা রেকর্ডের উপর জোর দিয়ে পরিষ্কার লেআউট",
          te: "లైసెన్స్‌లు మరియు భద్రతా రికార్డ్‌ను నొక్కిచెప్పే క్లీన్ లేఅవుట్",
          mr: "परवाने आणि सुरक्षा रेकॉर्डवर भर देणारा स्वच्छ लेआउट",
          ta: "உரிமங்கள் மற்றும் பாதுகாப்பு பதிவை வலியுறுத்தும் தூய்மையான அமைப்பு",
          gu: "લાઇસન્સ અને સલામતી રેકોર્ડ પર ભાર મૂકતું સ્વચ્છ લેઆઉટ",
          kn: "ಪರವಾನಗಿಗಳು ಮತ್ತು ಭದ್ರತಾ ದಾಖಲೆಯನ್ನು ಒತ್ತಿಹೇಳುವ ಸ್ವಚ್ಛ ವಿನ್ಯಾಸ",
          ml: "ലൈസൻസുകളും സുരക്ഷാ റെക്കോർഡും ഊന്നിപ്പറയുന്ന വൃത്തിയുള്ള ലേഔട്ട്",
          pa: "ਲਾਇਸੈਂਸ ਅਤੇ ਸੁਰੱਖਿਆ ਰਿਕਾਰਡ ਤੇ ਜ਼ੋਰ ਦੇਣ ਵਾਲਾ ਸਾਫ਼ ਲੇਆਉਟ",
        },
      },
      {
        id: "d2",
        name: {
          hi: "कमर्शियल ड्राइवर",
          en: "Commercial Driver",
          bn: "বাণিজ্যিক চালক",
          te: "వాణిజ్య డ్రైవర్",
          mr: "व्यা঵সायिक चालक",
          ta: "வணிக ஓட்டுநர்",
          gu: "કોમર્શિયલ ડ્રાઇવર",
          kn: "ವಾಣಿಜ್ಯ ಚಾಲಕ",
          ml: "കൊമേഴ്‌സ്യൽ ഡ്രൈവർ",
          pa: "ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰ",
        },
        description: {
          hi: "वाहन के प्रकार और मार्ग के अनुभव पर केंद्रित",
          en: "Focused on vehicle types and route experience",
          bn: "যানবাহনের ধরন এবং রুট অভিজ্ঞতার উপর ফোকাস",
          te: "వాహన రకాలు మరియు మార్గ అనుభవంపై దృష్టి సారించింది",
          mr: "वाहनाचे प्रकार आणि मार्ग अनुभवावर केंद्रित",
          ta: "வாகன வகைகள் மற்றும் பாதை அனுபவத்தில் கவனம் செலுத்துகிறது",
          gu: "વાહનના પ્રકારો અને રૂટ અનુભવ પર ધ્યાન",
          kn: "ವಾಹನ ಪ್ರಕಾರಗಳು ಮತ್ತು ಮಾರ್ಗ ಅನುಭವದ ಮೇಲೆ ಕೇಂದ್ರೀകരಿಸುತ್ತದೆ",
          ml: "വാഹന തരങ്ങളിലും റൂട്ട് അനുഭവത്തിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਵਾਹਨ ਦੀਆਂ ਕਿਸਮਾਂ ਅਤੇ ਰੂਟ ਦੇ ਤਜਰਬੇ ਤੇ ਕੇਂਦ੍ਰਿਤ",
        },
      },
      {
        id: "d3",
        name: {
          hi: "डिलीवरी ड्राइवर",
          en: "Delivery Driver",
          bn: "ডেলিভারি চালক",
          te: "డెలివరీ డ్రైవర్",
          mr: "डिलिव्हरी चालक",
          ta: "டெலிவரி ஓட்டுநர்",
          gu: "ડિલિવરી ડ્રાઇવર",
          kn: "ಡೆಲಿವರಿ ಚಾಲಕ",
          ml: "ഡെലിവറി ഡ്രൈവർ",
          pa: "ਡਿਲੀਵਰੀ ਡਰਾਈਵਰ",
        },
        description: {
          hi: "डिलीवरी आंकड़े और ग्राहक सेवा को उजागर करता है",
          en: "Highlights delivery stats and customer service",
          bn: "ডেলিভারি পরিসংখ্যান এবং গ্রাহক সেবা তুলে ধরে",
          te: "డెలివరీ గణాంకాలు మరియు కస్టమర్ సేవను హైలైట్ చేస్తుంది",
          mr: "डिलिव्हरी आकडेवारी आणि ग्राहक सेवा हायलाइट करते",
          ta: "டெலிவரி புள்ளிவிவரங்கள் மற்றும் வாடிக்கையாளர் சேவையை முன்னிலைப்படுத்துகிறது",
          gu: "ડિલિવરી આંકડા અને ગ્રાહક સેવાને હાઇલાઇટ કરે છે",
          kn: "ಡೆಲಿವರಿ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "ഡെലിവറി സ്ഥിതിവിവരക്കണക്കളും ഉപഭോക്തൃ സേവനവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਡਿਲੀਵਰੀ ਅੰਕੜੇ ਅਤੇ ਗਾਹਕ ਸੇਵਾ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
    ],
    "2": [
      // Delivery Partner templates - using fallback for now
      {
        id: "dp1",
        name: {
          hi: "फूड डिलीवरी प्रो",
          en: "Food Delivery Pro",
          bn: "ফুড ডেলিভারি প্রো",
          te: "ఫుడ్ డెలివరీ ప్రో",
          mr: "फूड डिलिव्हरी प्रो",
          ta: "உணவு டெலிவரி ப்ரோ",
          gu: "ફૂડ ડિલિવરી પ્રો",
          kn: "ಫುಡ್ ಡೆಲಿವರಿ ಪ್ರೊ",
          ml: "ഫുഡ് ഡെലിവറി പ്രോ",
          pa: "ਫੂਡ ਡਿਲੀਵਰੀ ਪ੍ਰੋ",
        },
        description: {
          hi: "गति, रेटिंग और खाद्य हैंडलिंग पर जोर",
          en: "Emphasizes speed, ratings, and food handling",
          bn: "গতি, রেটিং এবং খাদ্য হ্যান্ডলিং এর উপর জোর",
          te: "వేగం, రేటింగ్‌లు మరియు ఆహార నిర్వహణపై దృష్టి",
          mr: "वेग, रेटिंग आणि अन्न हाताळणीवर भर",
          ta: "வேகம், மதிப்பீடுகள் மற்றும் உணவு கையாளுதலை வலியுறுத்துகிறது",
          gu: "ઝડપ, રેટિંગ અને ખોરાક હેન્ડલિંગ પર ભાર",
          kn: "ವೇಗ, ರೇಟಿಂಗ್‌ಗಳು ಮತ್ತು ಆಹಾರ ನಿರ್ವಹಣೆಯ ಮೇಲೆ ಒತ್ತು",
          ml: "വേഗത, റേറ്റിംഗുകൾ, ഭക്ഷണ കൈകാര്യം ചെയ്യൽ എന്നിവയ്ക്ക് ഊന്നൽ",
          pa: "ਗਤੀ, ਰੇਟਿੰਗ ਅਤੇ ਭੋਜਨ ਹੈਂਡਲਿੰਗ 'ਤੇ ਜ਼ੋਰ",
        },
      },
      {
        id: "dp2",
        name: {
          hi: "कूरियर विशेषज्ञ",
          en: "Courier Specialist",
          bn: "কুরিয়ার বিশেষজ্ঞ",
          te: "కొరియర్ స్పెషలిస్ట్",
          mr: "कुरिअर तज्ञ",
          ta: "கூரியர் நிபுணர்",
          gu: "કુરિયર નિષ્ણાત",
          kn: "ಕೊರಿಯರ್ ಸ್ಪೆಷಲಿಸ್ಟ್",
          ml: "കൊറിയർ സ്പെഷ്യലിസ്റ്റ്",
          pa: "ਕੂਰੀਅਰ ਸਪੈਸ਼ਲਿਸਟ",
        },
        description: {
          hi: "पैकेज हैंडलिंग और विश्वसनीयता पर केंद्रित",
          en: "Focuses on package handling and reliability",
          bn: "প্যাকেজ হ্যান্ডলিং এবং নির্ভরযোগ্যতার উপর ফোকাস",
          te: "ప్యాకేజ్ హ్యాండ్లింగ్ మరియు విశ్వసనీయతపై దృష్టి",
          mr: "पॅकेज हाताळणी आणि विश्वसनीयतेवर लक्ष",
          ta: "பேக்கேஜ் கையாளுதல் மற்றும் நம்பகத்தன்மையில் கவனம் செலுத்துகிறது",
          gu: "પેકેજ હેન્ડલિંગ અને વિશ્વસનીયતા પર ધ્યાન",
          kn: "ಪ್ಯಾಕೇಜ್ ಹ್ಯಾಂಡ್ಲಿಂಗ್ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಮೇಲೆ ಕೇಂದ್રೀകరಿಸುತ್ತದೆ",
          ml: "പാക്കേജ് കൈകാര്യം ചെയ്യലും വിശ്വാസ്യതയും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਪੈਕੇਜ ਹੈਂਡਲਿੰਗ ਅਤੇ ਭਰੋਸੇਯੋਗਤਾ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "dp3",
        name: {
          hi: "मल्टी-प्लेटफॉर्म पार्टनर",
          en: "Multi-Platform Partner",
          bn: "মাল্টি-প্ল্যাটফর্ম পার্টনার",
          te: "మల్టీ-ప్లాట్‌ఫారమ్ పార్టనర్",
          mr: "मल्टी-प्लॅफॉર्म पार्टनर",
          ta: "மல்டி-பிளாட்ஃபார்ம் பார்ட்னர்",
          gu: "મલ્ટી-પ્લેટફોર્મ પાર્ટનર",
          kn: "ಮಲ್ಟಿ-ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಪಾರ್ಟ್ನರ್",
          ml: "മൾട്ടി-പ്ലാറ്റ്ഫോം പാർട്ണർ",
          pa: "ਮਲਟੀ-ਪਲੇਟਫਾਰਮ ਪਾਰਟਨਰ",
        },
        description: {
          hi: "डिलीवरी प्लेटफॉर्म में अनुभव दिखाता है",
          en: "Shows experience across delivery platforms",
          bn: "ডেলিভারি প্ল্যাটফর্ম জুড়ে অভিজ্ঞতা দেখায়",
          te: "డెలివరీ ప్లాట్‌ఫారమ్‌లలో అనుభవాన్ని చూపిస్తుంది",
          mr: "डिलिव्हरी प्लॅफॉર्मवरील अनुभव दाखवते",
          ta: "டெலிவரி பிளாட்ஃபார்ம்களில் அனுபவத்தைக் காட்டுகிறது",
          gu: "ડિલિવરી પ્લેટફોર્મ પર અનુભવ બતાવે છે",
          kn: "ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ ಅನುಭವವನ್ನು ತೋರಿಸುತ್ತದೆ",
          ml: "ഡെലിവറി പ്ലാറ്റ്ഫോമുകളിലുടനീളം അനുഭവം കാണിക്കുന്നു",
          pa: "ਡਿਲੀਵਰੀ ਪਲੇਟਫਾਰਮਾਂ ਵਿੱਚ ਤਜਰਬਾ ਦਿਖਾਉਂਦਾ ਹੈ",
        },
      },
    ],
    "3": [
      {
        id: "e1",
        name: {
          hi: "लाइसेंसशुदा इलेक्ट्रीशियन",
          en: "Licensed Electrician",
          bn: "লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান",
          te: "లైసెన్స్ పొందిన ఎలక్ట్రీషియన్",
          mr: "ऑटो मेकॅनिक",
          ta: "ஆட்டோ மெக்கானிக்",
          gu: "ઓટો મિકેનિક",
          kn: "ಆಟೋ ಮೆಕ್ಯಾನಿಕ್",
          ml: "ഓട്ടോ മെക്കാനിക്",
          pa: "ਆਟੋ ਮਕੈਨਿਕ",
        },
        description: {
          hi: "प्रमाणन और सुरक्षा प्रशिक्षण को उजागर करता है",
          en: "Highlights certifications and safety training",
          bn: "সার্টিফিকেশন এবং নিরাপত্তা প্রশিক্ষণ তুলে ধরে",
          te: "సర్టిఫికేషన్లు మరియు భద్రతా శిక్షణను హైలైట్ చేస్తుంది",
          mr: "प्रमाणपत्रे आणि सुरक्षा प्रशिक्षण हायलाइट करते",
          ta: "சான்றிதழ்கள் மற்றும் பாதுகாப்பு பயிற்சியை முன்னிலைப்படுத்துகிறது",
          gu: "પ્રમાણપત્રો અને સલામતી તાલીમને હાઇલાઇટ કરે છે",
          kn: "ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ತರಬೇತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "സർട്ടിഫിക്കേഷനുകളും സുരക്ഷാ പരിശീലനവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਸਰਟੀਫਿਕੇਸ਼ਨ ਅਤੇ ਸੁਰੱਖਿਆ ਸਿਖਲਾਈ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
      {
        id: "e2",
        name: {
          hi: "आवासीय विशेषज्ञ",
          en: "Residential Specialist",
          bn: "আবাসিক বিশেষজ্ঞ",
          te: "రెసిడెన్షియల్ స్పెషలిస్ట్",
          mr: "निवासी तज्ञ",
          ta: "குடியிருப்பு நிபுணர்",
          gu: "રેસિડેન્શિયલ સ્પેશિયાલિસ્ટ",
          kn: "ವಸತಿ ವಿಶೇಷಜ್ಞ",
          ml: "റെസിഡൻഷ്യൽ സ്പെഷ്യലിസ്റ്റ്",
          pa: "ਰਿਹਾਇਸ਼ੀ ਸਪੈਸ਼ਲਿਸਟ",
        },
        description: {
          hi: "घरेलू विद्युत कार्य और मरम्मत पर केंद्रित",
          en: "Focuses on home electrical work and repairs",
          bn: "বাড়ির বৈদ্যুতিক কাজ এবং মেরামতের উপর ফোকাস",
          te: "గృహ విద్యుత్ పని మరియు మరమ్మతులపై దృష్టి",
          mr: "घरगुती विद्युत कामे आणि दुरुस्तीवर लक্ṣ",
          ta: "வீட்டு மின்சார வேலை மற்றும் பழுதுபார்ப்பில் கவனம் செலுத்துகிறது",
          gu: "ઘરના વિદ્યુત કામ અને સમારકામ પર ધ્યાન",
          kn: "ಮನೆಯ ವಿದ್ಯುತ್ ಕೆಲಸ ಮತ್ತು ದುರಸ್ತಿಯ ಮೇಲೆ ಕೇಂದ್રೀകರಿಸುತ್ತದೆ",
          ml: "വീട്ടിലെ വൈദ്യുത ജോലികളിലും അറ്റകുറ്റപ്പണികളിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਘਰੇਲੂ ਬਿਜਲੀ ਦੇ ਕੰਮ ਅਤੇ ਮੁਰੰਮਤ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "e3",
        name: {
          hi: "कमर्शियल इलेक्ट्रीशियन",
          en: "Commercial Electrician",
          bn: "বাণিজ্যিক ইলেকট্রিশিয়ান",
          te: "కమర్షియల్ ఎలక్ట్రీషియన్",
          mr: "व्यা঵सायिक इलेक्ट्रिशियन",
          ta: "வணிக மின்சாரம்",
          gu: "કોમર્શિયલ ઇલેક્ટ્રિશિયન",
          kn: "ವಾಣಿಜ ಎಲೆಕ್ಟ್રಿಷಿಯನ್",
          ml: "കൊമേഴ്‌സ്യൽ ഇലക്ട്രീഷ്യൻ",
          pa: "ਕਮਰਸ਼ੀਅਲ ਇਲੈਕਟ੍ਰੀਸ਼ਿਅਨ",
        },
        description: {
          hi: "औद्योगिक और वाणिज्यिक परियोजनाओं पर जोर",
          en: "Emphasizes industrial and commercial projects",
          bn: "শিল্প এবং বাণিজ্যিক প্রকল্পের উপর জোর",
          te: "పారిశ్రామిక మరియు వాణిజ ప్రాజెక్టులను నొక్కిచెప్పుతుంది",
          mr: "औद्योगिक आणि व्यावसायिक प्रकल्पांवर भर",
          ta: "தொழில்துறை மற்றும் வணிக திட்டங்களை வலியுறுத்துகிறது",
          gu: "ઔદ્યોગિક અને વ્યાવસાયિક પ્રોજેક્ટ્સ પર ભાર",
          kn: "ಕೈಗಾರಿಕಾ ಮತ್ತು ವಾಣಿಜ ಯೋಜನೆಗಳನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
          ml: "വ്യാവസായിക, വാണിജ്യ പദ്ധതികൾക്ക് ഊന്നൽ",
          pa: "ਉਦਯੋਗਿਕ ਅਤੇ ਵਪਾਰਕ ਪ੍ਰੋਜੈਕਟਾਂ 'ਤੇ ਜ਼ੋਰ",
        },
      },
    ],
    "4": [
      {
        id: "t1",
        name: {
          hi: "मास्टर टेलर",
          en: "Master Tailor",
          bn: "মাস্টার টেইলর",
          te: "మాస్టర్ టైలర్",
          mr: "मास्टर टेलर",
          ta: "மாஸ்டர் டெய்லர்",
          gu: "માસ્ટર ટેલર",
          kn: "ಮಾಸ್ಟರ್ ಟೈಲರ್",
          ml: "മാസ്റ്റർ ടെയിലർ",
          pa: "ਮਾਸਟਰ ਟੇਲਰ",
        },
        description: {
          hi: "शिल्प कौशल और विशेषज्ञताओं को प्रदर्शित करता है",
          en: "Showcases craftsmanship and specializations",
          bn: "কারুশিল্প এবং বিশেষত্ব প্রদর্শন করে",
          te: "హస్తకళ మరియు ప్రత్యేకతలను ప్రదర్శిస్తుంది",
          mr: "कारागिरी आणि विशेषज्ञता दाखवते",
          ta: "கைவிணை மற்றும் சிறப்புகளை காட்டுகிறது",
          gu: "કારીગરી અને વિશેષતાઓ દર્શાવે છે",
          kn: "ಕರಕುಶಲತೆ ಮತ್ತು ವಿಶೇಷತೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ",
          ml: "കരകൗശലവും സ്പെഷ്യലൈസേഷനുകളും പ്രദർശിപ്പിക്കുന്നു",
          pa: "ਕਾਰੀਗਰੀ ਅਤੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦਿਖਾਉਂਦਾ ਹੈ",
        },
      },
      {
        id: "t2",
        name: {
          hi: "अल्टरेशन एक्सपर्ट",
          en: "Alterations Expert",
          bn: "পরিবর্তন বিশেষজ্ঞ",
          te: "మార్పుల నిపుణుడు",
          mr: "बदल तज्ञ",
          ta: "மாற்றங்கள் நிபுணர்",
          gu: "ફેરફાર નિષ્ણાત",
          kn: "ಬದಲಾವಣೆ ತಜ್ಞ",
          ml: "മാറ്റങ്ങളുടെ വിദഗ്ധൻ",
          pa: "ਤਬਦੀਲੀ ਮਾਹਿਰ",
        },
        description: {
          hi: "परिवर्तन कौशल और त्वरित टर्नअराउंड पर केंद्रित",
          en: "Focuses on alteration skills and quick turnaround",
          bn: "পরিবর্তন দক্ষতা এবং দ্রুত টার্নঅ্যারাউন্ডের উপর ফোকাস",
          te: "మార్పు నైపుణ్యాలు మరియు త్వరిత టర్న్‌అరౌండ్‌పై దృష్టి",
          mr: "बदल कौशल्ये आणि जलद टर्नअराउंडवर लक्ष",
          ta: "மாற்றும் திறன்கள் மற்றும் விரைவான திருப்பத்தில் கவனம் செலுத்துகிறது",
          gu: "ફેરફાર કુશળતા અને ઝડપી ટર્નઅરાઉંડ પર ધ્યાન",
          kn: "ಬದಲಾವಣೆ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ತ್ವರಿತ ಟರ್ನ್‌ಅರೌಂಡ್‌ನ ಮೇಲೆ ಕೇಂದ್ರೀകരಿಸುತ್ತದೆ",
          ml: "മാറ്റങ്ങളുടെ കഴിവുകളിലും വേഗത്തിലുള്ള ടേൺഅറൗണ്ടിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਤਬਦੀਲੀ ਦੇ ਹੁਨਰ ਅਤੇ ਤੇਜ਼ ਟਰਨਅਰਾਊਂਡ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "t3",
        name: {
          hi: "फैशन टेलर",
          en: "Fashion Tailor",
          bn: "ফ্যাশন টেইলর",
          te: "ఫ్యాషన్ టైలర్",
          mr: "फॅशन टेलर",
          ta: "பேஷன் டெய்லர்",
          gu: "ફેશન ટેલર",
          kn: "ಫ್ಯಾಷನ್ ಟೈಲರ್",
          ml: "ഫാഷൻ ടെയിലർ",
          pa: "ਫੈਸ਼ਨ ਟੇਲਰ",
        },
        description: {
          hi: "कस्टम डिज़ाइन और फैशन विशेषज्ञता को उजागर करता है",
          en: "Highlights custom design and fashion expertise",
          bn: "কাস্টম ডিজাইন এবং ফ্যাশন দক্ষতা তুলে ধরে",
          te: "కస్టమ్ డిజైన్ మరియు ఫ్యాషన్ నైపుణ్యాన్ని హైలైట్ చేస్తుంది",
          mr: "सानुकूल डिझाइन आणि फॅशन तज्ञतेवर भर",
          ta: "தனிப்பயன் வடிவமைப்பு மற்றும் பேஷன் நிபுணத்துவத்தை வலியுறுத்துகிறது",
          gu: "કસ્ટમ ડિઝાઇન અને ફેશન નિપુણતાને હાઇલાઇટ કરે છે",
          kn: "ಕас್ಟમ್ ಡಿಸೈನ್ ಮತ್ತು ಫ್ಯಾಷನ್ ಪರಿಣತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "കസ്റ്റം ഡിസൈനും ഫാഷൻ വൈദഗ്ധ്യവും ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਕਸਟਮ ਡਿਜ਼ਾਈਨ ਅਤੇ ਫੈਸ਼ਨ ਮਾਹਰਤਾ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
    ],
    "5": [
      {
        id: "c1",
        name: {
          hi: "प्रोफेशनल शेफ",
          en: "Professional Chef",
          bn: "পেশাদার শেফ",
          te: "ప్రొఫెషనల్ చెఫ్",
          mr: "व्यावसायिक शेफ",
          ta: "தொழில்முறை சமையல்காரர்",
          gu: "પ્રોફેશનલ શેફ",
          kn: "ವೃತ್ತಿರ ಬಾಣಸಿಗ",
          ml: "പ്രൊഫഷണൽ ഷെഫ്",
          pa: "ਪੇਸ਼ੇਵਰ ਸ਼ੈੱਫ",
        },
        description: {
          hi: "व्यंजन विशेषज्ञता और रसोई नेतृत्व पर जोर",
          en: "Emphasizes cuisine expertise and kitchen leadership",
          bn: "রান্নার দক্ষতা এবং রান্নাঘরের নেতৃত্বের উপর জোর",
          te: "వంటకాల నైపుణ్యం మరియు వంటగది నాయకత్వాన్ని నొక్కిచెప్పుతుంది",
          mr: "स्वयंपाक तज्ञता आणि स्वযंપाकघर नेतृत्वावर भर",
          ta: "சமையல் நிபுணத்துவம் மற்றும் சமையலறை தலைமையை வலியுறுத்துகிறது",
          gu: "રસોઈ નિપુણતા અને રસોડાના નેતૃત્વ પર ભાર",
          kn: "ಪಾಕಶಾಸ್ತ್ರದ ಪரಿಣತಿ ಮತ್ತು ಅಡುಗೆಮನೆಯ ನಾಯಕತ್ವವನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
          ml: "പാചക വൈദഗ്ധ്യവും അടുക്കള നേതൃത്വവും ഊന്നിപ്പറയുന്നു",
          pa: "ਪਕਵਾਨ ਮਾਹਰਤਾ ਅਤੇ ਰਸੋਈ ਦੀ ਅਗਵਾਈ 'ਤੇ ਜ਼ੋਰ",
        },
      },
      {
        id: "c2",
        name: {
          hi: "होम कुक",
          en: "Home Cook",
          bn: "হোম কুক",
          te: "హోమ్ కుక్",
          mr: "होम कुक",
          ta: "வீட்டு சமையல்காரர்",
          gu: "હોમ કુક",
          kn: "ಮನೆ ಬಾಣಸಿಗ",
          ml: "ഹോം കുക്ക്",
          pa: "ਘਰੇਲੂ ਰਸੋਈਏ",
        },
        description: {
          hi: "पारি঵ारिक खाना पकाने और भोजन तैयारी पर केंद्रित",
          en: "Focuses on family cooking and meal preparation",
          bn: "পারিবারিক রান্না এবং খাবার প্রস্তুতির উপর ফোকাস",
          te: "కుటుంబ వంట మరియు భోజన తయారీపై దృష్టి",
          mr: "कौুংबिक स्वয়ান्पাক आणि जेवण तयारीवर लक्ष",
          ta: "குடும்ப சமையல் மற்றும் உணவு தயாரிப்பில் கவனம் செலுத்துகிறது",
          gu: "કુટુંબના રસોઈ અને ભોજન તૈયારી પર ધ્યાન",
          kn: "ಕುಟುಂಬ ಅಡುಗೆ ಮತ್ತು ಊಟ ತಯಾರಿಕೆಯ ಮೇಲೆ ಕೇಂದ್રೀকరಿಸುತ್ತದೆ",
          ml: "കുടുംബ പാചകത്തിലും ഭക്ഷണ തയ്യാറാക്കലിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਪਰਿਵਾਰਕ ਖਾਣਾ ਪਕਾਉਣ ਅਤੇ ਭੋਜਨ ਤਿਆਰ ਕਰਨ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "c3",
        name: {
          hi: "रेस्टोरेंट कुक",
          en: "Restaurant Cook",
          bn: "রেস্তোরাঁ কুক",
          te: "రెస్టారెంట్ కుక్",
          mr: "रेस्टॉरंट कुक",
          ta: "உணவகம் சமையல்காரர்",
          gu: "રેસ્ટોરન્ટ કુક",
          kn: "ರೆಸ್ಟೋರೆಂಟ್ ಕುಕ್",
          ml: "റെസ്റ്റോറന്റ് കുക്ക്",
          pa: "ਰੈਸਟੋਰੈਂਟ ਕੁੱਕ",
        },
        description: {
          hi: "तेज़-तर्रार रसोई के अनुभव को उजागर करता है",
          en: "Highlights fast-paced kitchen experience",
          bn: "দ্রুত গতির রান্নাঘরের অভিজ্ঞতা তুলে ধরে",
          te: "వేగవంతమైన వంటగది అనుభవాన్ని హైలైట్ చేస్తుంది",
          mr: "जलद गतीच्या स्वयंपाकघरातील अनुभव हायलाइट करते",
          ta: "வேகமான சமையலறை அனுபவத்தை முன்னிலைப்படுத்துகிறது",
          gu: "ઝડપી ગતિના રસોડાના અનુભવને હાઇલાઇટ કરે છે",
          kn: "ವೇಗದ ಅಡುಗೆಮನೆಯ ಅನುಭವವನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "വേഗതയേറിയ അടുക്കള അനുഭവം ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਤੇਜ਼-ਰਫ਼ਤਾਰ ਰਸੋਈ ਦੇ ਤਜਰਬੇ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
    ],
    "6": [
      {
        id: "s1",
        name: {
          hi: "लाइसेंसशुदा सिक्योरिटी",
          en: "Licensed Security",
          bn: "লাইসেন্সপ্রাপ্ত নিরাপত্তা",
          te: "లైసెన్స్ పొందిన భద్రత",
          mr: "परवानाधारक सुरक्षा",
          ta: "உரிமம் பெற்ற பாதுகாப்பு",
          gu: "લાઇસન્સ પ્રાપ્ત સિક્યુરિટી",
          kn: "ಪರವಾನಗಿ ಪಡೆದ ಭದ್ರತೆ",
          ml: "ലൈസൻസുള്ള സെക്യൂരിറ്റി",
          pa: "ਲਾਇਸੈਂਸਸ਼ੁਦਾ ਸਿਕਿਓਰਿਟੀ",
        },
        description: {
          hi: "लाइसेंस और सुरक्षा प्रशिक्षण पर जोर",
          en: "Emphasizes licenses and security training",
          bn: "লাইসেন্স এবং নিরাপত্তা প্রশিক্ষণের উপর জোর",
          te: "లైసెన్స్‌లు మరియు భద్రతా శిక్షణను నొక్కిచెప్పుతుంది",
          mr: "परवाने आणि सुरक्षा प्रशिक्षणावर भर",
          ta: "உரிமங்கள் மற்றும் பாதுகாப்பு பயிற்சியை வலியுறுத்துகிறது",
          gu: "લાઇસન્સ અને સિક્યુરિટી ટ્રેનિંગ પર ભાર",
          kn: "ಪರವಾನಗಿಗಳು ಮತ್ತು ಭದ್ರತಾ ತರಬೇತಿಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
          ml: "ലൈസൻസുകളും സുരക്ഷാ പരിശീലനവും ഊന്നിപ്പറയുന്നു",
          pa: "ਲਾਇਸੈਂਸ ਅਤੇ ਸਿਕਿਓਰਿਟੀ ਸਿਖਲਾਈ 'ਤੇ ਜ਼ੋਰ",
        },
      },
      {
        id: "s2",
        name: {
          hi: "कॉर्पोरेट सिक्योरिटी",
          en: "Corporate Security",
          bn: "কর্পোরেট নিরাপত্তা",
          te: "కార్పొరేట్ భద్రత",
          mr: "कॉર्पोरेट सुरक्षा",
          ta: "கார்ப்பரேட் பாதுகாப்பு",
          gu: "કોર્પોરેટ સિક્યુરિટી",
          kn: "ಕಾರ್ಪೊರೇಟ್ ಭದ್ರತೆ",
          ml: "കോർപ്പറേറ്റ് സെക്യൂരിറ്റി",
          pa: "ਕਾਰਪੋਰੇਟ ਸਿਕਿਓਰਿਟੀ",
        },
        description: {
          hi: "कार्यালय और कॉર्पोरेट सुरक्षा पर केंद्रित",
          en: "Focuses on office and corporate security",
          bn: "অফিস এবং কর্পোরেট নিরাপত্তার উপর ফোকাস",
          te: "కార్యాలయం మరియు కార్పొరేట్ భద్రతపై దృష్టి",
          mr: "कार्यालय आणि कॉર्पोरेट सुরक्षेवર लक्ष",
          ta: "அலுவலகம் மற்றும் கார்ப்பரேட் பாதுகாப்பில் கவனம் செலுத்துகிறது",
          gu: "ઓફિસ અને કોર્પોરેટ સિક્યુરિટી પર ધ્યાન",
          kn: "ಕಚೇರಿ ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ಭದ್ರತೆಯ ಮೇಲೆ ಕೇಂದ್રೀকരಿಸುತ್ತದೆ",
          ml: "ഓഫീസ്, കോർപ്പറേറ്റ് സെക്യൂരിറ്റിയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਦਫ਼ਤਰ ਅਤੇ ਕਾਰਪੋਰੇਟ ਸਿਕਿਓਰਿਟੀ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "s3",
        name: {
          hi: "इवेंट सिक्योरिटी",
          en: "Event Security",
          bn: "ইভেন্ট নিরাপত্তা",
          te: "ఈవెంట్ భద్రత",
          mr: "इव्हेंट सुरक्षा",
          ta: "நிகழ்வு பாதுகாப்பு",
          gu: "ઇવેન્ટ સિક્યુરિટી",
          kn: "ಈವೆಂಟ್ ಭದ್ರತೆ",
          ml: "ഇവന്റ് സെക്യൂരിറ്റി",
          pa: "ਇਵੈਂਟ ਸਿਕਿਓਰਿਟੀ",
        },
        description: {
          hi: "भीड़ नियंत्रण और कार्यक्रम प्रबंधन को उजागर करता है",
          en: "Highlights crowd control and event management",
          bn: "ভিড় নিয়ন্ত্রণ এবং ইভেন্ট ব্যবস্থাপনা তুলে ধরে",
          te: "గుంపు నియంత్రణ మరియు ఈవెంట్ నిర్వహణను హైలైట్ చేస్తుంది",
          mr: "गर्दी नियंत्रण आणि कार्यक्रम व्यवस्थापन हायलाइट करते",
          ta: "கூட்டம் கட்டுப்பாடு மற்றும் நிகழ்வு மேலாண்மையை முன்னிலைப்படுத்துகிறது",
          gu: "ભીડ નિયંત્રણ અને ઇવેન્ટ મેનેજમેન્ટને હાઇલાઇટ કરે છે",
          kn: "ಜನಸಮೂಹ ನಿಯಂತ್ರಣ ಮತ್ತು ಈವೆಂಟ್ ನಿರ್ವಹಣೆಯನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "ജനക്കൂട്ടത്തെ നിയന്ത്രിക്കലും ഇവന്റ് മാനേജ്‌മെന്റും ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਭੀੜ ਕੰਟਰੋਲ ਅਤੇ ਇਵੈਂਟ ਮੈਨੇਜਮੈਂਟ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
    ],
    "7": [
      {
        id: "sa1",
        name: {
          hi: "रिटेल एसोसिएट",
          en: "Retail Associate",
          bn: "খুচরা সহযোগী",
          te: "రిటైల్ అసోసియేట్",
          mr: "किरकोळ सहযোগী",
          ta: "சில்லறை கூட்டாளர்",
          gu: "રિટેલ એસોસિએટ",
          kn: "ಚಿಲ್ಲರೆ ಸಹಯೋಗಿ",
          ml: "റീട്ടെയിൽ അസോസിയേറ്റ്",
          pa: "ਰਿਟੇਲ ਐਸੋਸੀਏਟ",
        },
        description: {
          hi: "ग्रাহक सेवा और उत्पाद ज्ञान पर केंद्रित",
          en: "Focuses on customer service and product knowledge",
          bn: "গ্রাহক সেবা এবং পণ্য জ্ঞানের উপর ফোকাস",
          te: "కస్టమర్ సేవ మరియు ఉత్పత్తి జ్ఞానంపై దృష్టి",
          mr: "ग्रাহक सेवा आणि उत्पादन ज्ञानावर लक्ष",
          ta: "வாடிக்கையாளர் சேவை மற்றும் தயாரிப்பு அறிவில் கவனம் செலுத்துகிறது",
          gu: "ગ્રાહક સેવા અને ઉત્પાદન જ્ઞાન પર ધ્યાન",
          kn: "ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ಉత್ಪನ್ನ ಜ್ಞಾನದ ಮೇಲೆ ಕೇಂದ್રೀকരಿಸುತ್ತದೆ",
          ml: "ഉപഭോക്തൃ സേവനത്തിലും ഉൽപ്പന്ന അറിവിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਗਾਹਕ ਸੇਵਾ ਅਤੇ ਉਤਪਾਦ ਗਿਆਨ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "sa2",
        name: {
          hi: "शॉप असिस्टेंट",
          en: "Shop Assistant",
          bn: "দোকান সহায়ক",
          te: "షాప్ అసిస్టెంట్",
          mr: "दुकान सहाय्यक",
          ta: "கடை உதவியாளர்",
          gu: "શોપ આસિસ્ટન્ટ",
          kn: "ಅಂಗಡಿ ಸಹಾಯಕ",
          ml: "ഷോപ്പ് അസിസ്റ്ടന്റ്",
          pa: "ਸ਼ਾਪ ਅਸਿਸਟੈਂਟ",
        },
        description: {
          hi: "POS सिस्टम और इन्वेंटरी प्रबंधन पर जोर",
          en: "Emphasizes POS systems and inventory management",
          bn: "POS সিস্টেম এবং ইনভেন্টরি ব্যবস্থাপনার উপর জোর",
          te: "POS సిస్టమ్‌లు మరియు ఇన్వెంటరీ నిర్వహణను నొక్కిచెప్పుతుంది",
          mr: "POS सिस्टम आणि इन्व्हेंटरी व्यवস्थापनावर भर",
          ta: "POS அமைப்புகள் மற்றும் சரக்கு மேலாண்மையை வலியுறுத்துகிறது",
          gu: "POS સિસ્ટમ અને ઇન્વેન્ટરી મેનેજમેન્ટ પર ભાર",
          kn: "POS ಸಿಸ್ಟಮ್‌ಗಳು ಮತ್ತು ದಾಸ್ತಾನು ನಿರ್ವಹಣೆಯನ್ನು ತೋರಿಸುತ್ತದೆ",
          ml: "POS സിസ്റ്റങ്ങളും ഇൻവെന്ററി മാനേജ്‌മെന്റും ഊന്നിപ്പറയുന്നു",
          pa: "POS ਸਿਸਟਮ ਅਤੇ ਇਨਵੈਂਟਰੀ ਮੈਨੇਜਮੈਂਟ 'ਤੇ ਜ਼ੋਰ",
        },
      },
      {
        id: "sa3",
        name: {
          hi: "सेल्स स्पेशलिस्ट",
          en: "Sales Specialist",
          bn: "বিক্রয় বিশেষজ্ঞ",
          te: "సేల్స్ స్పెషలిస్ట్",
          mr: "विक्री तज्ञ",
          ta: "விற்பனை நிபுணர்",
          gu: "સેલ્સ સ્પેશિયાલિસ્ટ",
          kn: "ಮಾರಾಟ ವಿಶೇಷಜ್ಞ",
          ml: "സെയിൽസ് സ്പെഷ്യലിസ്റ്റ്",
          pa: "ਸੇਲਜ਼ ਸਪੈਸ਼ਲਿਸਟ",
        },
        description: {
          hi: "बिक्री मेट्रिक्स और ग्राहक संबंधों को उजागर करता है",
          en: "Highlights sales metrics and customer relationships",
          bn: "বিক্রয় মেট্রিক্স এবং গ্রাহক সম্পর্ক তুলে ধরে",
          te: "సేల్స్ మెట్రిక్స్ మరియు కస్టమర్ రిలేషన్‌షిప్‌లను హైలైట్ చేస్తుంది",
          mr: "विक्री मेट्रिक्स आणि ग्राहक संबंध हायलाइट करते",
          ta: "விற்பனை அளவீடுகள் மற்றும் வாடிக்கையாளர் உறவுகளை முன்னிலைப்படுத்துகிறது",
          gu: "સેલ્સ મેટ્રિક્સ અને કસ્ટમર રિલેશનશિપને હાઇલાઇટ કરે છે",
          kn: "ಮಾರಾಟ ಮೆಟ್રಿಕ್ಸ್ ಮತ್ತು ಗ್ರಾಹಕ ಸಂಬಂಧಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ",
          ml: "സെയിൽസ് മെട്രിക്സും ഉപഭോക്തൃ ബന്ധങ്ങളും ഹൈലൈറ്റ് ചെയ്യുന്നു",
          pa: "ਸੇਲਜ਼ ਮੈਟ੍ਰਿਕਸ ਅਤੇ ਗਾਹਕ ਰਿਸ਼ਤਿਆਂ ਨੂੰ ਉਜਾਗਰ ਕਰਦਾ ਹੈ",
        },
      },
    ],
    "8": [
      {
        id: "m1",
        name: {
          hi: "ऑटो मैकेनिक",
          en: "Auto Mechanic",
          bn: "অটো মেকানিক",
          te: "ఆటో మెకానిక్",
          mr: "ऑो मेकॅनिक",
          ta: "ஆட்டோ மெக்கானிக்",
          gu: "ઓટો મિકેનિક",
          kn: "ಆಟೋ ಮೆಕ್ಯಾನಿಕ್",
          ml: "ഓട്ടോ മെക്കാനിക്",
          pa: "ਆਟੋ ਮਕੈਨਿਕ",
        },
        description: {
          hi: "कार की मरम्मत और डायग्नोस्टिक कौशल पर केंद्रित",
          en: "Focuses on car repair and diagnostic skills",
          bn: "গাড়ি মেরামত এবং ডায়াগনস্টিক দক্ষতার উপর ফোকাস",
          te: "కార్ రిపేర్ మరియు డయాగ్నోస్టిక్ స్కిల్స్‌పై దృష్టి",
          mr: "कार दुરुस्ती आणि निदान कौशल्यांवर लक्ष",
          ta: "கார் பழுதுபார்ப்பு மற்றும் கண்டறியும் திறன்களில் கவனம் செலுத்துகிறது",
          gu: "કાર રિપેર અને ડાયગ્નોસ્ટિક સ્કિલ્સ પર ધ્યાન",
          kn: "ಕಾರ್ ರಿಪೇರ್ ಮತ್ತು ಡಯಾಗ್ನೋಸ್ಟಿಕ್ ಕೌಶಲ್ಯಗಳ ಮೇಲೆ ಕೇಂದ್રೀകരಿಸುತ್ತದೆ",
          ml: "കാർ റിപ്പയറിലും ഡയഗ്നോസ്റ്റിക് കഴിവുകളിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു",
          pa: "ਕਾਰ ਦੀ ਮੁਰੰਮਤ ਅਤੇ ਡਾਇਗਨੌਸਟਿਕ ਹੁਨਰ 'ਤੇ ਧਿਆਨ",
        },
      },
      {
        id: "m2",
        name: {
          hi: "टू-व्हीलर स्पेशलिस्ट",
          en: "Two-Wheeler Specialist",
          bn: "দুই চাকার বিশেষজ্ঞ",
          te: "టూ-వీలర్ స్పెషలిస్ట్",
          mr: "द्विचाकी तज्ञ",
          ta: "இரு சக்கர வாகன நிபுணர்",
          gu: "ટુ-વ્હીલર સ્પેશિયાલિસ્ટ",
          kn: "ಎರಡು ಚಕ್ರ ವಿಶೇಷಜ್ಞ",
          ml: "ടു-വീലർ സ്പെഷ്യലിസ്റ്റ്",
          pa: "ਟੂ-ਵ੍ਹੀਲਰ ਸਪੈਸ਼ਲਿਸਟ",
        },
        description: {
          hi: "मोटरसाइकिल और स्कूटर विशेषज्ञता पर जोर",
          en: "Emphasizes motorcycle and scooter expertise",
          bn: "মোটরসাইকেল এবং স্কুটার দক্ষতার উপর জোর",
          te: "మోటార్‌సైకిల్ మరియు స్కూటర్ నైపుణ్యాన్ని నొక్కిచెప్పుతుంది",
          mr: "मोटरसायकल आणि स्कूटर तज्ञतेवર भर",
          ta: "மோட்டார் சைக்கிள் மற்றும் ஸ்கூட்டர் நிபுணத்துவத்தை வலியுறுத்துகிறது",
          gu: "મોટરસાઇકલ અને સ્કૂટર નિપુણતા પર ભાર",
          kn: "ಮೋಟಾರ್‌ಸೈಕಲ್ ಮತ್ತು ಸ್ಕೂಟರ್ ಪரಿಣತಿಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ",
          ml: "മോട്ടോർസൈക്കിൾ, സ്കൂട്ടർ വൈദഗ്ധ്യം ഊന്നിപ്പറയുന്നു",
          pa: "ਮੋਟਰਸਾਈਕਲ ਅਤੇ ਸਕੂਟਰ ਮਾਹਰਤਾ 'ਤੇ ਜ਼ੋਰ",
        },
      },
      {
        id: "m3",
        name: {
          hi: "मल्टी-व्हीकल मैकेनिक",
          en: "Multi-Vehicle Mechanic",
          bn: "মাল্টি-ভেহিকেল মেকানিক",
          te: "మల్టీ-వెహికల్ మెకానిక్",
          mr: "मल्टी-व्हेहिकल मेकॅनिक",
          ta: "பல வாகன மெக்கானிக்",
          gu: "મલ્ટી-વ્હીકલ મિકેનિક",
          kn: "ಮಲ್ಟಿ-ವೆಹಿಕಲ್ ಮೆಕ್ಯಾನಿಕ್",
          ml: "മൾട്ടി-വെഹിക്കിൾ മെക്കാനിക്",
          pa: "ਮਲਟੀ-ਵਹੀਕਲ ਮਕੈਨਿਕ",
        },
        description: {
          hi: "विभिन्न वाहन प्रकारों के साथ अनुभव दिखाता है",
          en: "Shows experience with various vehicle types",
          bn: "বিভিন্ন যানবাহনের ধরনের সাথে অভিজ্ঞতা দেখায়",
          te: "వివిధ వాహన రకాలతో అనుభవాన్ని చూపిస్తుంది",
          mr: "विविध वाहन प्रकारांसह अनुभव दाखवते",
          ta: "பல்வேறு வாகன வகைகளுடன் அனுபவத்தைக் காட்டுகிறது",
          gu: "વિવિધ વાહન પ્રકારો સાથે અનુભવ બતાવે છે",
          kn: "ವಿವಿಧ ವಾಹನ ಪ್ರಕಾರಗಳೊಂದಿಗೆ ಅನುಭವವನ್ನು ತೋರಿಸುತ್ತದೆ",
          ml: "വിവിധ വാഹന തരങ്ങളുമായുള്ള അനുഭവം കാണിക്കുന്നു",
          pa: "ਵੱਖ-ਵੱਖ ਵਾਹਨ ਕਿਸਮਾਂ ਨਾਲ ਤਜਰਬਾ ਦਿਖਾਉਂਦਾ ਹੈ",
        },
      },
    ],
  }

  const handlePreview = (categoryId: string, templateId: string) => {
    router.push(`/preview-template/${categoryId}/${templateId}?lang=${currentLanguage}`)
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
    const templateType = templateId.substring(0, templateId.length - 1) // Remove number
    switch (templateType) {
      case "d":
        return <DriverThumbnail variant={templateId.slice(-1)} />
      case "dp":
        return <DeliveryPartnerThumbnail variant={templateId.slice(-1)} />
      case "e":
        return <ElectricianThumbnail variant={templateId.slice(-1)} />
      case "t":
        return <TailorThumbnail variant={templateId.slice(-1)} />
      case "c":
        return <CookChefThumbnail variant={templateId.slice(-1)} />
      case "s":
        return <SecurityGuardThumbnail variant={templateId.slice(-1)} />
      case "sa":
        return <SalesAssistantThumbnail variant={templateId.slice(-1)} />
      case "m":
        return <MechanicThumbnail variant={templateId.slice(-1)} />
      default:
        return <DriverThumbnail variant="1" />
    }
  }

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("preferredLanguage") as Language) || "en"
    const savedProfession = localStorage.getItem("selectedProfession") || ""

    setCurrentLanguage(savedLanguage)
    setSelectedProfession(savedProfession)

    if (!savedProfession) {
      router.push("/profession-selection")
      return
    }

    setIsLoading(false)

    const timer = setTimeout(() => {
      playAudioGuide()
    }, 1000) // Small delay to ensure language is set and voices are loaded

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">{getTranslation("ui.loading", currentLanguage)}</p>
        </div>
      </div>
    )
  }

  if (!selectedProfession) {
    return (
      <div className="container mx-auto py-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">{getTranslation("ui.loading", currentLanguage)}</p>
        </div>
      </div>
    )
  }

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategoryId)
  const categoryTemplates = templates[selectedCategoryId] || []

  if (categoryTemplates.length === 0) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            {getTranslation("ui.backToDashboard", currentLanguage)}
          </Button>

          <Button
            variant="outline"
            onClick={playAudioGuide}
            className="flex items-center gap-2 bg-transparent"
            title={getTranslation("ui.replayAudio", currentLanguage)}
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">{getTranslation("ui.replayAudio", currentLanguage)}</span>
          </Button>
        </div>

        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">{getTranslation("ui.noTemplatesFound", currentLanguage)}</h1>
          <Button onClick={handleBackToDashboard}>{getTranslation("ui.backToDashboard", currentLanguage)}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          {getTranslation("ui.backToDashboard", currentLanguage)}
        </Button>

        <Button
          variant="outline"
          onClick={playAudioGuide}
          className="flex items-center gap-2 bg-transparent"
          title={getTranslation("ui.replayAudio", currentLanguage)}
        >
          <Volume2 className="h-4 w-4" />
          <span className="hidden sm:inline">{getTranslation("ui.replayAudio", currentLanguage)}</span>
        </Button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">{getTranslation("ui.chooseTemplate", currentLanguage)}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{getTranslation("ui.templateDescription", currentLanguage)}</p>
        {selectedCategoryData && (
          <p className="text-lg font-medium mt-4 text-blue-600">
            {getTranslation(`categories.${selectedCategoryData.name}`, currentLanguage)}{" "}
            {getTranslation("ui.templates", currentLanguage)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(selectedCategoryId, template.id)}</div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg">{template.name[currentLanguage]}</h3>
                  <p className="text-sm text-gray-600">{template.description[currentLanguage]}</p>
                </div>
                <Button size="sm" className="w-full" onClick={() => handlePreview(selectedCategoryId, template.id)}>
                  {getTranslation("ui.previewAndSelect", currentLanguage)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DriverThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Car className="h-4 w-4 text-blue-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-blue-600 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="w-3/4 h-1 bg-gray-300"></div>
        <div className="flex gap-2 mt-2">
          <div className="w-1/4 h-1 bg-green-500"></div>
          <div className="w-1/4 h-1 bg-green-500"></div>
        </div>
      </div>
    </div>
  )
}

function DeliveryPartnerThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Package className="h-4 w-4 text-orange-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-orange-600 mb-1"></div>
        <div className="flex justify-between">
          <div className="w-1/3 h-1 bg-gray-300"></div>
          <div className="w-1/4 h-1 bg-yellow-500"></div>
        </div>
        <div className="w-full h-1 bg-gray-300"></div>
      </div>
    </div>
  )
}

function ElectricianThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-yellow-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-yellow-600 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="grid grid-cols-3 gap-1">
          <div className="h-2 bg-yellow-200"></div>
          <div className="h-2 bg-yellow-200"></div>
          <div className="h-2 bg-yellow-200"></div>
        </div>
      </div>
    </div>
  )
}

function TailorThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Scissors className="h-4 w-4 text-purple-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-purple-600 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="flex gap-1">
          <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
          <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
          <div className="w-1/4 h-3 bg-purple-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

function CookChefThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <ChefHat className="h-4 w-4 text-red-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-red-600 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="w-3/4 h-1 bg-gray-300"></div>
        <div className="flex gap-2">
          <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
          <div className="w-1/5 h-2 bg-red-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

function SecurityGuardThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-blue-800" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-blue-800 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="border border-blue-300 p-1">
          <div className="w-3/4 h-1 bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

function SalesAssistantThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingCart className="h-4 w-4 text-green-600" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-green-600 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="flex justify-between">
          <div className="w-1/3 h-1 bg-gray-300"></div>
          <div className="w-1/4 h-1 bg-green-400"></div>
        </div>
      </div>
    </div>
  )
}

function MechanicThumbnail({ variant }: { variant: string }) {
  return (
    <div className="w-full h-full p-3 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-gray-700" />
        <div className="w-2/3 h-3 bg-gray-800"></div>
      </div>
      <div className="space-y-2">
        <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
        <div className="w-full h-1 bg-gray-300"></div>
        <div className="grid grid-cols-2 gap-1">
          <div className="h-2 bg-gray-200"></div>
          <div className="h-2 bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
