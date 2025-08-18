// // "use client"

// // import { useState, useEffect } from "react"
// // import Link from "next/link"
// // import { useRouter } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardFooter } from "@/components/ui/card"
// // import { toast } from "@/components/ui/use-toast"
// // import { Plus, FileText, Edit, Download, Trash2, Loader2 } from "lucide-react"

// // interface Resume {
// //   id: string
// //   templateName: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function DashboardPage() {
// //   const router = useRouter()
// //   const [resumes, setResumes] = useState<Resume[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDeleting, setIsDeleting] = useState<string | null>(null)

// //   useEffect(() => {
// //     // Check if user is authenticated and fetch resumes
// //     const fetchResumes = async () => {
// //       try {
// //         const authResponse = await fetch("http://localhost:5000/api/check-auth", {
// //           credentials: "include",
// //         })

// //         if (!authResponse.ok) {
// //           router.push("/login")
// //           return
// //         }

// //         const resumesResponse = await fetch("http://localhost:5000/api/resumes", {
// //           credentials: "include",
// //         })

// //         if (resumesResponse.ok) {
// //           const data = await resumesResponse.json()
// //           setResumes(data.resumes)
// //         } else {
// //           toast({
// //             title: "Error",
// //             description: "Failed to load your resumes. Please try again.",
// //             variant: "destructive",
// //           })
// //         }
// //       } catch (error) {
// //         toast({
// //           title: "Error",
// //           description: "An error occurred while loading your resumes.",
// //           variant: "destructive",
// //         })
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     fetchResumes()
// //   }, [router])

// //   const handleDeleteResume = async (id: string) => {
// //     setIsDeleting(id)

// //     try {
// //       const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
// //         method: "DELETE",
// //         credentials: "include",
// //       })

// //       if (response.ok) {
// //         setResumes(resumes.filter((resume) => resume.id !== id))
// //         toast({
// //           title: "Resume deleted",
// //           description: "Your resume has been deleted successfully.",
// //         })
// //       } else {
// //         const errorData = await response.json()
// //         toast({
// //           title: "Delete failed",
// //           description: errorData.message || "Failed to delete resume. Please try again.",
// //           variant: "destructive",
// //         })
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "An error occurred while deleting your resume.",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setIsDeleting(null)
// //     }
// //   }

// //   const handleDownloadResume = async (id: string) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/resume/${id}/download`, {
// //         credentials: "include",
// //       })

// //       if (response.ok) {
// //         // Create a blob from the PDF data
// //         const blob = await response.blob()

// //         // Create a link element and trigger download
// //         const url = window.URL.createObjectURL(blob)
// //         const a = document.createElement("a")
// //         a.href = url
// //         a.download = `resume-${Date.now()}.pdf`
// //         document.body.appendChild(a)
// //         a.click()

// //         // Clean up
// //         window.URL.revokeObjectURL(url)
// //         document.body.removeChild(a)
// //       } else {
// //         const errorData = await response.json()
// //         toast({
// //           title: "Download failed",
// //           description: errorData.message || "Failed to download resume. Please try again.",
// //           variant: "destructive",
// //         })
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "An error occurred while downloading your resume.",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p>Loading your resumes...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto py-12 px-6">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold">My Resumes</h1>
// //         <Link href="/templates">
// //           <Button className="gap-2">
// //             <Plus size={16} />
// //             Create New Resume
// //           </Button>
// //         </Link>
// //       </div>

// //       {resumes.length === 0 ? (
// //         <Card className="p-12 text-center">
// //           <FileText size={48} className="mx-auto text-gray-300 mb-4" />
// //           <h2 className="text-xl font-semibold mb-2">No Resumes Yet</h2>
// //           <p className="text-gray-500 mb-6">
// //             You haven&apos;t created any resumes yet. Get started by creating your first resume.
// //           </p>
// //           <Link href="/templates">
// //             <Button>Create Your First Resume</Button>
// //           </Link>
// //         </Card>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {resumes.map((resume) => (
// //             <Card key={resume.id} className="overflow-hidden">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div className="bg-primary/10 p-2 rounded">
// //                     <FileText className="h-6 w-6 text-primary" />
// //                   </div>
// //                   <span className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleDateString()}</span>
// //                 </div>
// //                 <h3 className="font-semibold text-lg mb-1">Resume</h3>
// //                 <p className="text-sm text-gray-500 mb-4">Template: {resume.templateName}</p>
// //                 <div className="flex space-x-2">
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="flex-1"
// //                     onClick={() => router.push(`/resume-preview?id=${resume.id}`)}
// //                   >
// //                     <FileText className="h-4 w-4 mr-1" /> View
// //                   </Button>
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="flex-1"
// //                     onClick={() => router.push(`/edit-resume?id=${resume.id}`)}
// //                   >
// //                     <Edit className="h-4 w-4 mr-1" /> Edit
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //               <CardFooter className="bg-gray-50 p-4 flex justify-between">
// //                 <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
// //                   <Download className="h-4 w-4 mr-1" /> Download
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   size="sm"
// //                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
// //                   onClick={() => handleDeleteResume(resume.id)}
// //                   disabled={isDeleting === resume.id}
// //                 >
// //                   {isDeleting === resume.id ? (
// //                     <Loader2 className="h-4 w-4 animate-spin" />
// //                   ) : (
// //                     <Trash2 className="h-4 w-4" />
// //                   )}
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }






// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { toast } from "@/components/ui/use-toast"
// import { Plus, FileText, Edit, Download, Trash2, Loader2, Mic, FileEdit } from "lucide-react"

// interface Resume {
//   id: string
//   templateName: string
//   createdAt: string
//   updatedAt: string
// }

// export default function DashboardPage() {
//   const router = useRouter()
//   const [resumes, setResumes] = useState<Resume[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDeleting, setIsDeleting] = useState<string | null>(null)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

//   useEffect(() => {
//     // Check if user is authenticated and fetch resumes
//     const fetchResumes = async () => {
//       try {
//         const authResponse = await fetch("http://localhost:5000/api/check-auth", {
//           credentials: "include",
//         })

//         if (!authResponse.ok) {
//           router.push("/login")
//           return
//         }

//         const resumesResponse = await fetch("http://localhost:5000/api/resumes", {
//           credentials: "include",
//         })

//         if (resumesResponse.ok) {
//           const data = await resumesResponse.json()
//           setResumes(data.resumes)
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to load your resumes. Please try again.",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "An error occurred while loading your resumes.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchResumes()
//   }, [router])

//   const handleEditClick = (resumeId: string) => {
//     setSelectedResumeId(resumeId)
//     setShowEditModal(true)
//   }

//   const handleManualEdit = () => {
//     setShowEditModal(false)
//     if (selectedResumeId) {
//       router.push(`/edit-resume?id=${selectedResumeId}`)
//     }
//     setSelectedResumeId(null)
//   }

//   const handleAudioEdit = () => {
//     setShowEditModal(false)
//     if (selectedResumeId) {
//       router.push(`/audio-edit?id=${selectedResumeId}`)
//     }
//     setSelectedResumeId(null)
//   }

//   const handleDeleteResume = async (id: string) => {
//     setIsDeleting(id)
//     try {
//       const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       })

