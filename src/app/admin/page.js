"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { StatsCards } from "@/components/charts/stats-cards"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Download } from "lucide-react"

export default function AdminPage() {
  const [dailyStats, setDailyStats] = useState([])
  const [popularEvents, setPopularEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [dailyResponse, popularResponse] = await Promise.all([
        fetch("/api/admin/registrations/daily"),
        fetch("/api/admin/popular-events"),
      ])

      if (!dailyResponse.ok || !popularResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const dailyData = await dailyResponse.json()
      const popularData = await popularResponse.json()

      console.log("Daily Stats:", dailyData)
      console.log("Popular Events:", popularData)

      setDailyStats(dailyData)
      setPopularEvents(popularData)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
      console.error("Error fetching admin data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">Error loading dashboard data: {error}</AlertDescription>
          </Alert>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📊 Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor your events and track registration analytics</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {lastUpdated && <p className="text-xs text-gray-500 mt-2">Last updated: {lastUpdated.toLocaleString()}</p>}
        </div>

        {/* Stats Cards */}
        <StatsCards dailyStats={dailyStats} popularEvents={popularEvents} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LineChart data={dailyStats} title="Daily Registrations" description="Registration trends over time" />

          <BarChart
            data={popularEvents.slice(0, 10)} // Show top 10 events
            title="Popular Events"
            description="Events with most registrations"
          />
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Registrations Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📅 Daily Registrations</CardTitle>
              <CardDescription>Detailed breakdown of daily registration counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Date</th>
                      <th className="text-right p-2 font-medium">Registrations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyStats.slice(-10).map((row, index) => (
                      <tr key={row.date} className="border-b hover:bg-gray-50">
                        <td className="p-2">{row.date}</td>
                        <td className="p-2 text-right font-medium">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Popular Events Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔥 Popular Events</CardTitle>
              <CardDescription>Events ranked by total registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularEvents.slice(0, 10).map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">{event.title}</div>
                        <div className="text-xs text-gray-500">Event ID: {event.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{event.total_registrations}</div>
                      <div className="text-xs text-gray-500">registrations</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
