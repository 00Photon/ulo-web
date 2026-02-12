'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Heart,
  Eye,
  LogOut,
  Settings,
  User,
  BarChart3,
  Home,
} from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import PropertiesManager from '@/components/dashboard/properties-manager'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  })

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-secondary flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">ULO</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link
              href="/listings"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              Properties
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              Blog
            </Link>
            <span className="text-gray-900 font-medium text-sm">Dashboard</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 border-gray-200 hover:bg-gray-50 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{userData.name}</p>
                  <p className="text-sm text-gray-600">Dashboard</p>
                </div>
              </div>

              <div className="space-y-2 mb-6 border-b border-gray-200 pb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 inline mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'properties'
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Home className="w-4 h-4 inline mr-3" />
                  Properties
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'favorites'
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Heart className="w-4 h-4 inline mr-3" />
                  Saved Properties
                </button>
              </div>

              <button className="w-full px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 font-medium transition-all text-left hover:bg-gray-50">
                <Settings className="w-4 h-4 inline mr-3" />
                Account Settings
              </button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Statistics */}
                <motion.div variants={fadeInUp} initial="initial" animate="animate">
                  <DashboardStats />
                </motion.div>

                {/* Quick Actions Card */}
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  <Card className="bg-white p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link href="/dashboard/add-property">
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white h-12">
                          Add New Property
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                      >
                        View Analytics
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                      >
                        Contact Support
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* Account Information */}
                <motion.div variants={fadeInUp} initial="initial" animate="animate">
                  <Card className="bg-white p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Account Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    <Button className="mt-6 bg-secondary hover:bg-secondary/90 text-white">
                      Save Changes
                    </Button>
                  </Card>
                </motion.div>
              </>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <PropertiesManager />
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <Card className="bg-white p-12 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved properties yet</p>
                  <Link href="/listings">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      Browse Properties
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