//       if (response.ok) {
//         setResumes(resumes.filter((resume) => resume.id !== id))
//         toast({
//           title: "Resume deleted",
//           description: "Your resume has been deleted successfully.",
//         })
//       } else {
//         const errorData = await response.json()
//         toast({
//           title: "Delete failed",
//           description: errorData.message || "Failed to delete resume. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while deleting your resume.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(null)
//     }
//   }

//   const handleDownloadResume = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/resume/${id}/download`, {
//         credentials: "include",
//       })

//       if (response.ok) {
//         // Create a blob from the PDF data
//         const blob = await response.blob()
//         // Create a link element and trigger download
//         const url = window.URL.createObjectURL(blob)
//         const a = document.createElement("a")
//         a.href = url
//         a.download = `resume-${Date.now()}.pdf`
//         document.body.appendChild(a)
//         a.click()
//         // Clean up
//         window.URL.revokeObjectURL(url)
//         document.body.removeChild(a)
//       } else {
//         const errorData = await response.json()
//         toast({
//           title: "Download failed",
//           description: errorData.message || "Failed to download resume. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while downloading your resume.",
//         variant: "destructive",
//       })
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p>Loading your resumes...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">My Resumes</h1>
//         <Link href="/templates">
//           <Button className="gap-2">
//             <Plus size={16} />
//             Create New Resume
//           </Button>
//         </Link>
//       </div>

//       {resumes.length === 0 ? (
//         <Card className="p-12 text-center">
//           <FileText size={48} className="mx-auto text-gray-300 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">No Resumes Yet</h2>
//           <p className="text-gray-500 mb-6">
//             You haven&apos;t created any resumes yet. Get started by creating your first resume.
//           </p>
//           <Link href="/templates">
//             <Button>Create Your First Resume</Button>
//           </Link>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {resumes.map((resume) => (
//             <Card key={resume.id} className="overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="bg-primary/10 p-2 rounded">
//                     <FileText className="h-6 w-6 text-primary" />
//                   </div>
//                   <span className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleDateString()}</span>
//                 </div>
//                 <h3 className="font-semibold text-lg mb-1">Resume</h3>
//                 <p className="text-sm text-gray-500 mb-4">Template: {resume.templateName}</p>
//                 <div className="flex space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 bg-transparent"
//                     onClick={() => router.push(`/resume-preview?id=${resume.id}`)}
//                   >
//                     <FileText className="h-4 w-4 mr-1" /> View
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 bg-transparent"
//                     onClick={() => handleEditClick(resume.id)}
//                   >
//                     <Edit className="h-4 w-4 mr-1" /> Edit
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter className="bg-gray-50 p-4 flex justify-between">
//                 <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
//                   <Download className="h-4 w-4 mr-1" /> Download
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                   onClick={() => handleDeleteResume(resume.id)}
//                   disabled={isDeleting === resume.id}
//                 >
//                   {isDeleting === resume.id ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Trash2 className="h-4 w-4" />
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Edit Options Modal */}
//       <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-center text-xl font-semibold">Choose Edit Method</DialogTitle>
//             <DialogDescription className="text-center text-gray-600">
//               How would you like to edit your resume?
//             </DialogDescription>
//           </DialogHeader>

//           <div className="flex flex-col gap-4 py-4">
//             <Button
//               onClick={handleManualEdit}
//               className="flex items-center justify-center gap-3 h-16 text-base bg-transparent"
//               variant="outline"
//             >
//               <FileEdit className="h-6 w-6" />
//               <div className="text-left">
//                 <div className="font-medium">Edit Manually</div>
//                 <div className="text-sm text-gray-500">Use forms and text fields</div>
//               </div>
//             </Button>

//             <Button onClick={handleAudioEdit} className="flex items-center justify-center gap-3 h-16 text-base">
//               <Mic className="h-6 w-6" />
//               <div className="text-left">
//                 <div className="font-medium">Edit Through Audio</div>
//                 <div className="text-sm text-gray-100">Speak your changes naturally</div>
//               </div>
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



// // "use client"

// // import { useState, useEffect } from "react"
// // import Link from "next/link"
// // import { useRouter } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardFooter } from "@/components/ui/card"
// // import { toast } from "@/components/ui/use-toast"
// // import { Plus, FileText, Edit, Download, Trash2, Loader2 } from "lucide-react"

// // interface Resume {
// //   id: string
// //   templateName: string
// //   createdAt: string
// //   updatedAt: string
// // }

// // export default function DashboardPage() {
// //   const router = useRouter()
// //   const [resumes, setResumes] = useState<Resume[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDeleting, setIsDeleting] = useState<string | null>(null)

// //   useEffect(() => {
// //     const fetchResumes = async () => {
// //       try {
// //         const resumesResponse = await fetch("http://localhost:5000/api/resumes", {
// //           credentials: "include",
// //         })

// //         if (resumesResponse.ok) {
// //           const data = await resumesResponse.json()
// //           setResumes(data.resumes)
// //         } else {
// //           toast({
// //             title: "Error",
// //             description: "Failed to load your resumes. Please try again.",
// //             variant: "destructive",
// //           })
// //         }
// //       } catch (error) {
// //         toast({
// //           title: "Error",
// //           description: "An error occurred while loading your resumes.",
// //           variant: "destructive",
// //         })
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     fetchResumes()
// //   }, [router])

// //   const handleDeleteResume = async (id: string) => {
// //     setIsDeleting(id)

// //     try {
// //       const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
// //         method: "DELETE",
// //         credentials: "include",
// //       })

// //       if (response.ok) {
// //         setResumes(resumes.filter((resume) => resume.id !== id))
// //         toast({
// //           title: "Resume deleted",
// //           description: "Your resume has been deleted successfully.",
// //         })
// //       } else {
// //         const errorData = await response.json()
// //         toast({
// //           title: "Delete failed",
// //           description: errorData.message || "Failed to delete resume. Please try again.",
// //           variant: "destructive",
// //         })
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "An error occurred while deleting your resume.",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setIsDeleting(null)
// //     }
// //   }

// //   const handleDownloadResume = async (id: string) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/resume/${id}/download`, {
// //         credentials: "include",
// //       })

// //       if (response.ok) {
// //         const blob = await response.blob()
// //         const url = window.URL.createObjectURL(blob)
// //         const a = document.createElement("a")
// //         a.href = url
// //         a.download = `resume-${Date.now()}.pdf`
// //         document.body.appendChild(a)
// //         a.click()

// //         window.URL.revokeObjectURL(url)
// //         document.body.removeChild(a)
// //       } else {
// //         const errorData = await response.json()
// //         toast({
// //           title: "Download failed",
// //           description: errorData.message || "Failed to download resume. Please try again.",
// //           variant: "destructive",
// //         })
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "An error occurred while downloading your resume.",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p>Loading your resumes...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto py-12 px-6">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold">My Resumes</h1>
// //         <Link href="/templates">
// //           <Button className="gap-2">
// //             <Plus size={16} />
// //             Create New Resume
// //           </Button>
// //         </Link>
// //       </div>

