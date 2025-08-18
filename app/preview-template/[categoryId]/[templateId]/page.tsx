// // "use client"

// // import { use, useEffect, useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { ArrowLeft, MessageSquare, Mic } from "lucide-react"
// // import { useRouter } from "next/navigation"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import {
// //   ProfessionalTemplate,
// //   CreativeTemplate,
// //   MinimalTemplate,
// //   ExecutiveTemplate,
// // } from "@/components/resume-templates"


// // export default function PreviewTemplate({
// //   params,
// // }: {
// //   // params: { categoryId: string; templateId: string }
// //    params: Promise<{ categoryId: string; templateId: string }>
// // }) {
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [showModeSelection, setShowModeSelection] = useState(false)
// //   const router = useRouter()
// //   // const { categoryId, templateId } = params
// //   const { categoryId, templateId } = use(params)

// //   // Template categories mapping for display purposes
// //   const categoryNames: Record<string, string> = {
// //     "1": "Professional",
// //     "2": "Creative",
// //     "3": "Minimal",
// //     "4": "Executive",
// //   }

// //   // Template names mapping
// //   const templateNames: Record<string, string> = {
// //     // Professional templates
// //     p1: "Corporate",
// //     p2: "Business",
// //     p3: "Executive Pro",
// //     p4: "Modern Professional",
// //     p5: "Classic",
// //     // Creative templates
// //     c1: "Designer",
// //     c2: "Artistic",
// //     c3: "Digital Creative",
// //     c4: "Portfolio Plus",
// //     c5: "Innovation",
// //     // Minimal templates
// //     m1: "Clean",
// //     m2: "Simplicity",
// //     m3: "Essentials",
// //     m4: "Minimalist Pro",
// //     m5: "Whitespace",
// //     // Executive templates
// //     e1: "Leadership",
// //     e2: "C-Suite",
// //     e3: "Director",
// //     e4: "Board Member",
// //     e5: "Executive Elite",
// //   }

// //   // Sample data for preview - NOW INCLUDING PUBLICATIONS
// //   const sampleData = {
// //     personalInfo: {
// //       name: "Dr. Sarah Johnson",
// //       title: "Senior Research Scientist & AI Engineer",
// //       email: "sarah.johnson@example.com",
// //       phone: "(555) 123-4567",
// //       location: "San Francisco, CA",
// //     },
// //     summary:
// //       "Experienced research scientist and AI engineer with 8+ years in machine learning, computer vision, and healthcare applications. Published 15+ peer-reviewed papers and led cross-functional teams in developing innovative AI solutions.",
// //     experience: [
// //       {
// //         title: "Senior Research Scientist",
// //         company: "Tech Innovations Inc.",
// //         dates: "2021 - Present",
// //         location: "San Francisco, CA",
// //         description:
// //           "Led development of AI-powered medical imaging solutions. Managed team of 8 researchers. Published 6 papers in top-tier conferences. Secured $2M in research funding.",
// //       },
// //       {
// //         title: "AI Research Engineer",
// //         company: "Digital Health Solutions",
// //         dates: "2019 - 2021",
// //         location: "Remote",
// //         description:
// //           "Developed machine learning models for healthcare applications. Collaborated with medical professionals to implement AI solutions. Published 4 research papers and filed 2 patents.",
// //       },
// //     ],
// //     education: [
// //       {
// //         degree: "Ph.D. in Computer Science",
// //         institution: "Stanford University",
// //         dates: "2015 - 2019",
// //         location: "Stanford, CA",
// //       },
// //       {
// //         degree: "M.S. in Machine Learning",
// //         institution: "MIT",
// //         dates: "2013 - 2015",
// //         location: "Cambridge, MA",
// //       },
// //     ],
// //     projects: [
// //       {
// //         name: "AI-Powered Medical Diagnosis System",
// //         description:
// //           "Developed a deep learning system for automated medical image analysis with 95% accuracy. Implemented using TensorFlow and deployed on cloud infrastructure.",
// //         technologies: "Python, TensorFlow, AWS, Docker",
// //         link: "https://github.com/sarahjohnson/medical-ai",
// //         dates: "2023 - Present",
// //       },
// //       {
// //         name: "Computer Vision for Autonomous Vehicles",
// //         description:
// //           "Built real-time object detection and tracking system for autonomous driving applications using state-of-the-art computer vision techniques.",
// //         technologies: "PyTorch, OpenCV, CUDA, ROS",
// //         link: "https://autonomous-vision-demo.com",
// //         dates: "2022 - 2023",
// //       },
// //     ],
// //     publications: [
// //       {
// //         title: "Deep Learning Applications in Medical Image Analysis: A Comprehensive Survey",
// //         authors: "Sarah Johnson, Michael Chen, David Rodriguez",
// //         journal: "IEEE Transactions on Medical Imaging",
// //         year: "2023",
// //         links: [
// //           {
// //             type: "DOI",
// //             url: "https://doi.org/10.1109/TMI.2023.1234567",
// //             description: "Official DOI link",
// //           },
// //           {
// //             type: "PDF",
// //             url: "https://arxiv.org/pdf/2023.12345.pdf",
// //             description: "ArXiv preprint",
// //           },
// //           {
// //             type: "Google Scholar",
// //             url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=abc123&citation_for_view=abc123:def456",
// //             description: "Google Scholar page",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Automated Diagnosis of Skin Cancer Using Convolutional Neural Networks",
// //         authors: "Sarah Johnson, Lisa Wang, Robert Kim",
// //         journal: "Nature Medicine",
// //         year: "2022",
// //         links: [
// //           {
// //             type: "DOI",
// //             url: "https://doi.org/10.1038/s41591-022-01234-5",
// //             description: "Nature Medicine publication",
// //           },
// //           {
// //             type: "Supplementary",
// //             url: "https://static-content.springer.com/esm/art%3A10.1038%2Fs41591-022-01234-5/MediaObjects/supplementary.pdf",
// //             description: "Supplementary materials",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Federated Learning for Privacy-Preserving Healthcare AI",
// //         authors: "Sarah Johnson, Alex Thompson, Maria Garcia, James Wilson",
// //         journal: "Proceedings of ICML 2022",
// //         year: "2022",
// //         links: [
// //           {
// //             type: "ArXiv",
// //             url: "https://arxiv.org/abs/2022.06789",
// //             description: "ArXiv preprint",
// //           },
// //           {
// //             type: "Conference",
// //             url: "https://proceedings.mlr.press/v162/johnson22a.html",
// //             description: "ICML proceedings",
// //           },
// //         ],
// //       },
// //     ],
// //     skills: [
// //       "Machine Learning",
// //       "Deep Learning",
// //       "Computer Vision",
// //       "Python",
// //       "TensorFlow",
// //       "PyTorch",
// //       "Research",
// //       "Publications",
// //     ],
// //   }

// //   useEffect(() => {
// //     // Simulate loading the template
// //     setTimeout(() => {
// //       setIsLoading(false)
// //     }, 1000)
// //   }, [])

// //   const handleSelectTemplate = () => {
// //     setShowModeSelection(true)
// //   }

