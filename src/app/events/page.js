"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EventFilters } from "@/components/event-filters"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    dateRange: "",
    priceRange: "",
    organizer: "",
    status: "",
  })

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) throw new Error("Failed to fetch events")
        const data = await res.json()
        setAllEvents(data)
        setFilteredEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filter events based on active filters
  useEffect(() => {
    let filtered = [...allEvents]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          (event.organizer && event.organizer.toLowerCase().includes(searchTerm)),
      )
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((event) => event.location === filters.location)
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((event) => {
        if (!event.tags) return false
        const tags = typeof event.tags === "string" ? event.tags.split(",") : event.tags
        return tags.some((tag) => tag.trim() === filters.category)
      })
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date)

        switch (filters.dateRange) {
          case "today":
            return eventDate >= today && eventDate < tomorrow
          case "tomorrow":
            const dayAfterTomorrow = new Date(tomorrow)
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)
            return eventDate >= tomorrow && eventDate < dayAfterTomorrow
          case "this-week":
            const weekEnd = new Date(today)
            weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()))
            return eventDate >= today && eventDate <= weekEnd
          case "next-week":
            const nextWeekStart = new Date(today)
            nextWeekStart.setDate(nextWeekStart.getDate() + (7 - nextWeekStart.getDay()) + 1)
            const nextWeekEnd = new Date(nextWeekStart)
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 6)
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd
          case "this-month":
            const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            return eventDate >= today && eventDate <= monthEnd
          case "next-month":
            const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
            const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0)
            return eventDate >= nextMonthStart && eventDate <= nextMonthEnd
          default:
            return true
        }
      })
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter((event) => {
        const price = event.price || 0

        switch (filters.priceRange) {
          case "free":
            return price === 0
          case "0-25":
            return price >= 0 && price <= 25
          case "25-50":
            return price > 25 && price <= 50
          case "50-100":
            return price > 50 && price <= 100
          case "100+":
            return price > 100
          default:
            return true
        }
      })
    }

    // Status filter
    if (filters.status) {
      const now = new Date()
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date)
        const isUpcoming = eventDate > now

        switch (filters.status) {
          case "upcoming":
            return isUpcoming
          case "past":
            return !isUpcoming
          default:
            return true
        }
      })
    }

    // Organizer filter
    if (filters.organizer) {
      filtered = filtered.filter((event) => event.organizer === filters.organizer)
    }

    setFilteredEvents(filtered)
  }, [allEvents, filters])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4 bg-gray-200" />
            <Skeleton className="h-6 w-96 mx-auto bg-gray-200" />
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
                      <Skeleton className="h-4 w-1/2 bg-gray-200" />
                    </div>
                    <Skeleton className="h-16 w-16 rounded-lg bg-gray-200" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-gray-200" />
                  <Skeleton className="h-4 w-2/3 mb-4 bg-gray-200" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">Error loading events: {error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing events happening near you. Join us for unforgettable experiences.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <EventFilters events={allEvents} onFilterChange={handleFilterChange} activeFilters={filters} />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {allEvents.length} events
            {Object.values(filters).some((filter) => filter !== "") && (
              <span className="text-blue-600 font-medium"> (filtered)</span>
            )}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {allEvents.length === 0 ? "No events found" : "No events match your filters"}
            </h3>
            <p className="text-gray-600">
              {allEvents.length === 0
                ? "Check back later for upcoming events."
                : "Try adjusting your filters to see more events."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const dateInfo = formatDate(event.date)
              const upcoming = isUpcoming(event.date)

              return (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {event.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            {upcoming ? (
                              <Badge className="bg-green-100 text-green-800 border-transparent">Upcoming</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-transparent">
                                Past Event
                              </Badge>
                            )}
                            {event.price === 0 && (
                              <Badge className="bg-blue-100 text-blue-800 border-transparent">Free</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="bg-blue-600 text-white rounded-lg p-3 text-center min-w-[64px]">
                            <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                            <div className="text-xs uppercase tracking-wide">{dateInfo.month}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-600 line-clamp-3">{event.description}</CardDescription>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {dateInfo.weekday}, {dateInfo.time}
                          </span>
                        </div>

                        {event.attendees && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>{event.attendees} attending</span>
                          </div>
                        )}

                        {event.price && event.price > 0 && (
                          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                            <span>${event.price}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                          View Details →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