// //       {resumes.length === 0 ? (
// //         <Card className="p-12 text-center">
// //           <FileText size={48} className="mx-auto text-gray-300 mb-4" />
// //           <h2 className="text-xl font-semibold mb-2">No Resumes Yet</h2>
// //           <p className="text-gray-500 mb-6">
// //             You haven&apos;t created any resumes yet. Get started by creating your first resume.
// //           </p>
// //           <Link href="/templates">
// //             <Button>Create Your First Resume</Button>
// //           </Link>
// //         </Card>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {resumes.map((resume) => (
// //             <Card key={resume.id} className="overflow-hidden">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div className="bg-primary/10 p-2 rounded">
// //                     <FileText className="h-6 w-6 text-primary" />
// //                   </div>
// //                   <span className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleDateString()}</span>
// //                 </div>
// //                 <h3 className="font-semibold text-lg mb-1">Resume</h3>
// //                 <p className="text-sm text-gray-500 mb-4">Template: {resume.templateName}</p>
// //                 <div className="flex space-x-2">
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="flex-1"
// //                     onClick={() => router.push(`/resume-preview?id=${resume.id}`)}
// //                   >
// //                     <FileText className="h-4 w-4 mr-1" /> View
// //                   </Button>
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="flex-1"
// //                     onClick={() => router.push(`/edit-resume?id=${resume.id}`)}
// //                   >
// //                     <Edit className="h-4 w-4 mr-1" /> Edit
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //               <CardFooter className="bg-gray-50 p-4 flex justify-between">
// //                 <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
// //                   <Download className="h-4 w-4 mr-1" /> Download
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   size="sm"
// //                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
// //                   onClick={() => handleDeleteResume(resume.id)}
// //                   disabled={isDeleting === resume.id}
// //                 >
// //                   {isDeleting === resume.id ? (
// //                     <Loader2 className="h-4 w-4 animate-spin" />
// //                   ) : (
// //                     <Trash2 className="h-4 w-4" />
// //                   )}
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }








// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { toast } from "@/components/ui/use-toast"
// import { Plus, FileText, Edit, Download, Trash2, Loader2, Mic, FileEdit } from "lucide-react"

// interface Resume {
//   id: string
//   templateId: string // Now stores full template ID like "p1", "c2"
//   templateName: string
//   templateCategory: string
//   createdAt: string
//   updatedAt: string
// }

// export default function DashboardPage() {
//   const router = useRouter()
//   const [resumes, setResumes] = useState<Resume[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDeleting, setIsDeleting] = useState<string | null>(null)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

//   useEffect(() => {
//     // Check if user is authenticated and fetch resumes
//     const fetchResumes = async () => {
//       try {
//         const authResponse = await fetch("http://localhost:5000/api/check-auth", {
//           credentials: "include",
//         })

//         if (!authResponse.ok) {
//           router.push("/login")
//           return
//         }

//         const resumesResponse = await fetch("http://localhost:5000/api/resumes", {
//           credentials: "include",
//         })

//         if (resumesResponse.ok) {
//           const data = await resumesResponse.json()
//           setResumes(data.resumes)
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to load your resumes. Please try again.",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "An error occurred while loading your resumes.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchResumes()
//   }, [router])

//   const handleEditClick = (resumeId: string) => {
//     setSelectedResumeId(resumeId)
//     setShowEditModal(true)
//   }

//   const handleManualEdit = () => {
//     setShowEditModal(false)
//     if (selectedResumeId) {
//       router.push(`/edit-resume?id=${selectedResumeId}`)
//     }
//     setSelectedResumeId(null)
//   }

//   const handleAudioEdit = () => {
//     setShowEditModal(false)
//     if (selectedResumeId) {
//       router.push(`/audio-edit?id=${selectedResumeId}`)
//     }
//     setSelectedResumeId(null)
//   }

//   const handleDeleteResume = async (id: string) => {
//     setIsDeleting(id)
//     try {
//       const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       })

//       if (response.ok) {
//         setResumes(resumes.filter((resume) => resume.id !== id))
//         toast({
//           title: "Resume deleted",
//           description: "Your resume has been deleted successfully.",
//         })
//       } else {
//         const errorData = await response.json()
//         toast({
//           title: "Delete failed",
//           description: errorData.message || "Failed to delete resume. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while deleting your resume.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(null)
//     }
//   }

//   const handleDownloadResume = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/resume/${id}/download`, {
//         credentials: "include",
//       })

//       if (response.ok) {
//         // Create a blob from the PDF data
//         const blob = await response.blob()
//         // Create a link element and trigger download
//         const url = window.URL.createObjectURL(blob)
//         const a = document.createElement("a")
//         a.href = url
//         a.download = `resume-${Date.now()}.pdf`
//         document.body.appendChild(a)
//         a.click()
//         // Clean up
//         window.URL.revokeObjectURL(url)
//         document.body.removeChild(a)
//       } else {
//         const errorData = await response.json()
//         toast({
//           title: "Download failed",
//           description: errorData.message || "Failed to download resume. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while downloading your resume.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleViewResume = (resume: Resume) => {
//     // Extract category from template ID for navigation
//     const categoryMap: Record<string, string> = {
//       p: "1", // Professional
//       c: "2", // Creative
//       m: "3", // Minimal
//       e: "4", // Executive
//     }

//     const templateType = resume.templateId.charAt(0).toLowerCase()
//     const categoryId = categoryMap[templateType] || "1"

//     router.push(`/resume-preview?id=${resume.id}&template=${resume.templateId}&category=${categoryId}`)
//   }

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p>Loading your resumes...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">My Resumes</h1>
//         <Link href="/templates">
//           <Button className="gap-2">
//             <Plus size={16} />
//             Create New Resume
//           </Button>
//         </Link>
//       </div>

//       {resumes.length === 0 ? (
//         <Card className="p-12 text-center">
//           <FileText size={48} className="mx-auto text-gray-300 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">No Resumes Yet</h2>
//           <p className="text-gray-500 mb-6">
//             You haven&apos;t created any resumes yet. Get started by creating your first resume.
//           </p>
//           <Link href="/templates">
//             <Button>Create Your First Resume</Button>
//           </Link>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {resumes.map((resume) => (
//             <Card key={resume.id} className="overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="bg-primary/10 p-2 rounded">
//                     <FileText className="h-6 w-6 text-primary" />
//                   </div>
//                   <span className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleDateString()}</span>
//                 </div>
//                 <h3 className="font-semibold text-lg mb-1">{resume.templateName}</h3>
//                 <p className="text-sm text-gray-500 mb-4">
//                   {resume.templateCategory} • Template {resume.templateId.toUpperCase()}
//                 </p>
//                 <div className="flex space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 bg-transparent"
//                     onClick={() => handleViewResume(resume)}
//                   >
//                     <FileText className="h-4 w-4 mr-1" /> View
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 bg-transparent"
//                     onClick={() => handleEditClick(resume.id)}
//                   >
//                     <Edit className="h-4 w-4 mr-1" /> Edit
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter className="bg-gray-50 p-4 flex justify-between">
//                 <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
//                   <Download className="h-4 w-4 mr-1" /> Download
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                   onClick={() => handleDeleteResume(resume.id)}
//                   disabled={isDeleting === resume.id}
//                 >
//                   {isDeleting === resume.id ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Trash2 className="h-4 w-4" />
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Edit Options Modal */}
//       <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-center text-xl font-semibold">Choose Edit Method</DialogTitle>
//             <DialogDescription className="text-center text-gray-600">
//               How would you like to edit your resume?
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col gap-4 py-4">
//             <Button
//               onClick={handleManualEdit}
//               className="flex items-center justify-center gap-3 h-16 text-base bg-transparent"
//               variant="outline"
//             >
//               <FileEdit className="h-6 w-6" />
//               <div className="text-left">
//                 <div className="font-medium">Edit Manually</div>
//                 <div className="text-sm text-gray-500">Use forms and text fields</div>
//               </div>
//             </Button>
//             <Button onClick={handleAudioEdit} className="flex items-center justify-center gap-3 h-16 text-base">
//               <Mic className="h-6 w-6" />
//               <div className="text-left">
//                 <div className="font-medium">Edit Through Audio</div>
//                 <div className="text-sm text-gray-100">Speak your changes naturally</div>
//               </div>
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }






