"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X, Calendar, MapPin, Tag, DollarSign } from 'lucide-react'

export function EventFilters({ events, onFilterChange, activeFilters }) {
  const [showFilters, setShowFilters] = useState(false)

  // Extract unique values for filter options
  const locations = [...new Set(events.map(event => event.location).filter(Boolean))]
  const categories = [...new Set(events.flatMap(event => 
    event.tags ? (typeof event.tags === 'string' ? event.tags.split(',') : event.tags) : []
  ).filter(Boolean))]
  
  const organizers = [...new Set(events.map(event => event.organizer).filter(Boolean))]

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value)
  }

  const clearFilter = (filterType) => {
    onFilterChange(filterType, '')
  }

  const clearAllFilters = () => {
    onFilterChange('search', '')
    onFilterChange('location', '')
    onFilterChange('category', '')
    onFilterChange('dateRange', '')
    onFilterChange('priceRange', '')
    onFilterChange('organizer', '')
    onFilterChange('status', '')
  }

  const activeFilterCount = Object.values(activeFilters).filter(value => value !== '').length

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search events by title, description, or organizer..."
          value={activeFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">{activeFilterCount}</Badge>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {activeFilters.search}
              <button onClick={() => clearFilter('search')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {activeFilters.location}
              <button onClick={() => clearFilter('location')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {activeFilters.category}
              <button onClick={() => clearFilter('category')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {activeFilters.dateRange}
              <button onClick={() => clearFilter('dateRange')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.priceRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {activeFilters.priceRange}
              <button onClick={() => clearFilter('priceRange')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {activeFilters.status}
              <button onClick={() => clearFilter('status')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.organizer && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Organizer: {activeFilters.organizer}
              <button onClick={() => clearFilter('organizer')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Detailed Filters */}
      {showFilters && (
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={activeFilters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={activeFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={activeFilters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="next-week">Next week</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="next-month">Next month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Select value={activeFilters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any price</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100+">$100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status">Event Status</Label>
                <Select value={activeFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All events</SelectItem>
                    <SelectItem value="upcoming">Upcoming only</SelectItem>
                    <SelectItem value="past">Past events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Organizer Filter */}
              {organizers.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer</Label>
                  <Select value={activeFilters.organizer} onValueChange={(value) => handleFilterChange('organizer', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All organizers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All organizers</SelectItem>
                      {organizers.map((organizer) => (
                        <SelectItem key={organizer} value={organizer}>
                          {organizer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
