"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

export function LineChart({ data, title, description }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
        </CardContent>
      </Card>
    )
  }

  const maxValue = Math.max(...data.map((d) => d.count))
  const minValue = Math.min(...data.map((d) => d.count))
  const range = maxValue - minValue || 1

  // Calculate trend
  const firstValue = data[0]?.count || 0
  const lastValue = data[data.length - 1]?.count || 0
  const trend = lastValue - firstValue
  const trendPercentage = firstValue > 0 ? ((trend / firstValue) * 100).toFixed(1) : 0

  // Generate SVG path for the line
  const generatePath = () => {
    if (data.length < 2) return ""

    const width = 100
    const height = 100
    const stepX = width / (data.length - 1)

    let path = ""
    data.forEach((point, index) => {
      const x = index * stepX
      const y = height - ((point.count - minValue) / range) * height

      if (index === 0) {
        path += `M ${x} ${y}`
      } else {
        path += ` L ${x} ${y}`
      }
    })

    return path
  }

  // Generate area path
  const generateAreaPath = () => {
    if (data.length < 2) return ""

    const width = 100
    const height = 100
    const stepX = width / (data.length - 1)

    let path = ""
    data.forEach((point, index) => {
      const x = index * stepX
      const y = height - ((point.count - minValue) / range) * height

      if (index === 0) {
        path += `M ${x} ${height} L ${x} ${y}`
      } else {
        path += ` L ${x} ${y}`
      }
    })

    path += ` L ${100} ${height} Z`
    return path
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="flex items-center gap-2 text-sm">
          {trend >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trend >= 0 ? "text-green-600" : "text-red-600"}>
            {trend >= 0 ? "+" : ""}
            {trendPercentage}% from first to last
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          {/* Chart Container */}
          <div className="w-full h-full relative">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Area fill */}
              <path d={generateAreaPath()} fill="url(#gradient)" opacity="0.3" />

              {/* Line */}
              <path
                d={generatePath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - ((point.count - minValue) / range) * 100

                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={hoveredIndex === index ? "3" : "2"}
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                )
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
              <div
                className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs pointer-events-none z-10"
                style={{
                  left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
                  top: `${100 - ((data[hoveredIndex].count - minValue) / range) * 100}%`,
                  transform: "translate(-50%, -100%)",
                  marginTop: "-8px",
                }}
              >
                <div>{data[hoveredIndex].date}</div>
                <div className="font-semibold">{data[hoveredIndex].count} registrations</div>
              </div>
            )}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            <span>{maxValue}</span>
            <span>{Math.round((maxValue + minValue) / 2)}</span>
            <span>{minValue}</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 mt-2">
            <span>{data[0]?.date}</span>
            {data.length > 2 && <span>{data[Math.floor(data.length / 2)]?.date}</span>}
            <span>{data[data.length - 1]?.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