// //   const handleModeSelection = (mode: "guided" | "freeform") => {
// //     setShowModeSelection(false)
// //     if (mode === "guided") {
// //       // Navigate to guided input page
// //       router.push(`/guided-input?template=${templateId}&category=${categoryId}`)
// //     } else {
// //       // Navigate to the audio input page for freeform mode
// //       router.push(`/audio-input?template=${templateId}&category=${categoryId}&mode=${mode}`)
// //     }
// //   }

// //   const handleGoBack = () => {
// //     router.push(`/templates?category=${categoryId}`)
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p>Loading template preview...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   // Render the appropriate template based on the template ID
// //   const renderTemplate = () => {
// //     // First character of template ID indicates the category
// //     const templateType = templateId.charAt(0)
// //     const templateNumber = templateId.substring(1)
// //     switch (templateType) {
// //       case "p":
// //         return <ProfessionalTemplate variant={templateNumber} data={sampleData} />
// //       case "c":
// //         return <CreativeTemplate variant={templateNumber} data={sampleData} />
// //       case "m":
// //         return <MinimalTemplate variant={templateNumber} data={sampleData} />
// //       case "e":
// //         return <ExecutiveTemplate variant={templateNumber} data={sampleData} />
// //       default:
// //         return <ProfessionalTemplate variant="1" data={sampleData} />
// //     }
// //   }

// //   return (
// //     <div className="container mx-auto py-8 px-6">
// //       <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
// //         <ArrowLeft className="mr-2 h-4 w-4" />
// //         Back to selection
// //       </Button>

// //       <div className="text-center mb-8">
// //         <h1 className="text-3xl font-bold">
// //           {categoryNames[categoryId] || "Template"} - {templateNames[templateId] || "Preview"}
// //         </h1>
// //         <p className="text-gray-600 mt-2">Template Preview with Sample Publications</p>
// //       </div>

// //       <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
// //         <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
// //       </div>

// //       <div className="text-center mt-8">
// //         <p className="text-gray-600 mb-4">
// //           Like this template? Select it and choose how you'd like to provide your resume information.
// //         </p>
// //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //           <Button onClick={handleSelectTemplate}>Select This Template</Button>
// //           <Button variant="outline" onClick={handleGoBack}>
// //             View Other Templates
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Mode Selection Modal */}
// //       <Dialog open={showModeSelection} onOpenChange={setShowModeSelection}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle className="text-center text-xl font-semibold">Choose Your Input Mode</DialogTitle>
// //             <DialogDescription className="text-center text-gray-600">
// //               How would you like to provide your resume information?
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="grid gap-4 py-4">
// //             <Button
// //               onClick={() => handleModeSelection("guided")}
// //               className="h-auto p-6 flex flex-col items-center gap-3 text-left"
// //               variant="outline"
// //             >
// //               <MessageSquare className="h-8 w-8 text-blue-600" />
// //               <div>
// //                 <div className="font-semibold text-lg">Guided Mode</div>
// //                 <div className="text-sm text-gray-600 mt-1">We'll ask you questions step by step</div>
// //                 <div className="text-xs text-gray-500 mt-2">Perfect for structured input with guided prompts</div>
// //               </div>
// //             </Button>
// //             <Button
// //               onClick={() => handleModeSelection("freeform")}
// //               className="h-auto p-6 flex flex-col items-center gap-3 text-left"
// //               variant="outline"
// //             >
// //               <Mic className="h-8 w-8 text-green-600" />
// //               <div>
// //                 <div className="font-semibold text-lg">Freeform Mode</div>
// //                 <div className="text-sm text-gray-600 mt-1">Speak everything in your own flow</div>
// //                 <div className="text-xs text-gray-500 mt-2">
// //                   Ideal for natural conversation and detailed explanations
// //                 </div>
// //               </div>
// //             </Button>
// //           </div>
// //           <div className="text-center">
// //             <Button variant="ghost" onClick={() => setShowModeSelection(false)} className="text-sm">
// //               Cancel
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   )
// // }









// "use client"

// import { use, useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, MessageSquare, Mic } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import {
//   DriverTemplate,
//   DeliveryPartnerTemplate,
//   ElectricianTemplate,
//   TailorTemplate,
//   CookChefTemplate,
//   SecurityGuardTemplate,
//   SalesAssistantTemplate,
//   MechanicTemplate,
// } from "@/components/resume-templates"

// export default function PreviewTemplate({
//   params,
// }: {
//   params: Promise<{ categoryId: string; templateId: string }>
// }) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [showModeSelection, setShowModeSelection] = useState(false)
//   const router = useRouter()
//   const { categoryId, templateId } = use(params)

//   const categoryNames: Record<string, string> = {
//     "1": "Driver",
//     "2": "Delivery Partner",
//     "3": "Electrician",
//     "4": "Tailor",
//     "5": "Cook/Chef",
//     "6": "Security Guard",
//     "7": "Sales Assistant",
//     "8": "Mechanic",
//   }

//   const templateNames: Record<string, string> = {
//     // Driver templates
//     d1: "Professional Driver",
//     d2: "Commercial Driver",
//     d3: "Delivery Driver",
//     // Delivery Partner templates
//     dp1: "Food Delivery Pro",
//     dp2: "Courier Specialist",
//     dp3: "Multi-Platform Partner",
//     // Electrician templates
//     e1: "Licensed Electrician",
//     e2: "Residential Specialist",
//     e3: "Commercial Electrician",
//     // Tailor templates
//     t1: "Master Tailor",
//     t2: "Alterations Expert",
//     t3: "Fashion Tailor",
//     // Cook/Chef templates
//     c1: "Professional Chef",
//     c2: "Home Cook",
//     c3: "Restaurant Cook",
//     // Security Guard templates
//     s1: "Licensed Security",
//     s2: "Corporate Security",
//     s3: "Event Security",
//     // Sales Assistant templates
//     sa1: "Retail Associate",
//     sa2: "Shop Assistant",
//     sa3: "Sales Specialist",
//     // Mechanic templates
//     m1: "Auto Mechanic",
//     m2: "Two-Wheeler Specialist",
//     m3: "Multi-Vehicle Mechanic",
//   }

