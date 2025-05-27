"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function BarChart({ data, title, description }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
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

  const maxValue = Math.max(...data.map((d) => d.total_registrations))
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#84cc16",
    "#f97316",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2 relative">
          {data.map((item, index) => {
            const height = (item.total_registrations / maxValue) * 100
            const color = colors[index % colors.length]

            return (
              <div
                key={item.id}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar */}
                <div
                  className="w-full rounded-t-md transition-all duration-300 relative"
                  style={{
                    height: `${height}%`,
                    backgroundColor: color,
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                    transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {/* Value label on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {item.total_registrations} registrations
                    </div>
                  )}
                </div>

                {/* Event title */}
                <div className="mt-2 text-xs text-center text-gray-600 line-clamp-2 max-w-full">{item.title}</div>
              </div>
            )
          })}

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
            <span>{maxValue}</span>
            <span>{Math.round(maxValue * 0.75)}</span>
            <span>{Math.round(maxValue * 0.5)}</span>
            <span>{Math.round(maxValue * 0.25)}</span>
            <span>0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
