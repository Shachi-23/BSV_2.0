"use client"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Mic, FileEdit, Lightbulb, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import {
  DriverTemplate,
  DeliveryPartnerTemplate,
  ElectricianTemplate,
  TailorTemplate,
  CookChefTemplate,
  SecurityGuardTemplate,
  SalesAssistantTemplate,
  MechanicTemplate,
} from "@/components/resume-templates"

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin?: string
    address?: string
  }
  summary: string
  professionalSummary?: string
  experience: Array<{
    title: string
    company: string
    dates: string
    location: string
    description: string
    jobTitle?: string
    duration?: string
    responsibilities?: string[]
  }>
  education?: Array<{
    degree: string
    institution: string
    year: string
    details?: string
  }>
  projects?: Array<{
    name: string
    description: string
    technologies?: string
    link?: string
    dates?: string
  }>
  skills: string[]
  achievements?: string[]
  licenses?: string[]
  certifications?: string[]
  vehicleTypes?: string[]
  safetyRecord?: string
  platforms?: string[]
  stats?: {
    totalDeliveries?: string
    rating?: string
    onTimeDelivery?: string
  }
  vehicle?: string
  coverageAreas?: string[]
  specializations?: string[]
  tools?: string[]
  techniques?: string[]
  equipment?: string[]
  cuisineTypes?: string[]
  specialties?: string[]
  training?: string[]
  shifts?: string[]
  productKnowledge?: string[]
  systems?: string[]
}

interface Suggestion {
  id: string
  type: "critical" | "important" | "improvement"
  category: "contact" | "content" | "structure" | "keywords" | "formatting"
  title: string
  description: string
  action: string
}