//   const getSampleData = (categoryId: string) => {
//     switch (categoryId) {
//       case "1": // Driver
//         return {
//           personalInfo: {
//             name: "Rajesh Kumar",
//             title: "Professional Driver",
//             email: "rajesh.driver@example.com",
//             phone: "+91 98765 43210",
//             location: "Mumbai, Maharashtra",
//           },
//           summary:
//             "Experienced professional driver with 8+ years of safe driving record. Licensed for multiple vehicle types including cars, trucks, and commercial vehicles. Excellent knowledge of Mumbai routes and traffic patterns.",
//           licenses: ["Commercial Driving License", "Heavy Vehicle License", "Passenger Transport License"],
//           education: [
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Mumbai Public School",
//               year: "2014",
//               details: "Commerce stream with focus on mathematics and business studies",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Mumbai Public School",
//               year: "2012",
//               details: "Completed with 75% marks",
//             },
//             {
//               degree: "Commercial Driving Course",
//               institution: "Mumbai Driving Institute",
//               year: "2016",
//               details: "Specialized training in heavy vehicle operation and safety protocols",
//             },
//             {
//               degree: "Defensive Driving Certification",
//               institution: "Road Safety Academy",
//               year: "2019",
//               details: "Advanced safety techniques and accident prevention",
//             },
//           ],
//           achievements: [
//             "8 years accident-free driving record",
//             "Employee of the Year 2022 - Mumbai Transport Services",
//             "Safe Driver Award 2021",
//             "Perfect attendance record for 3 consecutive years",
//           ],
//           experience: [
//             {
//               title: "Senior Driver",
//               company: "Mumbai Transport Services",
//               dates: "2020 - Present",
//               location: "Mumbai, MH",
//               description:
//                 "Drive commercial vehicles for corporate clients. Maintained 100% safety record with zero accidents. Handle vehicle maintenance and route planning.",
//             },
//             {
//               title: "Delivery Driver",
//               company: "Quick Logistics",
//               dates: "2018 - 2020",
//               location: "Mumbai, MH",
//               description:
//                 "Delivered packages across Mumbai and suburbs. Managed daily delivery schedules and maintained customer relationships.",
//             },
//           ],
//           vehicleTypes: ["Cars", "Trucks", "Vans", "Auto-rickshaw"],
//           safetyRecord: "8 years accident-free driving",
//           skills: ["Safe Driving", "Route Planning", "Vehicle Maintenance", "Customer Service", "GPS Navigation"],
//         }
//       case "2": // Delivery Partner
//         return {
//           personalInfo: {
//             name: "Amit Sharma",
//             title: "Food Delivery Partner",
//             email: "amit.delivery@example.com",
//             phone: "+91 87654 32109",
//             location: "Delhi, India",
//           },
//           summary:
//             "Dedicated food delivery partner with 4+ years experience across multiple platforms. Consistently high ratings and fast delivery times. Expert in Delhi NCR routes and traffic optimization.",
//           platforms: ["Zomato", "Swiggy", "Uber Eats", "Dunzo"],
//           stats: {
//             totalDeliveries: "5000+",
//             rating: "4.8/5.0",
//             onTimeDelivery: "95%",
//           },
//           education: [
//             {
//               degree: "Bachelor of Arts (B.A.)",
//               institution: "Delhi University",
//               year: "2018",
//               details: "Graduated with English Literature major",
//             },
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Delhi Public School",
//               year: "2015",
//               details: "Arts stream with English, History, and Political Science",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Delhi Public School",
//               year: "2013",
//               details: "Completed with 78% marks",
//             },
//             {
//               degree: "Customer Service Training",
//               institution: "Zomato Training Center",
//               year: "2021",
//               details: "Professional customer interaction and service excellence",
//             },
//             {
//               degree: "Food Safety & Hygiene Certificate",
//               institution: "Food Safety Authority",
//               year: "2020",
//               details: "Safe food handling and delivery practices",
//             },
//           ],
//           achievements: [
//             "Top Performer Award - Zomato 2023",
//             "5000+ successful deliveries completed",
//             "Maintained 4.8+ rating for 2 consecutive years",
//             "Zero customer complaints in last 12 months",
//           ],
//           experience: [
//             {
//               title: "Senior Delivery Partner",
//               company: "Zomato",
//               dates: "2021 - Present",
//               location: "Delhi, India",
//               description:
//                 "Handle food deliveries across Delhi NCR. Maintain high customer ratings and fast delivery times. Manage multiple orders efficiently during peak hours.",
//             },
//           ],
//           vehicle: "Motorcycle",
//           coverageAreas: ["Central Delhi", "South Delhi", "Gurgaon", "Noida"],
//           skills: ["Fast Delivery", "Customer Service", "Route Optimization", "Food Handling", "Time Management"],
//         }
//       case "3": // Electrician
//         return {
//           personalInfo: {
//             name: "Suresh Patel",
//             title: "Licensed Electrician",
//             email: "suresh.electrician@example.com",
//             phone: "+91 76543 21098",
//             location: "Pune, Maharashtra",
//           },
//           summary:
//             "Certified electrician with 10+ years experience in residential and commercial electrical work. Specialized in electrical installations, repairs, and safety inspections.",
//           certifications: [
//             "ITI Electrician Certificate",
//             "Electrical Safety Training",
//             "Industrial Wiring Certificate",
//           ],
//           education: [
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Maharashtra State Board",
//               year: "2012",
//               details: "Science stream with Physics, Chemistry, and Mathematics",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Maharashtra State Board",
//               year: "2010",
//               details: "Completed with 82% marks",
//             },
//             {
//               degree: "ITI in Electrical Engineering",
//               institution: "Government ITI Pune",
//               year: "2014",
//               details: "2-year diploma in electrical systems and industrial wiring",
//             },
//             {
//               degree: "Advanced Electrical Safety Course",
//               institution: "Maharashtra Electrical Board",
//               year: "2018",
//               details: "High voltage safety and industrial electrical systems",
//             },
//           ],
//           achievements: [
//             "Best Electrician Award - Pune Electrical Association 2022",
//             "Zero safety incidents in 10+ years of work",
//             "Successfully completed 500+ residential installations",
//             "Certified trainer for junior electricians",
//           ],
//           experience: [
//             {
//               title: "Senior Electrician",
//               company: "Pune Electrical Services",
//               dates: "2019 - Present",
//               location: "Pune, MH",
//               description:
//                 "Handle residential and commercial electrical installations. Perform safety inspections and troubleshoot electrical issues. Train junior electricians.",
//             },
//           ],
//           specializations: ["Home Wiring", "Industrial Electrical", "Motor Repairs", "Panel Installation"],
//           tools: ["Multimeter", "Wire Strippers", "Conduit Bender", "Voltage Tester"],
//           skills: [
//             "Electrical Installation",
//             "Troubleshooting",
//             "Safety Protocols",
//             "Blueprint Reading",
//             "Motor Repair",
//           ],
//         }
//       case "4": // Tailor
//         return {
//           personalInfo: {
//             name: "Meera Devi",
//             title: "Master Tailor",
//             email: "meera.tailor@example.com",
//             phone: "+91 65432 10987",
//             location: "Jaipur, Rajasthan",
//           },
//           summary:
//             "Skilled master tailor with 15+ years experience in custom clothing and alterations. Specialized in traditional Indian wear and modern fashion. Known for precision and quality craftsmanship.",
//           specializations: ["Saree Blouses", "Lehenga", "Suits", "Alterations", "Custom Design"],
//           education: [
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Rajasthan Board",
//               year: "2007",
//               details: "Arts stream with focus on home science and fine arts",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Rajasthan Board",
//               year: "2005",
//               details: "Completed with 70% marks",
//             },
//             {
//               degree: "Fashion Design Certificate",
//               institution: "Rajasthan Institute of Fashion Technology",
//               year: "2009",
//               details: "Pattern making, garment construction, and design principles",
//             },
//             {
//               degree: "Traditional Embroidery Course",
//               institution: "Jaipur Craft Council",
//               year: "2012",
//               details: "Hand embroidery techniques and traditional Rajasthani designs",
//             },
//           ],
//           achievements: [
//             "Winner - Best Traditional Wear Design Competition 2021",
//             "Featured in Rajasthan Fashion Week 2020",
//             "Successfully completed 1000+ custom orders",
//             "Master Craftsperson Recognition - Handicrafts Board",
//           ],
//           experience: [
//             {
//               title: "Master Tailor",
//               company: "Royal Fashion House",
//               dates: "2015 - Present",
//               location: "Jaipur, RJ",
//               description:
//                 "Create custom clothing for weddings and special occasions. Handle complex alterations and design modifications. Train apprentice tailors.",
//             },
//           ],
//           techniques: ["Hand Stitching", "Machine Sewing", "Embroidery", "Pattern Making"],
//           equipment: ["Industrial Sewing Machine", "Overlock Machine", "Steam Iron", "Cutting Table"],
//           skills: ["Pattern Making", "Precision Cutting", "Hand Stitching", "Design", "Customer Consultation"],
//         }
//       case "5": // Cook/Chef
//         return {
//           personalInfo: {
//             name: "Ravi Singh",
//             title: "Professional Chef",
//             email: "ravi.chef@example.com",
//             phone: "+91 54321 09876",
//             location: "Bangalore, Karnataka",
//           },
//           summary:
//             "Experienced chef with 12+ years in restaurant kitchens and catering. Specialized in North Indian and South Indian cuisines. Expert in menu planning and kitchen management.",
//           cuisineTypes: ["North Indian", "South Indian", "Chinese", "Continental"],
//           education: [
//             {
//               degree: "Bachelor of Hotel Management (BHM)",
//               institution: "Christ University, Bangalore",
//               year: "2010",
//               details: "Specialized in culinary arts and hospitality management",
//             },
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Karnataka State Board",
//               year: "2007",
//               details: "Commerce stream with business studies and economics",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Karnataka State Board",
//               year: "2005",
//               details: "Completed with 85% marks",
//             },
//             {
//               degree: "Diploma in Culinary Arts",
//               institution: "Institute of Hotel Management, Bangalore",
//               year: "2012",
//               details: "Professional cooking techniques, menu planning, and kitchen management",
//             },
//             {
//               degree: "Food Safety Manager Certification",
//               institution: "Food Safety Authority of India",
//               year: "2020",
//               details: "HACCP principles and food safety management systems",
//             },
//           ],
//           achievements: [
//             "Winner - South Indian Cuisine Competition 2022",
//             "Featured in Bangalore Food Festival 2021",
//             "Successfully managed kitchen serving 500+ customers daily",
//             "Trained 25+ junior chefs and kitchen staff",
//           ],
//           experience: [
//             {
//               title: "Head Chef",
//               company: "Spice Garden Restaurant",
//               dates: "2020 - Present",
//               location: "Bangalore, KA",
//               description:
//                 "Manage kitchen operations for 100+ seat restaurant. Create new menu items and maintain food quality standards. Lead team of 8 kitchen staff.",
//             },
//           ],
//           certifications: ["Food Safety Certificate", "Kitchen Management Course"],
//           specialties: ["Biryani", "Dosa", "Tandoor Items", "Sweets"],
//           skills: ["Menu Planning", "Kitchen Management", "Food Safety", "Cost Control", "Team Leadership"],
//         }
//       case "6": // Security Guard
//         return {
//           personalInfo: {
//             name: "Vikram Yadav",
//             title: "Licensed Security Guard",
//             email: "vikram.security@example.com",
//             phone: "+91 43210 98765",
//             location: "Gurgaon, Haryana",
//           },
//           summary:
//             "Professional security guard with 6+ years experience in corporate and residential security. Trained in surveillance, access control, and emergency response procedures.",
//           licenses: ["Private Security License", "Fire Safety Training", "First Aid Certificate"],
//           education: [
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Haryana Board",
//               year: "2016",
//               details: "Arts stream with physical education and general studies",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Haryana Board",
//               year: "2014",
//               details: "Completed with 68% marks",
//             },
//             {
//               degree: "Security Guard Training Program",
//               institution: "Delhi Security Training Institute",
//               year: "2018",
//               details: "Comprehensive security procedures, surveillance, and emergency response",
//             },
//             {
//               degree: "First Aid & CPR Certification",
//               institution: "Red Cross Society",
//               year: "2021",
//               details: "Emergency medical response and life-saving techniques",
//             },
//           ],
//           achievements: [
//             "Security Guard of the Year 2022 - SecureMax Services",
//             "Successfully prevented 3 security breaches",
//             "Perfect attendance record for 4 years",
//             "Commendation for quick emergency response",
//           ],
//           experience: [
//             {
//               title: "Senior Security Guard",
//               company: "SecureMax Services",
//               dates: "2019 - Present",
//               location: "Gurgaon, HR",
//               description:
//                 "Provide security for corporate office buildings. Monitor CCTV systems and control access points. Handle visitor management and emergency situations.",
//             },
//           ],
//           training: ["Surveillance Systems", "Access Control", "Emergency Response", "Crowd Control"],
//           shifts: ["Day Shift", "Night Shift", "12-hour Shifts"],
//           skills: ["Surveillance", "Access Control", "Emergency Response", "Report Writing", "Customer Service"],
//         }
//       case "7": // Sales Assistant
//         return {
//           personalInfo: {
//             name: "Priya Gupta",
//             title: "Sales Assistant",
//             email: "priya.sales@example.com",
//             phone: "+91 32109 87654",
//             location: "Chennai, Tamil Nadu",
//           },
//           summary:
//             "Dedicated sales assistant with 5+ years experience in retail and customer service. Excellent product knowledge and proven track record of meeting sales targets.",
//           education: [
//             {
//               degree: "Bachelor of Commerce (B.Com)",
//               institution: "University of Madras",
//               year: "2017",
//               details: "Specialized in business administration and accounting",
//             },
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Tamil Nadu State Board",
//               year: "2014",
//               details: "Commerce stream with accountancy and business mathematics",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Tamil Nadu State Board",
//               year: "2012",
//               details: "Completed with 88% marks",
//             },
//             {
//               degree: "Retail Management Certificate",
//               institution: "Chennai Institute of Retail Management",
//               year: "2019",
//               details: "Customer service, sales techniques, and inventory management",
//             },
//             {
//               degree: "Customer Service Excellence Course",
//               institution: "Professional Development Center",
//               year: "2021",
//               details: "Advanced customer interaction and problem-solving skills",
//             },
//           ],
//           experience: [
//             {
//               title: "Senior Sales Assistant",
//               company: "Fashion Hub",
//               dates: "2021 - Present",
//               location: "Chennai, TN",
//               description:
//                 "Assist customers with product selection and purchases. Handle POS transactions and inventory management. Achieved 120% of monthly sales targets consistently.",
//             },
//           ],
//           productKnowledge: ["Fashion & Apparel", "Electronics", "Home Goods", "Cosmetics"],
//           systems: ["POS Systems", "Inventory Management", "Customer Database"],
//           achievements: [
//             "Employee of the Month (3 times)",
//             "120% Sales Target Achievement",
//             "Best Customer Service Award 2022",
//             "Zero customer complaints in 2023",
//           ],
//           skills: ["Customer Service", "Sales", "POS Systems", "Inventory Management", "Product Knowledge"],
//         }
//       case "8": // Mechanic
//         return {
//           personalInfo: {
//             name: "Arjun Reddy",
//             title: "Auto Mechanic",
//             email: "arjun.mechanic@example.com",
//             phone: "+91 21098 76543",
//             location: "Hyderabad, Telangana",
//           },
//           summary:
//             "Skilled auto mechanic with 9+ years experience in car and motorcycle repairs. Specialized in engine diagnostics, electrical systems, and preventive maintenance.",
//           certifications: [
//             "Automotive Technology Certificate",
//             "Engine Diagnostics Course",
//             "Electrical Systems Training",
//           ],
//           education: [
//             {
//               degree: "Higher Secondary Certificate (12th)",
//               institution: "Telangana State Board",
//               year: "2013",
//               details: "Science stream with Physics, Chemistry, and Mathematics",
//             },
//             {
//               degree: "Secondary School Certificate (10th)",
//               institution: "Telangana State Board",
//               year: "2011",
//               details: "Completed with 76% marks",
//             },
//             {
//               degree: "ITI in Motor Mechanic",
//               institution: "Government ITI Hyderabad",
//               year: "2015",
//               details: "2-year diploma in automotive repair and maintenance",
//             },
//             {
//               degree: "Advanced Diagnostic Systems Course",
//               institution: "Bosch Training Center",
//               year: "2019",
//               details: "Modern vehicle diagnostic equipment and computer systems",
//             },
//           ],
//           achievements: [
//             "Best Mechanic Award - City Auto Garage 2023",
//             "Successfully repaired 2000+ vehicles",
//             "Certified in latest diagnostic technologies",
//             "Zero comeback complaints for complex repairs",
//           ],
//           experience: [
//             {
//               title: "Senior Mechanic",
//               company: "City Auto Garage",
//               dates: "2018 - Present",
//               location: "Hyderabad, TS",
//               description:
//                 "Diagnose and repair various vehicle issues. Perform routine maintenance and complex engine repairs. Handle both cars and motorcycles.",
//             },
//           ],
//           vehicleTypes: ["Cars", "Motorcycles", "Scooters", "Auto-rickshaws"],
//           specializations: ["Engine Repair", "Electrical Systems", "Brake Systems", "Transmission"],
//           tools: ["Diagnostic Scanner", "Hydraulic Lift", "Engine Hoist", "Multimeter"],
//           skills: [
//             "Engine Diagnostics",
//             "Electrical Repair",
//             "Preventive Maintenance",
//             "Problem Solving",
//             "Customer Service",
//           ],
//         }
//       default:
//         return {
//           personalInfo: {
//             name: "Sample Name",
//             title: "Professional Title",
//             email: "sample@example.com",
//             phone: "+91 12345 67890",
//             location: "City, State",
//           },
//           summary: "Professional summary goes here...",
//           experience: [],
//           skills: [],
//         }
//     }
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 1000)
//   }, [])

