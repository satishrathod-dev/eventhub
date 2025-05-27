"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, Activity } from "lucide-react"

export function StatsCards({ dailyStats, popularEvents }) {
  // Calculate total registrations
  const totalRegistrations = dailyStats.reduce((sum, day) => sum + day.count, 0)

  // Calculate average daily registrations
  const avgDaily = dailyStats.length > 0 ? Math.round(totalRegistrations / dailyStats.length) : 0

  // Calculate total events
  const totalEvents = popularEvents.length

  // Calculate most popular event
  const mostPopular =
    popularEvents.length > 0
      ? popularEvents.reduce((max, event) => (event.total_registrations > max.total_registrations ? event : max))
      : null

  const stats = [
    {
      title: "Total Registrations",
      value: totalRegistrations.toLocaleString(),
      description: "All time registrations",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Events",
      value: totalEvents.toString(),
      description: "Events with registrations",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Daily Average",
      value: avgDaily.toString(),
      description: "Avg registrations per day",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Top Event",
      value: mostPopular ? mostPopular.total_registrations.toString() : "0",
      description: mostPopular ? mostPopular.title.substring(0, 20) + "..." : "No events",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