export default function ResumePreview() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeDataEnglish, setResumeDataEnglish] = useState<ResumeData | null>(null)
  const [resumeDataOther, setResumeDataOther] = useState<ResumeData | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const resumeRef = useRef<HTMLDivElement>(null)

  const templateId = searchParams.get("template") || ""
  const categoryId = searchParams.get("category") || ""
  const resumeId = searchParams.get("id") || ""
  const selectedLanguage = searchParams.get("lang") || "hi"

  // Template categories mapping for display purposes
  const categoryNames: Record<string, string> = {
    "1": "Professional",
    "2": "Creative",
    "3": "Minimal",
    "4": "Executive",
  }

  useEffect(() => {
    // Dynamically import html2pdf only in browser
    import("html2pdf.js").then((html2pdf) => {
      ;(window as any).html2pdf = html2pdf.default
    })
  }, [])

  const templateNames: Record<string, string> = {
    // Driver templates
    d1: "Professional Driver",
    d2: "Commercial Driver",
    d3: "Delivery Driver",
    // Delivery Partner templates
    dp1: "Food Delivery Pro",
    dp2: "Courier Specialist",
    dp3: "Multi-Platform Partner",
    // Electrician templates
    e1: "Licensed Electrician",
    // Tailor templates
    t1: "Master Tailor",
    t2: "Fashion Designer",
    t3: "Alterations Specialist",
    // Cook/Chef templates
    c1: "Professional Chef",
    c2: "Line Cook",
    c3: "Culinary Specialist",
    // Security Guard templates
    s1: "Security Professional",
    s2: "Armed Security",
    s3: "Corporate Security",
    // Sales Assistant templates
    sa1: "Retail Sales",
    sa2: "Customer Service",
    sa3: "Sales Associate",
    // Mechanic templates
    m1: "Auto Mechanic",
    m2: "Diesel Technician",
    m3: "Heavy Equipment",
    // Legacy professional templates
    p1: "Corporate",
    p2: "Business",
    p3: "Executive Pro",
    p4: "Modern Professional",
    p5: "Classic",
    // Creative templates
    cr1: "Designer",
    cr2: "Artistic",
    cr3: "Digital Creative",
    cr4: "Portfolio Plus",
    cr5: "Innovation",
    // Minimal templates
    mn1: "Clean",
    mn2: "Simplicity",
    mn3: "Essentials",
    mn4: "Minimalist Pro",
    mn5: "Whitespace",
    // Executive templates
    ex1: "Leadership",
    ex2: "C-Suite",
    ex3: "Director",
    ex4: "Board Member",
    ex5: "Executive Elite",
  }

  // Analyze resume and generate suggestions
  const analyzeResume = (data: ResumeData): Suggestion[] => {
    const suggestions: Suggestion[] = []

    // Contact Information Analysis
    if (!data.personalInfo.phone || data.personalInfo.phone.length < 10) {
      suggestions.push({
        id: "phone-missing",
        type: "critical",
        category: "contact",
        title: "Add Phone Number",
        description: "Your resume is missing a phone number or has an incomplete one.",
        action: "Add a complete phone number to make it easy for employers to contact you.",
      })
    }

    if (!data.personalInfo.linkedin) {
      suggestions.push({
        id: "linkedin-missing",
        type: "important",
        category: "contact",
        title: "Add LinkedIn Profile",
        description: "LinkedIn profiles help employers learn more about your professional background.",
        action: "Include your LinkedIn profile URL in the contact section.",
      })
    }

    if (!data.personalInfo.email.includes("@")) {
      suggestions.push({
        id: "email-invalid",
        type: "critical",
        category: "contact",
        title: "Fix Email Address",
        description: "Your email address appears to be invalid.",
        action: "Ensure your email address is correct and professional.",
      })
    }

    // Summary Analysis
    if (!data.summary || data.summary.length < 50) {
      suggestions.push({
        id: "summary-short",
        type: "important",
        category: "content",
        title: "Expand Professional Summary",
        description: "Your professional summary is too short or missing.",
        action: "Write a 2-3 sentence summary highlighting your key skills and experience.",
      })
    }

    if (data.summary && data.summary.length > 200) {
      suggestions.push({
        id: "summary-long",
        type: "improvement",
        category: "content",
        title: "Shorten Professional Summary",
        description: "Your professional summary might be too long.",
        action: "Keep your summary concise - aim for 2-3 impactful sentences.",
      })
    }

    // Experience Analysis
    data.experience.forEach((exp, index) => {
      if (!exp.description || exp.description.length < 50) {
        suggestions.push({
          id: `exp-desc-${index}`,
          type: "important",
          category: "content",
          title: `Expand ${exp.title} Description`,
          description: `The description for your ${exp.title} role is too brief.`,
          action: "Add specific achievements, metrics, and responsibilities to showcase your impact.",
        })
      }

      if (exp.description && !exp.description.match(/\d+%|\$\d+|\d+\+/)) {
        suggestions.push({
          id: `exp-metrics-${index}`,
          type: "improvement",
          category: "content",
          title: `Add Metrics to ${exp.title}`,
          description: "Your experience lacks quantifiable achievements.",
          action: "Include numbers, percentages, or dollar amounts to demonstrate your impact.",
        })
      }

      if (!exp.dates || exp.dates === "") {
        suggestions.push({
          id: `exp-dates-${index}`,
          type: "important",
          category: "structure",
          title: `Add Dates for ${exp.title}`,
          description: "Employment dates are missing for this position.",
          action: 'Include start and end dates (or "Present" for current roles).',
        })
      }
    })

    // Projects Analysis
    if (!data.projects || data.projects.length === 0) {
      suggestions.push({
        id: "projects-missing",
        type: "improvement",
        category: "content",
        title: "Add Projects Section",
        description: "Including relevant projects can strengthen your resume.",
        action: "Add 2-3 projects that showcase your skills and experience.",
      })
    } else {
      data.projects.forEach((project, index) => {
        if (!project.description || project.description.length < 30) {
          suggestions.push({
            id: `project-desc-${index}`,
            type: "important",
            category: "content",
            title: `Improve ${project.name} Description`,
            description: "This project needs a more detailed description.",
            action: "Explain what you built, technologies used, and the impact or results.",
          })
        }

        if (!project.technologies) {
          suggestions.push({
            id: `project-tech-${index}`,
            type: "improvement",
            category: "keywords",
            title: `Add Technologies for ${project.name}`,
            description: "Listing technologies helps with keyword matching.",
            action: "Include the programming languages, frameworks, and tools you used.",
          })
        }
      })
    }

    // Skills Analysis
    if (data.skills.length < 5) {
      suggestions.push({
        id: "skills-few",
        type: "improvement",
        category: "keywords",
        title: "Add More Skills",
        description: "Your skills section could be more comprehensive.",
        action: "Include both technical and soft skills relevant to your target role.",
      })
    }

    if (data.skills.length > 15) {
      suggestions.push({
        id: "skills-many",
        type: "improvement",
        category: "keywords",
        title: "Focus Your Skills",
        description: "Too many skills can dilute your message.",
        action: "Focus on the most relevant skills for your target position.",
      })
    }

    if (data.education && data.education.length > 0) {
      data.education.forEach((edu, index) => {
        if (!edu.year) {
          suggestions.push({
            id: `edu-year-${index}`,
            type: "improvement",
            category: "structure",
            title: `Add Graduation Year`,
            description: "Consider adding graduation year for your education.",
            action: "Include graduation year or expected graduation date.",
          })
        }
      })
    } else {
      // Only suggest adding education if it's completely missing
      suggestions.push({
        id: "education-missing",
        type: "improvement",
        category: "structure",
        title: "Consider Adding Education",
        description: "Adding education information can strengthen your resume.",
        action: "Include your highest level of education, even if it's basic schooling.",
      })
    }

    // Overall Structure Analysis
    if (data.experience.length === 0) {
      suggestions.push({
        id: "no-experience",
        type: "critical",
        category: "structure",
        title: "Add Work Experience",
        description: "Your resume needs work experience entries.",
        action: "Include internships, part-time jobs, or volunteer work if you lack full-time experience.",
      })
    }

    return suggestions
  }

  // useEffect(() => {
  //   // Load resume data from localStorage or API
  //   const loadResumeData = async () => {
  //     try {
  //       // First try to get data from localStorage (from audio processing)
  //       const storedData = localStorage.getItem("resumeData")
  //       if (storedData) {
  //         console.log("Found stored data:", storedData)
  //         // Parse the JSON string from localStorage
  //         const parsedData = JSON.parse(storedData)

  //         let resumeJson
  //         if (parsedData.data) {
  //           // If the response has a "data" property with english/hi structure
  //           if (parsedData.data.english) {
  //             // Use English data by default, could be made configurable later
  //             resumeJson = parsedData.data.english
  //           } else {
  //             // Fallback to direct data property
  //             resumeJson = parsedData.data
  //           }
  //         } else {
  //           resumeJson = parsedData
  //         }

  //         // If the data contains a JSON string (from your backend)
  //         if (typeof resumeJson === "string" && resumeJson.startsWith("json")) {
  //           // Extract the JSON part from the string
  //           const jsonStart = resumeJson.indexOf("{")
  //           const jsonEnd = resumeJson.lastIndexOf("}") + 1
  //           const jsonString = resumeJson.substring(jsonStart, jsonEnd)
  //           const data = JSON.parse(jsonString)

  //           const transformedData = transformBackendData(data)
  //           setResumeData(transformedData)
  //           setSuggestions(analyzeResume(transformedData))
  //         } else {
  //           const transformedData = transformBackendData(resumeJson)
  //           setResumeData(transformedData)
  //           setSuggestions(analyzeResume(transformedData))
  //         }
  //       } else if (resumeId) {
  //         // If no localStorage data but we have a resumeId, fetch from API
  //         const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
  //           credentials: "include",
  //         })
  //         if (response.ok) {
  //           const data = await response.json()
  //           const transformedData = transformBackendData(data)
  //           setResumeData(transformedData)
  //           setSuggestions(analyzeResume(transformedData))
  //         } else {
  //           toast({
  //             title: "Error",
  //             description: "Failed to load resume data. Please try again.",
  //             variant: "destructive",
  //           })
  //           const fallbackData = getFallbackResumeData()
  //           setResumeData(fallbackData)
  //           setSuggestions(analyzeResume(fallbackData))
  //         }
  //       } else {
  //         console.error("No resume data found")
  //         // Use fallback data if needed
  //         const fallbackData = getFallbackResumeData()
  //         setResumeData(fallbackData)
  //         setSuggestions(analyzeResume(fallbackData))
  //       }
  //     } catch (error) {
  //       console.error("Error loading resume data:", error)
  //       const fallbackData = getFallbackResumeData()
  //       setResumeData(fallbackData)
  //       setSuggestions(analyzeResume(fallbackData))
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   // Simulate loading the resume
  //   setTimeout(() => {
  //     loadResumeData()
  //   }, 1000)
  // }, [resumeId])


    useEffect(() => {
    // Load resume data from localStorage or API
    const loadResumeData = async () => {
      try {
        const storedData = localStorage.getItem("resumeData")
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          let resumeJsonEnglish, resumeJsonOther

          if (parsedData.data) {
            if (parsedData.data.english && parsedData.data[selectedLanguage]) {
              resumeJsonEnglish = parsedData.data.english
              resumeJsonOther = parsedData.data[selectedLanguage]
            } else if (parsedData.data.english) {
              resumeJsonEnglish = parsedData.data.english
              resumeJsonOther = null
            } else {
              resumeJsonEnglish = parsedData.data
              resumeJsonOther = null
            }
          } else {
            resumeJsonEnglish = parsedData
            resumeJsonOther = null
          }

          // English
          if (typeof resumeJsonEnglish === "string" && resumeJsonEnglish.startsWith("json")) {
            const jsonStart = resumeJsonEnglish.indexOf("{")
            const jsonEnd = resumeJsonEnglish.lastIndexOf("}") + 1
            const jsonString = resumeJsonEnglish.substring(jsonStart, jsonEnd)
            const data = JSON.parse(jsonString)
            const transformedData = transformBackendData(data)
            setResumeDataEnglish(transformedData)
            setSuggestions(analyzeResume(transformedData))
          } else {
            const transformedData = transformBackendData(resumeJsonEnglish)
            setResumeDataEnglish(transformedData)
            setSuggestions(analyzeResume(transformedData))
          }
          if (resumeJsonOther) {
            if (typeof resumeJsonOther === "string" && resumeJsonOther.startsWith("json")) {
              const jsonStart = resumeJsonOther.indexOf("{")
              const jsonEnd = resumeJsonOther.lastIndexOf("}") + 1
              const jsonString = resumeJsonOther.substring(jsonStart, jsonEnd)
              const dataOther = JSON.parse(jsonString)
              setResumeDataOther(transformBackendData(dataOther))
            } else {
              setResumeDataOther(transformBackendData(resumeJsonOther))
            }
          } else {
            setResumeDataOther(null)
          }
        } else if (resumeId) {
          const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
            credentials: "include",
          })
          if (response.ok) {
            const data = await response.json()
            setResumeDataEnglish(transformBackendData(data))
            setSuggestions(analyzeResume(transformBackendData(data)))
            setResumeDataOther(null)
          } else {
            toast({
              title: "Error",
              description: "Failed to load resume data. Please try again.",
              variant: "destructive",
            })
            const fallbackData = getFallbackResumeData()
            setResumeDataEnglish(fallbackData)
            setSuggestions(analyzeResume(fallbackData))
            setResumeDataOther(null)
          }
        } else {
          const fallbackData = getFallbackResumeData()
          setResumeDataEnglish(fallbackData)
          setSuggestions(analyzeResume(fallbackData))
          setResumeDataOther(null)
        }
      } catch (error) {
        const fallbackData = getFallbackResumeData()
        setResumeDataEnglish(fallbackData)
        setSuggestions(analyzeResume(fallbackData))
        setResumeDataOther(null)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      loadResumeData()
    }, 1000)
  }, [resumeId, selectedLanguage])

  const transformBackendData = (backendData: any): ResumeData => {
    console.log("[v0] Transforming backend data:", backendData)

    // Handle case where data might already be in correct format
    if (backendData.personalInfo && backendData.experience && !backendData.professionalSummary) {
      return backendData
    }

    // Transform backend structure to match frontend ResumeData interface
    const transformedData: ResumeData = {
      personalInfo: {
        name: backendData.personalInfo?.name || "Unknown",
        title: backendData.personalInfo?.title || backendData.experience?.[0]?.jobTitle || "Professional",
        email: backendData.personalInfo?.email || "email@example.com",
        phone: backendData.personalInfo?.phone || "+91 XXXXXXXXXX",
        location: backendData.personalInfo?.address || backendData.personalInfo?.location || "Location",
        linkedin: backendData.personalInfo?.linkedin,
        address: backendData.personalInfo?.address,
      },
      summary: backendData.professionalSummary || backendData.summary || "",
      professionalSummary: backendData.professionalSummary,
      experience: (backendData.experience || []).map((exp: any) => ({
        title: exp.jobTitle || exp.title || "",
        company: exp.company || "",
        dates: exp.duration || exp.dates || "",
        location: exp.location || "",
        description: Array.isArray(exp.responsibilities)
          ? exp.responsibilities.join(". ")
          : exp.description || exp.responsibilities || "",
        jobTitle: exp.jobTitle,
        duration: exp.duration,
        responsibilities: exp.responsibilities,
      })),
      education: (backendData.education || []).map((edu: any) => {
        const educationItem = {
          degree: edu.degree || "",
          institution: edu.institution || "",
          year: edu.year || "",
          details: edu.details || "",
        }
        console.log("[v0] Mapping education item:", educationItem)
        return educationItem
      }),
      skills: backendData.skills || [],
      achievements: Array.isArray(backendData.achievements) ? backendData.achievements.filter(Boolean) : [],
      certifications: Array.isArray(backendData.certifications) ? backendData.certifications.filter(Boolean) : [],
      // Add all possible job-specific fields from backend
      vehicleTypes: backendData.vehicleTypes,
      safetyRecord: backendData.safetyRecord,
      platforms: backendData.platforms,
      stats: backendData.stats,
      vehicle: backendData.vehicle,
      coverageAreas: backendData.coverageAreas,
      specializations: backendData.specializations,
      tools: backendData.tools,
      techniques: backendData.techniques,
      equipment: backendData.equipment,
      cuisineTypes: backendData.cuisineTypes,
      specialties: backendData.specialties,
      training: backendData.training,
      shifts: backendData.shifts,
      productKnowledge: backendData.productKnowledge,
      systems: backendData.systems,
      projects: backendData.projects,
      licenses: backendData.licenses,
    }

    console.log("[v0] Transformed data - Education:", transformedData.education)
    console.log("[v0] Transformed data - Achievements:", transformedData.achievements)
    console.log("[v0] Transformed data - Skills:", transformedData.skills)
    console.log("[v0] Transformed data - Experience:", transformedData.experience)
    console.log("[v0] Full transformed data:", transformedData)
    return transformedData
  }

  const getFallbackResumeData = (): ResumeData => {
    return {
      personalInfo: {
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
      },
      summary: "Experienced software engineer with a passion for building scalable web applications.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Innovations Inc.",
          dates: "2021 - Present",
          location: "",
          description:
            "Led development of company's flagship product. Managed team of 5 engineers. Implemented CI/CD pipeline reducing deployment time by 40%.",
        },
        {
          title: "Software Engineer",
          company: "Digital Solutions LLC",
          dates: "2019 - 2021",
          location: "",
          description:
            "Developed responsive web applications using React. Collaborated with design team to implement UI/UX improvements. Optimized database queries resulting in 30% performance improvement.",
        },
      ],
      education: [
        {
          degree: "Computer Science, BS",
          institution: "Stanford University",
          year: "2019",
          details: "Graduated Magna Cum Laude",
        },
      ],
      projects: [
        {
          name: "E-Commerce Platform",
          description:
            "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.",
          technologies: "React, Node.js, MongoDB, Stripe API",
          link: "https://github.com/johndoe/ecommerce-platform",
          dates: "2023 - Present",
        },
        {
          name: "Task Management App",
          description:
            "Developed a collaborative task management application with real-time updates and team collaboration features.",
          technologies: "Vue.js, Express.js, Socket.io, PostgreSQL",
          link: "https://taskmanager-demo.com",
          dates: "2022 - 2023",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
    }
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content")
    if (!element) return

    const opt = {
      margin: 0.3,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    try {
      await (window as any).html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error("PDF generation failed:", err)
    }
  }

  const handleEdit = () => {
    setShowEditModal(true)
  }
  const handleManualEdit = () => {
  setShowEditModal(false)
  if (resumeDataEnglish) {
    localStorage.setItem("resumeDataForEdit", JSON.stringify(resumeDataEnglish))
  }
  if (resumeDataEnglish && "id" in resumeDataEnglish) {
    router.push(`/edit-resume?id=${resumeDataEnglish.id}`)
  } else {
    router.push(`/edit-resume?template=${templateId}&category=${categoryId}`)
  }
}

const handleAudioEdit = () => {
  setShowEditModal(false)
  if (resumeDataEnglish) {
    localStorage.setItem("resumeDataForEdit", JSON.stringify(resumeDataEnglish))
  }
  if (resumeDataEnglish && "id" in resumeDataEnglish) {
    router.push(`/audio-edit?id=${resumeDataEnglish.id}`)
  } else {
    router.push(`/audio-edit?template=${templateId}&category=${categoryId}`)
  }
}

  // const handleManualEdit = () => {
  //   setShowEditModal(false)
  //   // If we have a resumeId from the API, use it for editing
  //   if (resumeDataEnglish && "id" in resumeDataEnglish) {
  //     router.push(`/edit-resume?id=${resumeDataEnglish.id}`)
  //   } else {
  //     // Otherwise just pass the template and category
  //     router.push(`/edit-resume?template=${templateId}&category=${categoryId}`)
  //   }
  // }

  // const handleAudioEdit = () => {
  //   setShowEditModal(false)
  //   // Navigate to audio editing page with current resume data
  //   if (resumeDataEnglish && "id" in resumeDataEnglish) {
  //     router.push(`/audio-edit?id=${resumeDataEnglish.id}`)
  //   } else {
  //     // Store current resume data in localStorage for audio editing
  //     localStorage.setItem("resumeDataForEdit", JSON.stringify(resumeDataEnglish))
  //     router.push(`/audio-edit?template=${templateId}&category=${categoryId}`)
  //   }
  // }

  const handleGoBack = () => {
    router.push("/templates")
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "important":
        return <Info className="h-4 w-4 text-orange-500" />
      case "improvement":
        return <Lightbulb className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getSuggestionBadgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "improvement":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const detectProfessionFromData = (data: ResumeData): string => {
    if (!data) return "t1"

    // Check job titles in experience with comprehensive null safety
    const jobTitles = (data.experience || [])
      .filter((exp) => exp && exp.title && typeof exp.title === "string")
      .map((exp) => exp.title.toLowerCase())

    // Also check jobTitle field from backend
    const backendJobTitles = (data.experience || [])
      .filter((exp) => exp && exp.jobTitle && typeof exp.jobTitle === "string")
      .map((exp) => exp.jobTitle!.toLowerCase())

    const personalTitle = (data.personalInfo?.title || "").toLowerCase()
    const summary = (data.summary || "").toLowerCase()
    const professionalSummary = (data.professionalSummary || "").toLowerCase()

    const allText = [...jobTitles, ...backendJobTitles, personalTitle, summary, professionalSummary]
      .filter((text) => text && text.length > 0)
      .join(" ")

    console.log("[v0] Profession detection text:", allText)

    // Enhanced profession detection patterns
    if (allText.includes("driver") || allText.includes("driving")) return "d1"
    if (allText.includes("delivery") || allText.includes("courier")) return "dp1"
    if (allText.includes("electrician") || allText.includes("electrical")) return "e1"
    if (
      allText.includes("tailor") ||
      allText.includes("sewing") ||
      allText.includes("garment") ||
      allText.includes("alteration") ||
      allText.includes("दर्जी")
    )
      return "t1"
    if (allText.includes("cook") || allText.includes("chef") || allText.includes("kitchen")) return "c1"
    if (allText.includes("security") || allText.includes("guard")) return "s1"
    if (allText.includes("sales") || allText.includes("retail") || allText.includes("customer service")) return "sa1"
    if (allText.includes("mechanic") || allText.includes("automotive") || allText.includes("repair")) return "m1"

    console.log("[v0] Defaulting to tailor template")
    return "t1" // Default to tailor template
  }

  const renderTemplate = (resumeData: ResumeData | null) => {
    if (!resumeData) return null

    let effectiveTemplateId = templateId
    if (!templateId || templateId === "" || templateId === "undefined") {
      effectiveTemplateId = detectProfessionFromData(resumeData)
    }

    if (effectiveTemplateId.startsWith("d")) {
      const variant = effectiveTemplateId.substring(1)
      return <DriverTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("dp")) {
      const variant = effectiveTemplateId.substring(2)
      return <DeliveryPartnerTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("e") && effectiveTemplateId.length === 2) {
      const variant = effectiveTemplateId.substring(1)
      return <ElectricianTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("t")) {
      const variant = effectiveTemplateId.substring(1)
      return <TailorTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("c") && effectiveTemplateId.length === 2) {
      const variant = effectiveTemplateId.substring(1)
      return <CookChefTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("s") && effectiveTemplateId.length === 2) {
      const variant = effectiveTemplateId.substring(1)
      return <SecurityGuardTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("sa")) {
      const variant = effectiveTemplateId.substring(2)
      return <SalesAssistantTemplate variant={variant} data={resumeData} />
    } else if (effectiveTemplateId.startsWith("m") && effectiveTemplateId.length === 2) {
      const variant = effectiveTemplateId.substring(1)
      return <MechanicTemplate variant={variant} data={resumeData} />
    } else {
      const templateType = effectiveTemplateId.charAt(0)
      const templateNumber = effectiveTemplateId.substring(1)

      switch (templateType) {
        case "p":
          return <ProfessionalTemplate variant={templateNumber} data={resumeData} />
        case "cr":
          return <CreativeTemplate variant={templateNumber} data={resumeData} />
        case "mn":
          return <MinimalTemplate variant={templateNumber} data={resumeData} />
        case "ex":
          return <ExecutiveTemplate variant={templateNumber} data={resumeData} />
        default:
          return <TailorTemplate variant="1" data={resumeData} />
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Generating your resume...</p>
        </div>
      </div>
    )
  }

  const criticalSuggestions = suggestions.filter((s) => s.type === "critical")
  const importantSuggestions = suggestions.filter((s) => s.type === "important")
  const improvementSuggestions = suggestions.filter((s) => s.type === "improvement")

  return (
    <div className="container mx-auto py-8 px-6">
      <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to templates
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Your{" "}
          {resumeDataEnglish
            ? templateNames[detectProfessionFromData(resumeDataEnglish)] || templateNames[templateId] || "Professional"
            : "Professional"}{" "}
          Resume
        </h1>
        <p className="text-gray-600 mt-2">Generated from your audio input</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Suggestions Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 h-[calc(100vh-8rem)]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Resume Suggestions
                </CardTitle>
                <Badge variant="outline">{suggestions.length} tips</Badge>
              </div>
              <CardDescription>Improve your resume with these personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto h-[calc(100%-8rem)] pr-2">
              {/* Critical Suggestions */}
              {criticalSuggestions.length > 0 && (
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-700">Critical ({criticalSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {criticalSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-red-800">{suggestion.title}</h4>
                            <p className="text-xs text-red-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-red-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Important Suggestions */}
              {importantSuggestions.length > 0 && (
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-700">Important ({importantSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {importantSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-orange-800">{suggestion.title}</h4>
                            <p className="text-xs text-orange-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-orange-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Improvement Suggestions */}
              {improvementSuggestions.length > 0 && (
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-blue-700">Improvements ({improvementSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {improvementSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-blue-800">{suggestion.title}</h4>
                            <p className="text-xs text-blue-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-blue-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {suggestions.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-green-700">Great job!</p>
                  <p className="text-xs text-green-600">Your resume looks comprehensive.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-3">
          <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
            <div id="pdf-content" ref={resumeRef} className="max-w-4xl mx-auto bg-white rounded shadow-lg">
              {/* {renderTemplate()} */}
              <div>
                <h2 className="text-xl font-bold mb-2">English Resume</h2>
                {renderTemplate(resumeDataEnglish)}
              </div>
              {/* Other Language Resume */}
              {resumeDataOther && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Resume in Selected Language</h2>
                  {renderTemplate(resumeDataOther)}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Options Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Choose Edit Method</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              How would you like to edit your resume?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={handleManualEdit}
              className="flex items-center justify-center gap-3 h-16 text-base bg-transparent"
              variant="outline"
            >
              <FileEdit className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Edit Manually</div>
                <div className="text-sm text-gray-500">Use forms and text fields</div>
              </div>
            </Button>
            <Button onClick={handleAudioEdit} className="flex items-center justify-center gap-3 h-16 text-base">
              <Mic className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Edit Through Audio</div>
                <div className="text-sm text-gray-100">Speak your changes naturally</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProfessionalTemplate({ variant, data }: { variant: string; data: any }) {
  return <DriverTemplate variant="1" data={data} />
}

function CreativeTemplate({ variant, data }: { variant: string; data: any }) {
  return <DriverTemplate variant="2" data={data} />
}

function MinimalTemplate({ variant, data }: { variant: string; data: any }) {
  return <DriverTemplate variant="3" data={data} />
}

function ExecutiveTemplate({ variant, data }: { variant: string; data: any }) {
  return <DriverTemplate variant="1" data={data} />
}