//   const handleSelectTemplate = () => {
//     setShowModeSelection(true)
//   }

//   const handleModeSelection = (mode: "guided" | "freeform") => {
//     setShowModeSelection(false)
//     if (mode === "guided") {
//       router.push(`/guided-input?template=${templateId}&category=${categoryId}`)
//     } else {
//       router.push(`/audio-input?template=${templateId}&category=${categoryId}&mode=${mode}`)
//     }
//   }

//   const handleGoBack = () => {
//     router.push(`/templates?category=${categoryId}`)
//   }

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p>Loading template preview...</p>
//         </div>
//       </div>
//     )
//   }

//   const renderTemplate = () => {
//     const sampleData = getSampleData(categoryId)
//     const templateType = templateId.substring(0, templateId.length - 1)
//     const templateNumber = templateId.slice(-1)

//     switch (templateType) {
//       case "d":
//         return <DriverTemplate variant={templateNumber} data={sampleData} />
//       case "dp":
//         return <DeliveryPartnerTemplate variant={templateNumber} data={sampleData} />
//       case "e":
//         return <ElectricianTemplate variant={templateNumber} data={sampleData} />
//       case "t":
//         return <TailorTemplate variant={templateNumber} data={sampleData} />
//       case "c":
//         return <CookChefTemplate variant={templateNumber} data={sampleData} />
//       case "s":
//         return <SecurityGuardTemplate variant={templateNumber} data={sampleData} />
//       case "sa":
//         return <SalesAssistantTemplate variant={templateNumber} data={sampleData} />
//       case "m":
//         return <MechanicTemplate variant={templateNumber} data={sampleData} />
//       default:
//         return <DriverTemplate variant="1" data={sampleData} />
//     }
//   }

