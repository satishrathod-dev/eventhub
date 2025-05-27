"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Shield, Calendar, MapPin, Clock, Star, ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-12 lg:mb-20" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            Welcome to EventHub
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            Amazing Events
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of people discovering and attending incredible events. Whether you're looking to attend or
            manage events, we've got you covered.
          </p>
        </motion.div>

        {/* User Type Selection */}
        <motion.div className="max-w-4xl mx-auto mb-16" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Experience</h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Users Card */}
            <Link href="/events">
              <motion.div
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 cursor-pointer overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Event Attendee</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Discover and register for amazing events happening near you. Browse, filter, and join events that
                    match your interests.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Browse upcoming events</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>Find events by location</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Star className="w-4 h-4" />
                      <span>Easy registration process</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium group-hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Events
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Admin Card */}
            <Link href="/admin">
              <motion.div
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 cursor-pointer overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-6 h-6 text-purple-600" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Event Organizer</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Create, manage, and track your events. Access powerful tools to organize successful events and
                    manage registrations.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Create and manage events</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>Track registrations</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Star className="w-4 h-4" />
                      <span>Analytics and insights</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg text-center font-medium group-hover:bg-purple-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Admin Dashboard
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Why Choose EventHub?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Event Discovery</h3>
              <p className="text-gray-600 text-sm">
                Find events that match your interests with powerful search and filtering tools.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-gray-600 text-sm">
                Get instant notifications about event changes and new opportunities.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg sm:col-span-2 lg:col-span-1"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Seamless Experience</h3>
              <p className="text-gray-600 text-sm">
                Enjoy a smooth, intuitive interface designed for both attendees and organizers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
