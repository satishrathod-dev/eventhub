import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart, ExternalLink } from "lucide-react"
import { RegistrationModal } from "../../../components/modals/registration-modal"

export default async function EventDetailPage({ params }) {
    let event
  
    try {
      const res = await fetch(`http://localhost:3000/api/events/${params.id}`, {
        cache: "no-store", // Ensure fresh data
      })
  
      if (!res.ok) {
        return notFound()
      }
  
      event = await res.json()
    } catch (error) {
      return notFound()
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return {
        full: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      }
    }
  
    const isUpcoming = (dateString) => {
      return new Date(dateString) > new Date()
    }
  
    const dateInfo = formatDate(event.date)
    const upcoming = isUpcoming(event.date)
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header with background */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Events</span>
            </Link>
          </div>
        </div>
  
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Header */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        {upcoming ? (
                          <Badge className="bg-green-100 text-green-800 border-transparent">Upcoming Event</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-transparent">
                            Past Event
                          </Badge>
                        )}
                        {event.featured && (
                          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {event.title}
                      </CardTitle>
                    </div>
  
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Heart className="w-4 h-4" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
  
                <CardContent className="space-y-6">
                  <CardDescription className="text-lg text-gray-700 leading-relaxed">{event.description}</CardDescription>
  
                  {event.longDescription && (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed">{event.longDescription}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
  
              {/* Additional Details */}
              {(event.organizer || event.website || event.tags) && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {event.organizer && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Organizer</h4>
                        <p className="text-gray-600">{event.organizer}</p>
                      </div>
                    )}
  
                    {event.website && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                        <a
                          href={event.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                        >
                          Visit Event Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
  
                    {event.tags && event.tags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-gray-100 text-gray-600 border-transparent"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
  
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Date & Time Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-xl font-bold leading-none">{dateInfo.day}</div>
                      <div className="text-xs uppercase tracking-wide">{dateInfo.month}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{dateInfo.full}</div>
                      <div className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {dateInfo.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
  
              {/* Location Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 font-medium">{event.location}</p>
                  {event.address && <p className="text-gray-600 text-sm mt-1">{event.address}</p>}
                  {event.location && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Map
                    </Button>
                  )}
                </CardContent>
              </Card>
  
              {/* Attendees Card */}
              {event.attendees && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Attendees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{event.attendees}</div>
                    <div className="text-gray-600 text-sm">people attending</div>
                  </CardContent>
                </Card>
              )}
  
              {/* Registration Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Ready to join?</h3>
                      <p className="text-blue-100 text-sm">
                        {upcoming ? "Register now to secure your spot" : "This event has ended"}
                      </p>
                    </div>
  
                    {event.price && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">${event.price}</div>
                        <div className="text-blue-100 text-sm">per person</div>
                      </div>
                    )}
  
                    <RegistrationModal event={event}>
                      <button
                        className={`w-full px-4 py-2 rounded-md font-semibold transition-colors ${
                          upcoming
                            ? "bg-white text-blue-600 hover:bg-gray-50"
                            : "bg-gray-400 text-gray-600 cursor-not-allowed"
                        }`}
                        disabled={!upcoming}
                      >
                        {upcoming ? "Register Now" : "Event Ended"}
                      </button>
                    </RegistrationModal>
  
                    {upcoming && (
                      <p className="text-xs text-blue-100">Free cancellation up to 24 hours before the event</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