//   return (
//     <div className="container mx-auto py-8 px-6">
//       <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to selection
//       </Button>

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold">
//           {categoryNames[categoryId] || "Template"} - {templateNames[templateId] || "Preview"}
//         </h1>
//         <p className="text-gray-600 mt-2">Template Preview with Job-Specific Sections</p>
//       </div>

//       <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
//         <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
//       </div>

//       <div className="text-center mt-8">
//         <p className="text-gray-600 mb-4">
//           Like this template? Select it and choose how you'd like to provide your resume information.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Button onClick={handleSelectTemplate}>Select This Template</Button>
//           <Button variant="outline" onClick={handleGoBack}>
//             View Other Templates
//           </Button>
//         </div>
//       </div>

//       {/* Mode Selection Modal */}
//       <Dialog open={showModeSelection} onOpenChange={setShowModeSelection}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-center text-xl font-semibold">Choose Your Input Mode</DialogTitle>
//             <DialogDescription className="text-center text-gray-600">
//               How would you like to provide your resume information?
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <Button
//               onClick={() => handleModeSelection("guided")}
//               className="h-auto p-6 flex flex-col items-center gap-3 text-left"
//               variant="outline"
//             >
//               <MessageSquare className="h-8 w-8 text-blue-600" />
//               <div>
//                 <div className="font-semibold text-lg">Guided Mode</div>
//                 <div className="text-sm text-gray-600 mt-1">We'll ask you questions step by step</div>
//                 <div className="text-xs text-gray-500 mt-2">Perfect for structured input with guided prompts</div>
//               </div>
//             </Button>
//             <Button
//               onClick={() => handleModeSelection("freeform")}
//               className="h-auto p-6 flex flex-col items-center gap-3 text-left"
//               variant="outline"
//             >
//               <Mic className="h-8 w-8 text-green-600" />
//               <div>
//                 <div className="font-semibold text-lg">Freeform Mode</div>
//                 <div className="text-sm text-gray-600 mt-1">Speak everything in your own flow</div>
//                 <div className="text-xs text-gray-500 mt-2">
//                   Ideal for natural conversation and detailed explanations
//                 </div>
//               </div>
//             </Button>
//           </div>
//           <div className="text-center">
//             <Button variant="ghost" onClick={() => setShowModeSelection(false)} className="text-sm">
//               Cancel
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }








"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Mic } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LanguageSelector } from "@/components/language-selector"
import { getTranslation, getTranslatedSampleData, type Language } from "@/lib/translations"
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

