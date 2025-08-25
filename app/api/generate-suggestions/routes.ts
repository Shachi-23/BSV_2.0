import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/openrouter-suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error("Failed to get AI suggestions")
    }

    const result = await response.json()

    console.log("[v0] Generated AI suggestions:", result.suggestions)
    console.log("[v0] Additional suggestions:", result.additionalSuggestions)

    return NextResponse.json({
      suggestions: result.suggestions || [],
      additionalSuggestions: result.additionalSuggestions || [],
    })
  } catch (error) {
    console.error("[v0] Error generating suggestions:", error)
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