"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Plus, FileText, Edit, Download, Trash2, Loader2, Mic, FileEdit } from "lucide-react"

interface Resume {
  id: string
  templateId: string // Now stores full template ID like "p1", "c2"
  templateName: string
  templateCategory: string
  createdAt: string
  updatedAt: string
}

const translations = {
  en: {
    title: "My Resumes",
    createNew: "Create New Resume",
    noResumesTitle: "No Resumes Yet",
    noResumesDesc: "You haven't created any resumes yet. Get started by creating your first resume.",
    createFirst: "Create Your First Resume",
    view: "View",
    edit: "Edit",
    download: "Download",
    loading: "Loading your resumes...",
    editMethodTitle: "Choose Edit Method",
    editMethodDesc: "How would you like to edit your resume?",
    editManual: "Edit Manually",
    editManualDesc: "Use forms and text fields",
    editAudio: "Edit Through Audio",
    editAudioDesc: "Speak your changes naturally",
    resumeDeleted: "Resume deleted",
    resumeDeletedDesc: "Your resume has been deleted successfully.",
    deleteFailed: "Delete failed",
    deleteFailedDesc: "Failed to delete resume. Please try again.",
    downloadFailed: "Download failed",
    downloadFailedDesc: "Failed to download resume. Please try again.",
    error: "Error",
    errorDesc: "An error occurred while loading your resumes.",
    deleteErrorDesc: "An error occurred while deleting your resume.",
    downloadErrorDesc: "An error occurred while downloading your resume.",
    playAudio: "Play Audio Instructions",
    stopAudio: "Stop Audio",
    audioText:
      "Welcome to your resume dashboard. Here you can view, edit, download, and delete your resumes. Click on any resume to get started.",
    template: "Template",
  },
  hi: {
    title: "मेरे रिज्यूमे",
    createNew: "नया रिज्यूमे बनाएं",
    noResumesTitle: "अभी तक कोई रिज्यूमे नहीं",
    noResumesDesc: "आपने अभी तक कोई रिज्यूमे नहीं बनाया है। अपना पहला रिज्यूमे बनाकर शुरुआत करें।",
    createFirst: "अपना पहला रिज्यूमे बनाएं",
    view: "देखें",
    edit: "संपादित करें",
    download: "डाउनलोड करें",
    loading: "आपके रिज्यूमे लोड हो रहे हैं...",
    editMethodTitle: "संपादन विधि चुनें",
    editMethodDesc: "आप अपना रिज्यूमे कैसे संपादित करना चाहते हैं?",
    editManual: "मैन्युअल रूप से संपादित करें",
    editManualDesc: "फॉर्म और टेक्स्ट फील्ड का उपयोग करें",
    editAudio: "ऑडियो के माध्यम से संपादित करें",
    editAudioDesc: "अपने बदलाव प्राकृतिक रूप से बोलें",
    resumeDeleted: "रिज्यूमे हटा दिया गया",
    resumeDeletedDesc: "आपका रिज्यूमे सफलतापूर्वक हटा दिया गया है।",
    deleteFailed: "हटाना असफल",
    deleteFailedDesc: "रिज्यूमे हटाने में असफल। कृपया पुनः प्रयास करें।",
    downloadFailed: "डाउनलोड असफल",
    downloadFailedDesc: "रिज्यूमे डाउनलोड करने में असफल। कृपया पुनः प्रयास करें।",
    error: "त्रुटि",
    errorDesc: "आपके रिज्यूमे लोड करते समय एक त्रुटि हुई।",
    deleteErrorDesc: "आपका रिज्यूमे हटाते समय एक त्रुटि हुई।",
    downloadErrorDesc: "आपका रिज्यूमे डाउनलोड करते समय एक त्रुटि हुई।",
    playAudio: "ऑडियो निर्देश चलाएं",
    stopAudio: "ऑडियो बंद करें",
    audioText:
      "आपके रिज्यूमे डैशबोर्ड में आपका स्वागत है। यहां आप अपने रिज्यूमे देख सकते हैं, संपादित कर सकते हैं, डाउनलोड कर सकते हैं और हटा सकते हैं। शुरू करने के लिए किसी भी रिज्यूमे पर क्लिक करें।",
    template: "टेम्प्लेट",
  },
  bn: {
    title: "আমার রিজিউমে",
    createNew: "নতুন রিজিউমে তৈরি করুন",
    noResumesTitle: "এখনও কোনো রিজিউমে নেই",
    noResumesDesc: "আপনি এখনও কোনো রিজিউমে তৈরি করেননি। আপনার প্রথম রিজিউমে তৈরি করে শুরু করুন।",
    createFirst: "আপনার প্রথম রিজিউমে তৈরি করুন",
    view: "দেখুন",
    edit: "সম্পাদনা করুন",
    download: "ডাউনলোড করুন",
    loading: "আপনার রিজিউমে লোড হচ্ছে...",
    editMethodTitle: "সম্পাদনা পদ্ধতি বেছে নিন",
    editMethodDesc: "আপনি কীভাবে আপনার রিজিউমে সম্পাদনা করতে চান?",
    editManual: "ম্যানুয়ালি সম্পাদনা করুন",
    editManualDesc: "ফর্ম এবং টেক্স্ট ফিল্ড ব্যবহার করুন",
    editAudio: "অডিয়োর মাধ্যমে সম্পাদনা করুন",
    editAudioDesc: "আপনার পরিবর্তনগুলি প্রাকৃতিকভাবে বলুন",
    resumeDeleted: "রিজিউমে মুছে ফেলা হয়েছে",
    resumeDeletedDesc: "আপনার রিঝ্যূমে সফলভাবে মুছে ফেলা হয়েছে।",
    deleteFailed: "মুছে ফেলা ব্যর্থ",
    deleteFailedDesc: "রিঝ্যূমে মুছে ফেলতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",
    downloadFailed: "ডাউনলোড ব্যর্থ",
    downloadFailedDesc: "রিঝ্যূমে ডাউনলোড করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",
    error: "ত্রুটি",
    errorDesc: "আপনার রিঝ্যূমে লোড করার সময় একটি ত্রুটি ঘটেছে।",
    deleteErrorDesc: "আপনার রিঝ্যূমে মুছে ফেলার সময় একটি ত্রুটি ঘটেছে।",
    downloadErrorDesc: "আপনার রিঝ্যূমে ডাউনলোড করার সময় একটি ত্রুটি ঘটেছে।",
    playAudio: "অডিয়ো নির্দেশাবলী চালান",
    stopAudio: "অডিয়ো বন্ধ করুন",
    audioText:
      "আপনার রিঝ্যূমে ড্যাশবোর্ডে স্বাগতম। এখানে আপনি আপনার রিঝ্যূমে দেখতে, সম্পাদনা করতে, ডাউনলোড করতে এবং মুছে ফেলতে পারেন। শুরু করতে যেকোনো রিঝ্যূমেতে ক্লিক করুন।",
    template: "টেমপ্লেট",
  },
  te: {
    title: "నా రెజ్యూమేలు",
    createNew: "కొత్త రెజ్యూమే సృష్టించండి",
    noResumesTitle: "ఇంకా రెజ్యూమేలు లేవు",
    noResumesDesc: "நீங்கள் இன்னும் எந்த ரெஜ్యూம்களும் உருவாக்கவில்லை. உங்கள் முதல் ரெஜ్యூமை உருவாக்கி தொடங்குங்கள்.",
    createFirst: "உங்கள் முதல் ரெஜ్యூமை உருவாக்குங்கள்",
    view: "பார்க்கவும்",
    edit: "திருத்தவும்",
    download: "பதிவிறக்கவும்",
    loading: "உங்கள் ரெஸ்யூம்கள் ஏற்றப்படுகின்றன...",
    editMethodTitle: "திருத்தும் முறையை தேர்ந்தெடுக்கவும்",
    editMethodDesc: "நீங்கள் உங்கள் ரெஸ்யூமை எப்படி திருத்த விரும்புகிறீர்கள்?",
    editManual: "கைமுறையாக திருத்தவும்",
    editManualDesc: "படிவங்கள் மற்றும் உரை புலங்களைப் பயன்படுத்தவும்",
    editAudio: "ஆடியோ மூலக திருத்தவும்",
    editAudioDesc: "உங்கள் மாற்றங்களை இயல்பாக பேசுங்கள்",
    resumeDeleted: "ரெஸ்யூம் நீக்கப்பட்டது",
    resumeDeletedDesc: "உங்கள் ரெஸ்யூம் யಶஸ்வியாக நீக்கப்பட்டது.",
    deleteFailed: "நீக்குதல் தோல்வியடைந்தது",
    deleteFailedDesc: "ரெஸ்யூமை நீக்குவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    downloadFailed: "பதிவிறக்கம் தோல்வியடைந்தது",
    downloadFailedDesc: "ரெஸ்யூமை பதிவிறக்குவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    error: "பிழை",
    errorDesc: "உங்கள் ரெஸ்யூம்களை ஏற்றும்போது பிழை ஏற்பட்டது.",
    deleteErrorDesc: "உங்கள் ரெஸ்யூமை நீக்குவதில் பிழை ஏற்பட்டது.",
    downloadErrorDesc: "உங்கள் ரெஸ்யூமை பதிவிறக்குவதில் பிழை ஏற்பட்டது.",
    playAudio: "ஆடியோ வழிமுறைகளை இயக்கவும்",
    stopAudio: "ஆடியோ நிறுத்தவும்",
    audioText:
      "உங்கள் ரெஸ்யூம் டாஷ்போர்டுக்கு வரவேற்கிறோம். இங்கே நீங்கள் உங்கள் ரெஸ்யூம்களைப் பார்க்கலாம், திருத்தலாம், பதிவிறக்கலாம் மற்றும் நீக்கலாம். தொடங்க எந்த ரெஸ்யூமிலும் கிளிக் மாடி.",
    template: "டெம்ப்ளேட்",
  },
  mr: {
    title: "माझे रिझ्यूमे",
    createNew: "नवीन रिझ्यूमे तयार करा",
    noResumesTitle: "अजून रिझ्यूमे नाहीत",
    noResumesDesc: "तुम्ही अजून कोणतेही रिझ्यूमे तयार केलेले नाही. तुमचे पहिले रिझ्यूमे तयार करून सुरुवात करा.",
    createFirst: "तुमचे पहिले रिझ्यूमे तयार करा",
    view: "पहा",
    edit: "संपादित करा",
    download: "डाउनलोड करा",
    loading: "तुमचे रिझ्यूमे लोड होत आहेत...",
    editMethodTitle: "संपादन पद्धत निवडा",
    editMethodDesc: "तुम्ही तुमचे रिझ्यूमे कसे संपादित करू इच्छिता?",
    editManual: "मॅन्युअल संपादित करा",
    editManualDesc: "फॉर्म आणि टेक्स्ट फील्ड वापरा",
    editAudio: "ऑडियोद्वारे संपादित करा",
    editAudioDesc: "तुमचे बदल नैसर्गिकपणे बोला",
    resumeDeleted: "रिझ्यूमे हटवले",
    resumeDeletedDesc: "तुमचे रिझ्यूमे यशस्वीरित्या हटवले गेले आहे.",
    deleteFailed: "हटवणे अयशस्वी",
    deleteFailedDesc: "रिझ्यूमे हटवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    downloadFailed: "डाउनलोड अयशस्वी",
    downloadFailedDesc: "रिझ्यूमे डाउनलोड करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    error: "त्रुटी",
    errorDesc: "तुमचे रिझ्यूमे लोड करताना त्रुटी आली.",
    deleteErrorDesc: "तुमचे रिझ्यूमे हटवताना त्रुटी आली.",
    downloadErrorDesc: "तुमचे रिझ्यूमे डाउनलोड करताना त्रुटी आली.",
    playAudio: "ऑडियो सूचना प्ले करा",
    stopAudio: "ऑडियो थांबवा",
    audioText:
      "तुमच्या रिझ्यूमे डॅशबोर्डवर स्वागत आहे. येथे तुम्ही तुमचे रिझ्यूमे पाहू शकता, संपादित करू शकता, डाउनलोड करू शकता आणि हटवू शकता. सुरुवात करण्यासाठी कोणत्याही रिझ्यूमेवर क्लिक करा.",
    template: "टेम्प्लेट",
  },
  ta: {
    title: "என் ரெஸ்யூம்கள்",
    createNew: "புதிய ரெஸ்யூம் உருவாக்கவும்",
    noResumesTitle: "இன்னும் ரெஸ்யூம்கள் இல்லை",
    noResumesDesc: "நீங்கள் இன்னும் எந்த ரெஸ்யூம்களும் உருவாக்கவில்லை. உங்கள் முதல் ரெஸ்யூமை உருவாக்கி தொடங்குங்கள்.",
    createFirst: "உங்கள் முதல் ரெஸ்யூமை உருவாக்குங்கள்",
    view: "பார்க்கவும்",
    edit: "திருத்தவும்",
    download: "பதிவிறக்கவும்",
    loading: "உங்கள் ரெஸ்யூம்கள் ஏற்றப்படுகின்றன...",
    editMethodTitle: "திருத்தும் முறையை தேர்ந்தெடுக்கவும்",
    editMethodDesc: "நீங்கள் உங்கள் ரெஸ்யூமை எப்படி திருத்த விரும்புகிறீர்கள்?",
    editManual: "கைமுறையாக திருத்தவும்",
    editManualDesc: "படிவங்கள் மற்றும் உரை புலங்களைப் பயன்படுத்தவும்",
    editAudio: "ஆடியோ மூலக திருத்தவும்",
    editAudioDesc: "உங்கள் மாற்றங்களை இயல்பாக பேசுங்கள்",
    resumeDeleted: "ரெஸ்யூம் நீக்கப்பட்டது",
    resumeDeletedDesc: "உங்கள் ரெஸ்யூம் யಶஸ்வியாக நீக்கப்பட்டது.",
    deleteFailed: "நீக்குதல் தோல்வியடைந்தது",
    deleteFailedDesc: "ரெஸ்யூமை நீக்குவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    downloadFailed: "பதிவிறக்கம் தோல்வியடைந்தது",
    downloadFailedDesc: "ரெஸ்யூமை பதிவிறக்குவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    error: "பிழை",
    errorDesc: "உங்கள் ரெஸ்யூம்களை ஏற்றும்போது பிழை ஏற்பட்டது.",
    deleteErrorDesc: "உங்கள் ரெஸ்யூமை நீக்குவதில் பிழை ஏற்பட்டது.",
    downloadErrorDesc: "உங்கள் ரெஸ்யூமை பதிவிறக்குவதில் பிழை ஏற்பட்டது.",
    playAudio: "ஆடியோ வழிமுறைகளை இயக்கவும்",
    stopAudio: "ஆடியோ நிறுத்தவும்",
    audioText:
      "உங்கள் ரெஸ்யூம் டாஷ்போர்டுக்கு வரவேற்கிறோம். இங்கே நீங்கள் உங்கள் ரெஸ்யூம்களைப் பார்க்கலாம், திருத்தலாம், பதிவிறக்கலாம் மற்றும் நீக்கலாம். தொடங்க எந்த ரெஸ்யூமிலும் கிளிக் மாடி.",
    template: "டெம்ப்ளேட்",
  },
  gu: {
    title: "મારા રિઝ્યૂમે",
    createNew: "નવો રિઝ્યૂમે બનાવો",
    noResumesTitle: "હજુ સુધી કોઈ રિઝ્યૂમે નથી",
    noResumesDesc: "તમે હજુ સુધી કોઈ રિઝ્યૂમે બનાવ્યો નથી. તમારો પહેલો રિઝ્યૂમે બનાવીને શરૂઆત કરો.",
    createFirst: "તમારો પહેલો રિઝ્યૂમે બનાવો",
    view: "જુઓ",
    edit: "સંપાદિત કરો",
    download: "ડાઉનલોડ કરો",
    loading: "તમારા રિઝ્યૂમે લોડ થઈ રહ્યા છે...",
    editMethodTitle: "સંપાદન પદ્ધતિ પસંદ કરો",
    editMethodDesc: "તમે તમારો રિઝ્યૂમે કેવી રીતે સંપાદિત કરવા માંગો છો?",
    editManual: "મેન્યુઅલ સંપાદિત કરો",
    editManualDesc: "ફોર્મ અને ટેક્સ્ટ ફીલ્ડનો ઉપયોગ કરો",
    editAudio: "ઑડિયો દ્વારા સંપાદિત કરો",
    editAudioDesc: "તમારા ફેરફારો કુદરતી રીતે બોલો",
    resumeDeleted: "રિઝ્યૂમે કાઢી નાખ્યો",
    resumeDeletedDesc: "તમારો રિઝ્યૂમે સફળતાપૂર્વક કાઢી નાખવામાં આવ્યો છે.",
    deleteFailed: "કાઢી નાખવું નિષ્ફળ",
    deleteFailedDesc: "રિઝ્યૂમે કાઢી નાખવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.",
    downloadFailed: "ડાઉનલોડ નિષ્ફળ",
    downloadFailedDesc: "રિઝ્યૂમે ડાઉનલોડ કરવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.",
    error: "ત્રુટિ",
    errorDesc: "તમારા રિઝ્યૂમે લોડ કરતી વખતે ત્રુટિ આવી.",
    deleteErrorDesc: "તમારા રિઝ્યૂમે કાઢી નાખતી વખતે ત્રુટિ આવી.",
    downloadErrorDesc: "તમારા રિઝ્યૂમે ડાઉનલોડ કરતી વખતે ત્રુટિ આવી.",
    playAudio: "ઑડિયો સૂચનાઓ ચલાવો",
    stopAudio: "ઑડિયો બંધ કરો",
    audioText:
      "તમારા રિઝ્યૂમે ડેશબોર્ડમાં આપનું સ્વાગત છે. ઇવિટે તમે તમારા રિઝ્યૂમે જોઈ શકો છો, સંપાદિત કરી શકો છો, ડાઉનલોડ કરી શકો છો અને કાઢી નાખી શકો છો. શરૂ કરવા માટે કોઈપણ રિઝ્યૂમે પર ક્લિક કરો.",
    template: "ટેમ્પ્લેટ",
  },
  kn: {
    title: "ನನ್ನ ರೆಸ್ಯೂಮೆಗಳು",
    createNew: "ಹೊಸ ರೆಸ್ಯೂಮೆ ರಚಿಸಿ",
    noResumesTitle: "ಇನ್ನೂ ರೆಸ್ಯೂಮೆಗಳಿಲ್ಲ",
    noResumesDesc: "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ರೆಸ್ಯೂಮೆಗಳನ್ನು ರಚಿಸಿಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ರೆಸ್ಯೂಮೆ ರಚಿಸುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ.",
    createFirst: "ನಿಮ್ಮ ಮೊದಲ ರೆಸ್ಯೂಮೆ ರಚಿಸಿ",
    view: "ವೀಕ್ಷಿಸಿ",
    edit: "ಸಂಪಾದಿಸಿ",
    download: "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    loading: "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    editMethodTitle: "ಸಂಪಾದನೆ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    editMethodDesc: "ನೀವು ನಿಮ್ಮ ರೆಸ್ಯೂಮೆಯನ್ನು ಹೇಗೆ ಸಂಪಾದಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    editManual: "ಹಸ್ತಚಾಲಿತವಾಗಿ ಸಂಪಾದಿಸಿ",
    editManualDesc: "ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ಪಠ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಬಳಸಿ",
    editAudio: "ಆಡಿಯೋ ಮೂಲಕ ಸಂಪಾದಿಸಿ",
    editAudioDesc: "ನಿಮ್ಮ ಬದಲಾವಣೆಗಳನ್ನು ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ",
    resumeDeleted: "ರೆಸ್ಯೂಮೆ ಅಳಿಸಲಾಗಿದೆ",
    resumeDeletedDesc: "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆ ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.",
    deleteFailed: "ಅಳಿಸುವಿಕೆ ವಿಫಲವಾಗಿದೆ",
    deleteFailedDesc: "ರೆಸ್ಯೂಮೆ ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    downloadFailed: "ಡೌನ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ",
    downloadFailedDesc: "ರೆಸ್ಯೂಮೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    error: "ದೋಷ",
    errorDesc: "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ.",
    deleteErrorDesc: "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆ ಅಳಿಸುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ.",
    downloadErrorDesc: "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ.",
    playAudio: "ಆಡಿಯೋ ಸೂಚನೆಗಳನ್ನು ಪ್ಲೇ ಮಾಡಿ",
    stopAudio: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    audioText:
      "ನಿಮ್ಮ ರೆಸ್ಯೂಮೆ ಡ್ಯಾಶ್‌ಬೋર್ಡ್‌ಗೆ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ರೆಸ್ಯೂಮೆಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು, ಸಂಪಾದಿಸಬಹುದು, ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು ಮತ್ತು ಅಳಿಸಬಹುದು. ಪ್ರಾರಂಭಿಸಲು ಯಾವುದೇ ರೆಸ್ಯೂಮೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    template: "ಟೆಂಪ್ಲೇಟ್",
  },
  ml: {
    title: "എന്റെ റെസ്യൂമുകൾ",
    createNew: "പുതിയ റെസ്യൂം സൃഷ്ടിക്കുക",
    noResumesTitle: "ഇതുവരെ റെസ്യൂമുകൾ ഇല്ല",
    noResumesDesc: "നിങ്ങൾ ഇതുവരെ എന്തെങ്കിലും റെസ്യൂമുകൾ സൃഷ്ടിച്ചിട്ടില്ല. നിങ്ങളുടെ ആദ്യ റെസ്യൂം സൃഷ്ടിച്ച് ആരംഭിക്കുക.",
    createFirst: "നിങ്ങളുടെ ആദ്യ റെസ്യൂം സൃഷ്ടിക്കുക",
    view: "കാണുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    download: "ഡൗൺലോഡ് ചെയ്യുക",
    loading: "നിങ്ങളുടെ റെസ്യൂമുകൾ ലോഡ് ചെയ്യുന്നു...",
    editMethodTitle: "എഡിറ്റിംഗ് രീതി തിരഞ്ഞെടുക്കുക",
    editMethodDesc: "നിങ്ങൾ നിങ്ങളുടെ റെസ്യൂം എങ്ങനെ എഡിറ്റ് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു?",
    editManual: "മാനുവലായി എഡിറ്റ് ചെയ്യുക",
    editManualDesc: "ഫോമുകളും ടെക്സ്ട്റ് ഫീൽഡുകളും ഉപയോഗിക്കുക",
    editAudio: "ഓഡിയോ വഴി എഡിറ്റ് ചെയ്യുക",
    editAudioDesc: "നിങ്ങളുടെ മാറ്റങ്ങൾ സ്വാഭാവികമായി പറയുക",
    resumeDeleted: "റെസ്യൂം ഇല്ലാതാക്കി",
    resumeDeletedDesc: "നിങ്ങളുടെ റെസ്യൂം വിജയകരമായി ഇല്ലാതാക്കി.",
    deleteFailed: "ഇല്ലാതാക്കൽ പരാജയപ്പെട്ടു",
    deleteFailedDesc: "റെസ്യൂം ഇല്ലാതാക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    downloadFailed: "ഡൗൺലോഡ് പരാജയപ്പെട്ടു",
    downloadFailedDesc: "റെസ്യൂം ഡൗൺലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    error: "പിശക്",
    errorDesc: "നിങ്ങളുടെ റെസ്യൂമുകൾ ലോഡ് ചെയ്യുന്നതിൽ പിശക് സംഭവിച്ചു.",
    deleteErrorDesc: "നിങ്ങളുടെ റെസ്യൂം ഇല്ലാതാക്കുന്നതിൽ പിശക് സംഭവിച്ചു.",
    downloadErrorDesc: "നിങ്ങളുടെ റെസ്യൂം ഡൗൺലോഡ് ചെയ്യുന്നതിൽ പിശക് സംഭവിച്ചു.",
    playAudio: "ഓഡിയോ നിർദ്ദേശങ്ങൾ പ്ലേ ചെയ്യുക",
    stopAudio: "ഓഡിയോ നിർത്തുക",
    audioText:
      "നിങ്ങളുടെ റെസ്യൂം ഡാഷ്ബോർഡിലേക്ക് സ്വാഗതം. ഇവിടെ നിങ്ങൾക്ക് നിങ്ങളുടെ റെസ്യൂമുകൾ കാണാനും എഡിറ്റ് ചെയ്യാനും ഡൗൺലോഡ് ചെയ്യാനും ഇല്ലാതാക്കാനും കഴിയും. ആരംഭിക്കാൻ ഏതെങ്കിലും റെസ്യൂമിൽ ക്ലിക്ക് ചെയ്യുക.",
    template: "ടെംപ്ലേറ്റ്",
  },
  pa: {
    title: "ਮੇਰੇ ਰਿਜ਼ਿਊਮੇ",
    createNew: "ਨਵਾਂ ਰਿਜ਼ਿਊਮੇ ਬਣਾਓ",
    noResumesTitle: "ਅਜੇ ਤੱਕ ਕੋਈ ਰਿਜ਼ਿਊਮੇ ਨਹੀਂ",
    noResumesDesc: "ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਕੋਈ ਰਿਜ਼ਿਊਮੇ ਨਹੀਂ ਬਣਾਇਆ ਹੈ। ਆਪਣਾ ਪਹਿਲਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾ ਕੇ ਸ਼ੁਰੂਆਤ ਕਰੋ।",
    createFirst: "ਆਪਣਾ ਪਹਿਲਾ ਰਿਜ਼ਿਊਮੇ ਬਣਾਓ",
    view: "ਵੇਖੋ",
    edit: "ਸੰਪਾਦਿਤ ਕਰੋ",
    download: "ਡਾਊਨਲੋਡ ਕਰੋ",
    loading: "ਤੁਹਾਡੇ ਰਿਜ਼ਿਊਮੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
    editMethodTitle: "ਸੰਪਾਦਨ ਵਿਧੀ ਚੁਣੋ",
    editMethodDesc: "ਤੁਸੀਂ ਆਪਣਾ ਰਿਜ਼ਿ��ਮੇ ਕਿਵੇਂ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    editManual: "ਹੱਥੀਂ ਸੰਪਾਦਿਤ ਕਰੋ",
    editManualDesc: "ਫਾਰਮ ਅਤੇ ਟੈਕਸਟ ਫੀਲਡ ਵਰਤੋ",
    editAudio: "ਆਡੀਓ ਰਾਹੀਂ ਸੰਪਾਦਿਤ ਕਰੋ",
    editAudioDesc: "ਆਪਣੀਆਂ ਤਬਦੀਲੀਆਂ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ",
    resumeDeleted: "ਰਿਜ਼ਿਊਮੇ ਮਿਟਾ ਦਿੱਤਾ ਗਿਆ",
    resumeDeletedDesc: "ਤੁਹਾਡਾ ਰਿਜ਼ਿਊਮੇ ਸਫਲਤਾਪੂਰਵਕ ਮਿਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ।",
    deleteFailed: "ਮਿਟਾਉਣਾ ਅਸਫਲ",
    deleteFailedDesc: "ਰਿਜ਼ਿਊਮੇ ਮਿਟਾਉਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    downloadFailed: "ਡਾਊਨਲੋਡ ਅਸਫਲ",
    downloadFailedDesc: "ਰਿਜ਼ਿਊਮੇ ਡਾਊਨਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    error: "ਗਲਤੀ",
    errorDesc: "ਤੁਹਾਡੇ ਰਿਜ਼ਿਊਮੇ ਲੋਡ ਕਰਦੇ ਸਮੇਂ ਗਲਤੀ ਹੋਈ।",
    deleteErrorDesc: "ਤੁਹਾਡਾ ਰਿਜ਼ਿਊਮੇ ਮਿਟਾਉਂਦੇ ਸਮੇਂ ਗਲਤੀ ਹੋਈ।",
    downloadErrorDesc: "ਤੁਹਾਡਾ ਰਿਜ਼ਿਊਮੇ ਡਾਊਨਲੋਡ ਕਰਦੇ ਸਮੇਂ ਗਲਤੀ ਹੋਈ।",
    playAudio: "ਆਡੀਓ ਹਿਦਾਇਤਾਂ ਚਲਾਓ",
    stopAudio: "ਆਡੀਓ ਬੰਦ ਕਰੋ",
    audioText:
      "ਤੁਹਾਡੇ ਰਿਜ਼ਿਊਮੇ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਰਿਜ਼ਿਊਮੇ ਵੇਖ ਸਕਦੇ ਹੋ, ਸੰਪਾਦਿਤ ਕਰ ਸਕਦੇ ਹੋ, ਡਾਊਨਲੋਡ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਮਿਟਾ ਸਕਦੇ ਹੋ। ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕਿਸੇ ਵੀ ਰਿਜ਼ਿਊਮੇ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
    template: "ਟੈਂਪਲੇਟ",
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en"
    setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    if (language && !isLoading) {
      const timer = setTimeout(() => {
        playAudioInstructions()
      }, 1000) // Reduced delay for faster auto-play
      return () => clearTimeout(timer)
    }
  }, [language, isLoading, resumes.length]) // Added resumes.length dependency

  const t = translations[language as keyof typeof translations] || translations.en

  const getLanguageCode = (lang: string) => {
    const languageMap: { [key: string]: string } = {
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
    return languageMap[lang] || "en-US"
  }

  const playAudioInstructions = async () => {
    try {
      const audioMessage = resumes.length === 0 ? `${t.noResumesTitle}. ${t.noResumesDesc}` : t.audioText

      const utterance = new SpeechSynthesisUtterance(audioMessage)
      utterance.lang = getLanguageCode(language)
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => {
        console.log("[v0] Audio playback ended")
      }

      utterance.onerror = () => {
        console.log("[v0] Audio playback failed")
      }

      speechSynthesis.speak(utterance)
    } catch (error) {
      console.log("[v0] Audio not supported on this device")
    }
  }

  useEffect(() => {
    // Check if user is authenticated and fetch resumes
    const fetchResumes = async () => {
      try {
        const authResponse = await fetch("http://localhost:5000/api/check-auth", {
          credentials: "include",
        })

        if (!authResponse.ok) {
          router.push("/login")
          return
        }

        const resumesResponse = await fetch("http://localhost:5000/api/resumes", {
          credentials: "include",
        })

        if (resumesResponse.ok) {
          const data = await resumesResponse.json()
          setResumes(data.resumes)
        } else {
          toast({
            title: t.error,
            description: t.errorDesc,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: t.error,
          description: t.errorDesc,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumes()
  }, [router, t.error, t.errorDesc])

  const handleEditClick = (resumeId: string) => {
    setSelectedResumeId(resumeId)
    setShowEditModal(true)
  }

  const handleManualEdit = () => {
    setShowEditModal(false)
    if (selectedResumeId) {
      router.push(`/edit-resume?id=${selectedResumeId}`)
    }
    setSelectedResumeId(null)
  }

  const handleAudioEdit = () => {
    setShowEditModal(false)
    if (selectedResumeId) {
      router.push(`/audio-edit?id=${selectedResumeId}`)
    }
    setSelectedResumeId(null)
  }

  const handleDeleteResume = async (id: string) => {
    setIsDeleting(id)
    try {
      const response = await fetch(`http://localhost:5000/api/resume/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setResumes(resumes.filter((resume) => resume.id !== id))
        toast({
          title: t.resumeDeleted,
          description: t.resumeDeletedDesc,
        })
      } else {
        const errorData = await response.json()
        toast({
          title: t.deleteFailed,
          description: errorData.message || t.deleteFailedDesc,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t.error,
        description: t.deleteErrorDesc,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDownloadResume = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/resume/${id}/download`, {
        credentials: "include",
      })

      if (response.ok) {
        // Create a blob from the PDF data
        const blob = await response.blob()
        // Create a link element and trigger download
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        // Clean up
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const errorData = await response.json()
        toast({
          title: t.downloadFailed,
          description: errorData.message || t.downloadFailedDesc,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t.error,
        description: t.downloadErrorDesc,
        variant: "destructive",
      })
    }
  }

  const handleViewResume = (resume: Resume) => {
    // Extract category from template ID for navigation
    const categoryMap: Record<string, string> = {
      p: "1", // Professional
      c: "2", // Creative
      m: "3", // Minimal
      e: "4", // Executive
    }

    const templateType = resume.templateId.charAt(0).toLowerCase()
    const categoryId = categoryMap[templateType] || "1"

    router.push(`/resume-preview?id=${resume.id}&template=${resume.templateId}&category=${categoryId}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <Link href="/templates">
          <Button className="gap-2">
            <Plus size={16} />
            {t.createNew}
          </Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{t.noResumesTitle}</h2>
          <p className="text-gray-500 mb-6">{t.noResumesDesc}</p>
          <Link href="/templates">
            <Button>{t.createFirst}</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-500">{new Date(resume.updatedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{resume.templateName}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {resume.templateCategory} • {t.template} {resume.templateId.toUpperCase()}
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleViewResume(resume)}
                  >
                    <FileText className="h-4 w-4 mr-1" /> {t.view}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEditClick(resume.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> {t.edit}
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4 flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume.id)}>
                  <Download className="h-4 w-4 mr-1" /> {t.download}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteResume(resume.id)}
                  disabled={isDeleting === resume.id}
                >
                  {isDeleting === resume.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Options Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">{t.editMethodTitle}</DialogTitle>
            <DialogDescription className="text-center text-gray-600">{t.editMethodDesc}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={handleManualEdit}
              className="flex items-center justify-center gap-3 h-16 text-base bg-transparent"
              variant="outline"
            >
              <FileEdit className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">{t.editManual}</div>
                <div className="text-sm text-gray-500">{t.editManualDesc}</div>
              </div>
            </Button>
            <Button onClick={handleAudioEdit} className="flex items-center justify-center gap-3 h-16 text-base">
              <Mic className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">{t.editAudio}</div>
                <div className="text-sm text-gray-100">{t.editAudioDesc}</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