export default function PreviewTemplate({
  params,
}: {
  params: Promise<{ categoryId: string; templateId: string }>
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModeSelection, setShowModeSelection] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { categoryId, templateId } = use(params)

  const categoryNames: Record<string, Record<Language, string>> = {
    "1": {
      hi: "ड्राइवर",
      en: "Driver",
      bn: "চালক",
      te: "డ్రైవర్",
      mr: "चालक",
      ta: "ஓட்டுநர்",
      gu: "ડ્રાઇવર",
      kn: "ಚಾಲಕ",
      ml: "ഡ്രൈവർ",
      pa: "ਡਰਾਈਵਰ",
    },
    "2": {
      hi: "डिलीवरी पार्टनर",
      en: "Delivery Partner",
      bn: "ডেলিভারি পার্টনার",
      te: "డేలివరీ పార్ట్‌నర్",
      mr: "डिलीवరी पार्टनर",
      ta: "வணிக பேராளர்",
      gu: "ડિલીવરી પાર્ટનર",
      kn: "வணிக ಪரಾಂಶಿ",
      ml: "ડേലിവറി പാർട്ടനർ",
      pa: "ਡਿਲੀਵਰੀ ਪਾਰਟਨਰ",
    },
    "3": {
      hi: "इलेक्ट्रिकियन",
      en: "Electrician",
      bn: "ইলেকট্রিকিয়ান",
      te: "ఎలెక్ట్రికియన్",
      mr: "इलेक्ट्रिकियन",
      ta: "மின்னாட்டு சுதார்",
      gu: "ઇલેક્ટ્રિકિયન",
      kn: "ಮಾರಿ ಚಾಲಕ",
      ml: "എലക്ട്രിക്കൻ",
      pa: "इलੇਕਟ੍ਰਿਕਨ",
    },
    "4": {
      hi: "टेलर",
      en: "Tailor",
      bn: "টেলর",
      te: "టైలర్",
      mr: "टेलर",
      ta: "வேட்டார்",
      gu: "ટેલર",
      kn: "ೈಲರ್",
      ml: "ടൈലർ",
      pa: "ਟੈਲਰ",
    },
    "5": {
      hi: "कूक/चेफ",
      en: "Cook/Chef",
      bn: "কুক/চেফ",
      te: "కూక్/చేఫ్",
      mr: "कूक/चेफ",
      ta: "வருவர்/வேட்டார்",
      gu: "કૂક/ચેફ",
      kn: "ಕೂಕ/ಚೇಫ",
      ml: "കൂക്കൻ/ചേഫ്",
      pa: "ਕੂਕ/ਚੇਫ",
    },
    "6": {
      hi: "सुरक्षा गार्ड",
      en: "Security Guard",
      bn: "সুরক্ষা গার্ড",
      te: "సురక్ష గార్డ్",
      mr: "सुरक्षा गार्ड",
      ta: "பாதுகாப்பு காவலர்",
      gu: "સુરક્ષા ગાર્ડ",
      kn: "பாதுகாப்பு காவலர்",
      ml: "സുരക്ഷ കാവലർ",
      pa: "ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    "7": {
      hi: "सेल्स असिस्टेंट",
      en: "Sales Assistant",
      bn: "সেলস অ্যাসিস্টেন্ট",
      te: "సేల్స్ అసిస్టెంట్",
      mr: "सेल्स असिस्टेंट",
      ta: "விற்சனி அங்கையாளர்",
      gu: "સેલ્સ અસિસ્ટન્ટ",
      kn: "விற்சனி ಅங்கையாளர்",
      ml: "வിറ്റുക്കൽ അസിസ്ടന്റ്",
      pa: "ਸੇਲ਼ ਅਸਿਸਟੰਟ",
    },
    "8": {
      hi: "मैकेनिक",
      en: "Mechanic",
      bn: "মেকানিক",
      te: "మేకెనిక్",
      mr: "मैकेनिक",
      ta: "வணிக பேராளர்",
      gu: "મેકનિક",
      kn: "வணிக ಪரಾಂಶಿ",
      ml: "മേക്കൻ",
      pa: "ਮੈਕਨਿਕ",
    },
  }

  const templateNames: Record<string, Record<Language, string>> = {
    // Driver templates
    d1: {
      hi: "पेशेवर ड्राइवर",
      en: "Professional Driver",
      bn: "পেশেবর চালক",
      te: "ప్రొఫెషనల్ డ్రైవర్",
      mr: "पेशेवर चालक",
      ta: "வேலை சுதார்",
      gu: "પેશેવર ડ્રાઇવર",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਪ੍ਰੋਫੇਸ਼ਨਲ ਡਰਾਈਵਰ",
    },
    d2: {
      hi: "कमercial ड्राइवर",
      en: "Commercial Driver",
      bn: "কমercial চালক",
      te: "కమర్సీల్ డ్రైవర్",
      mr: "कमercial चालक",
      ta: "வணிக சுதார்",
      gu: "કમર્સીયલ ડ્રાઇવર",
      kn: "ಕમercial ಚಾಲಕ",
      ml: "കമercial ഡ്രൈവർ",
      pa: "ਕਮਰ੍ਸੀਲ ਡਰਾਈਵਰ",
    },
    d3: {
      hi: "डिलीवरी ड्राइवर",
      en: "Delivery Driver",
      bn: "ডেলিভারি চালক",
      te: "డేలివరీ డ్రైవర్",
      mr: "डिलीवरी चालक",
      ta: "வருவர் சுதார்",
      gu: "ડિલીવરી ડ્રાઇવર",
      kn: "వருவர் ಚಾಲಕ",
      ml: "വருவர் ഡ്രൈവർ",
      pa: "ਵਰੂਵਰ ਡਰਾਈਵਰ",
    },
    // Delivery Partner templates
    dp1: {
      hi: "फॉड डिलीवरी प्रो",
      en: "Food Delivery Pro",
      bn: "ফোড ডেলিভারি প্রো",
      te: "ఫోడ్ డేలివరీ ప్రొ",
      mr: "फॉड डिलीवरी प्रो",
      ta: "பாதுகாப்பு பேராளர்",
      gu: "ફોડ ડિલીવરી પ્રો",
      kn: "பாதுகாப்பு பரಾಂಶಿ",
      ml: "பாதுகாப்பு പരാംശി",
      pa: "ਫੋਡ ਡਿਲੀਵਰੀ ਪ੍ਰੋ",
    },
    dp2: {
      hi: "करायर सpecialist",
      en: "Courier Specialist",
      bn: "করায়ের স্পেশালিস্ট",
      te: "కౌરియర్ స్పేషలిస్ట్",
      mr: "करायर सpecialist",
      ta: "வருவர் பொறுத்தவர்",
      gu: "કરાયર સપેશલિસ્ટ",
      kn: "வருவர் பொறுத்தவர்",
      ml: "வருவர் പொறுத்தவர்",
      pa: "ਕਰਾਈਰ ਸਪੇਸ਼ਲਿਸਟ",
    },
    dp3: {
      hi: "मल्टी-प्ल랫फॉर्म पार्टनर",
      en: "Multi-Platform Partner",
      bn: "মাল্টি-প্ল্যাটফর্ম পার্টনার",
      te: "మల్టీ-ప్లాట్‌ఫారంట్ పార్ట్‌నర్",
      mr: "मल्टी-प्ल랫ফॉर्म पार्टनर",
      ta: "பல பத்திரங்கள் பேராளர்",
      gu: "મલ્ટી-પ્લેટ્ફોર્મ પાર્ટનર",
      kn: "பல பத்திரங்கள் ಪரಾಂಶಿ",
      ml: "പല പ്ലാറ്റ്ഫോർമുകളിൽ പേരாളർ",
      pa: "ਮੁਲਟੀ-ਪਲੇਟਫਾਰਮ ਪਾਰਟਨਰ",
    },
    // Electrician templates
    e1: {
      hi: "लाइसेंसेड इलेक्ट्रिकियन",
      en: "Licensed Electrician",
      bn: "লাইসেন্সেড ইলেকট্রিকিয়ান",
      te: "లైసెన్సేడ్ ఎలెక్ట్రికియన్",
      mr: "लाइसेंसेड इलेक्ट्रिकियन",
      ta: "வருவர் சுதார்",
      gu: "લાઇસેન્સેડ ઇલેક્ટ્રિકિયન",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "ലൈസൻസേഡ ഡ്രൈവർ",
      pa: "ਲਾਈਸਨਸੇਡ ਇਲੇਕਟ੍ਰਿਕਨ",
    },
    e2: {
      hi: "घरेलू सpecialist",
      en: "Residential Specialist",
      bn: "ঘরেলু স্পেশালিস্ট",
      te: "ঘরেলু స్పేషలిస్ట్",
      mr: "घरेलू सpecialist",
      ta: "வீட்டு பொறுத்தவர்",
      gu: "ঘরেলু સપેશલિસ્ટ",
      kn: "வீட்டு பொறுத்தவர்",
      ml: "வீட்டு പொறுத்தவர்",
      pa: "ঘরেলু ਸਪੇਸ਼ਲਿਸਟ",
    },
    e3: {
      hi: "कमercial इलेक्ट्रिकियन",
      en: "Commercial Electrician",
      bn: "কমercial ইলেকট্রিকিয়ান",
      te: "కమర్సీల్ ఎలెక్ట్రికియన్",
      mr: "कमercial इलेक्ट्रिकियन",
      ta: "வணிக சுதார்",
      gu: "કમર્સીયલ ઇલેક્ટ્રિકિયન",
      kn: "வணிக ಚಾಲಕ",
      ml: "കമercial ഡ്രൈവർ",
      pa: "ਕਮਰ੍ਸੀਲ ਇਲੇਕਟ੍ਰਿਕਨ",
    },
    // Tailor templates
    t1: {
      hi: "मास्टर टेलर",
      en: "Master Tailor",
      bn: "মাস্টার টেলর",
      te: "మాస్టర్ టైలర్",
      mr: "मास्टर टेलर",
      ta: "வேட்டார் பொறுத்தவர்",
      gu: "માસ્ટર ટેલર",
      kn: "வேட்டார் பொறுத்தவர்",
      ml: "வேட்டார் പொறுத்தவர்",
      pa: "ਮਾਸਟਰ ਟੈਲਰ",
    },
    t2: {
      hi: "अल्टरेशन్‌s एक्सपर్",
      en: "Alterations Expert",
      bn: "অল্টারেশন্স এক্সপার্ট",
      te: "అల్టరేషన్‌లు ఏక్స్‌పర్ట్",
      mr: "अल्टरेशन్‌s एक्सपर్",
      ta: "அறிவு பொறுத்தவர்",
      gu: "અલ્ટરેશન્‌સ એક્સપર્ટ",
      kn: "அறிவு பொறுத்தவர்",
      ml: "அറிவு പொறுத்தவர்",
      pa: "ਅਲਟਰੇਸ਼ਨਾਂ ਏਕਸਪੇਰਟ",
    },
    t3: {
      hi: "फॉशन टेलर",
      en: "Fashion Tailor",
      bn: "ফোশন টেলর",
      te: "ఫాషన్ టైలర్",
      mr: "फॉशन टेलर",
      ta: "பொறுத்தவர்",
      gu: "ફોશન ટેલર",
      kn: "பொறுத்தவர்",
      ml: "பொறுத்தவர்",
      pa: "ਫਾਸ਼ਨ ਟੈਲਰ",
    },
    // Cook/Chef templates
    c1: {
      hi: "पेशेवर चेफ",
      en: "Professional Chef",
      bn: "পেশেবর চেফ",
      te: "ప్రొఫెషనల్ చేఫ్",
      mr: "पेशेवर चेफ",
      ta: "வேலை சுதார்",
      gu: "પેશેવર ચેફ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚೇಫ್",
      ml: "പേഷോവർ ചേഫ്",
      pa: "ਪ੍ਰੋਫੇਸ਼ਨਲ ਚੇਫ",
    },
    c2: {
      hi: "घरेलू कूक",
      en: "Home Cook",
      bn: "ঘরেলু কূক",
      te: "ঘরেলু కూక్",
      mr: "घरেলू कूক",
      ta: "வீட்டு குடியர்",
      gu: "ঘরেলু કૂક",
      kn: "வீட்டு குடியர்",
      ml: "வீட்டு കൂക്കൻ",
      pa: "ਘਰੇਲੂ ਕੂਕ",
    },
    c3: {
      hi: "रेस्टरेंट कूक",
      en: "Restaurant Cook",
      bn: "রেস্টরেন্ট কূক",
      te: "రెస్టరాంట్ కూక్",
      mr: "रेस्टरें कूক",
      ta: "வணிக குடியர்",
      gu: "રেસ્ટરાંટ કૂક",
      kn: "வணிக ಕுடியர்",
      ml: "வணிக കൂക്കൻ",
      pa: "ਰੇਸਟਰੰਟ ਕੂਕ",
    },
    // Security Guard templates
    s1: {
      hi: "लाइसेंसेड सुरक्षा गार्ड",
      en: "Licensed Security Guard",
      bn: "লাইসেন্সেড সুরক্ষা গার্ড",
      te: "లైసెన్సేడ్ సురక్ష గార్డ్",
      mr: "लाइसेंसेड सुरक्षा गार्ड",
      ta: "வருவர் சுதார்",
      gu: "લાઇસેન્સેડ સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "ലൈസൻസേഡ ഡ്രൈവർ",
      pa: "ਲਾਈਸਨਸੇਡ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    s2: {
      hi: "कॉર्पोरेट सुरक्षा गार्ड",
      en: "Corporate Security Guard",
      bn: "ক৉র্পোরেট সুরক্ষা গার্ড",
      te: "కార్పొరేట్ సురక్ష గార్ડ్",
      mr: "कॉর्पोरेट सुरक्षा गार्ड",
      ta: "வேலை சுதார்",
      gu: "કૉર્પોરেট સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਕ੉ਰਪੋਰੇਟ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    s3: {
      hi: "इवेंट सुरक्षा गार्ड",
      en: "Event Security Guard",
      bn: "ইভেন্ট সুরক্ষা গার্ড",
      te: "ఇవెంట్ సురక్ష గార్ડ్",
      mr: "इवेंट सुरक्षा गार्ड",
      ta: "வருவர் சுதார்",
      gu: "ઇવેન્ટ સુરક્ષા ગાર્ડ",
      kn: "ಪ್ರೊಫೆಸನಲ್ ಚಾಲಕ",
      ml: "പേഷോവർ ഡ്രൈവർ",
      pa: "ਇਵੇਂਟ ਸੁਰਕਸ਼ਾ ਗਾਰਡ",
    },
    // Sales Assistant templates
    sa1: {
      hi: "रेटेल असिस्टेंट",
      en: "Retail Associate",
      bn: "রেটেল অ্যাসিস্টেন্ট",
      te: "రెట్‌ల్ అసిస్టెంట్",
      mr: "रेटेल असिस्टेंट",
      ta: "வருவர் சுதார்",
      gu: "રেટેલ અસિસ્ટન્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਰੇਟਲ ਅਸਿਸਟੰਟ",
    },
    sa2: {
      hi: "शॉप असिस्टेंट",
      en: "Shop Assistant",
      bn: "শপ অ্যাসিস্টেন্ট",
      te: "షాప్ అసిస్టెంట్",
      mr: "शॉप असिस्टेंट",
      ta: "வருவர் சுதார்",
      gu: "શોપ અસિસ્ટન્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਸ਼ੋਪ ਅਸਿਸਟੰਟ",
    },
    sa3: {
      hi: "सेल्स सpecialist",
      en: "Sales Specialist",
      bn: "সেল্স স্পেশালিস্ট",
      te: "సేల్స్ స్పేషలిస్ట్",
      mr: "सेल्स सpecialist",
      ta: "வருவர் சுதார்",
      gu: "સેલ્સ સપેશલિસ્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਸੇਲ਼ ਸਪੇਸ਼ਲਿਸਟ",
    },
    // Mechanic templates
    m1: {
      hi: "ऑटो मैकेनिक",
      en: "Auto Mechanic",
      bn: "অটো মেকানিক",
      te: "ఆటో మేకనిక్",
      mr: "ऑो मैकेनिक",
      ta: "வருவர் சுதார்",
      gu: "અટો મેકનિક",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ऑਟੋ ਮੈਕਨਿਕ",
    },
    m2: {
      hi: "टై-వీలర్ సpecialist",
      en: "Two-Wheeler Specialist",
      bn: "টৈ-ভিউলার স্পেশালিস্ট",
      te: "టై-వీలర్ స్పేషలిస్ట్",
      mr: "टై-వీలర్ सpecialist",
      ta: "வருவர் சுதார்",
      gu: "ટૈ-વીલર સપેશલિસ્ટ",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਟੈ-ਵੀਲਰ ਸਪੇਸ਼ਲਿਸਟ",
    },
    m3: {
      hi: "मल्टी-वेहिकल मैकेनिक",
      en: "Multi-Vehicle Mechanic",
      bn: "মাল্টি-ভেহিকেল মেকানিক",
      te: "మల్టీ-వేహికల్ మేకనిక్",
      mr: "मल्टी-वेहিকల मैकेनिक",
      ta: "வருவர் சுதார்",
      gu: "મલ્ટી-વેહિકલ મેકનિક",
      kn: "வருவர் ಚಾಲಕ",
      ml: "வருவர் ഡ്രൈവർ",
      pa: "ਮੁਲਟੀ-ਵੇਹਿਕਲ ਮੈਕਨਿਕ",
    },
  }

  const getSampleData = (categoryId: string, language: Language) => {
    return getTranslatedSampleData(categoryId, language)
  }

  useEffect(() => {
    const langFromUrl = (searchParams.get("lang") as Language) || "en"
    setCurrentLanguage(langFromUrl)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [searchParams])

  const handleSelectTemplate = () => {
    setShowModeSelection(true)
  }

  const handleModeSelection = (mode: "guided" | "freeform") => {
    setShowModeSelection(false)
    if (mode === "guided") {
      router.push(`/guided-input?template=${templateId}&category=${categoryId}&lang=${currentLanguage}`)
    } else {
      router.push(`/audio-input?template=${templateId}&category=${categoryId}&mode=${mode}&lang=${currentLanguage}`)
    }
  }

  const handleGoBack = () => {
    router.push(`/templates?category=${categoryId}&lang=${currentLanguage}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{getTranslation("loadingTemplatePreview", currentLanguage)}</p>
        </div>
      </div>
    )
  }

  const renderTemplate = () => {
    const sampleData = getSampleData(categoryId, currentLanguage)
    const templateType = templateId.substring(0, templateId.length - 1)
    const templateNumber = templateId.slice(-1)

    switch (templateType) {
      case "d":
        return <DriverTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "dp":
        return <DeliveryPartnerTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "e":
        return <ElectricianTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "t":
        return <TailorTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "c":
        return <CookChefTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "s":
        return <SecurityGuardTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "sa":
        return <SalesAssistantTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      case "m":
        return <MechanicTemplate variant={templateNumber} data={sampleData} language={currentLanguage} />
      default:
        return <DriverTemplate variant="1" data={sampleData} language={currentLanguage} />
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Language Selector and Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="sm" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {getTranslation("backToDashboard", currentLanguage)}
        </Button>
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {categoryNames[categoryId]?.[currentLanguage] || "Template"} -{" "}
          {templateNames[templateId]?.[currentLanguage] || "Preview"}
        </h1>
        <p className="text-gray-600 mt-2">
          {getTranslation("templatePreviewWithJobSpecificSections", currentLanguage)}
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">{getTranslation("likeThisTemplate", currentLanguage)}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleSelectTemplate}>{getTranslation("selectThisTemplate", currentLanguage)}</Button>
          <Button variant="outline" onClick={handleGoBack}>
            {getTranslation("viewOtherTemplates", currentLanguage)}
          </Button>
        </div>
      </div>

      {/* Mode Selection Modal */}
      <Dialog open={showModeSelection} onOpenChange={setShowModeSelection}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              {getTranslation("chooseYourInputMode", currentLanguage)}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {getTranslation("howWouldYouLikeToProvideYourResumeInformation", currentLanguage)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => handleModeSelection("guided")}
              className="h-auto p-6 flex flex-col items-center gap-3 text-left"
              variant="outline"
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold text-lg">{getTranslation("guidedMode", currentLanguage)}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getTranslation("weWillAskYouQuestionsStepByStep", currentLanguage)}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {getTranslation("perfectForStructuredInputWithGuidedPrompts", currentLanguage)}
                </div>
              </div>
            </Button>
            <Button
              onClick={() => handleModeSelection("freeform")}
              className="h-auto p-6 flex flex-col items-center gap-3 text-left"
              variant="outline"
            >
              <Mic className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold text-lg">{getTranslation("freeformMode", currentLanguage)}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getTranslation("speakEverythingInYourOwnFlow", currentLanguage)}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {getTranslation("idealForNaturalConversationAndDetailedExplanations", currentLanguage)}
                </div>
              </div>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="ghost" onClick={() => setShowModeSelection(false)} className="text-sm">
              {getTranslation("cancel", currentLanguage)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

