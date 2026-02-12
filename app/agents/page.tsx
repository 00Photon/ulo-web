'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import HomeNav from '@/components/home/home-nav'
import HomeFooter from '@/components/home/home-footer'
import { Mail, Phone, MapPin, Star, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  {
    id: 1,
    name: 'Chisom Okonkwo',
    title: 'Senior Real Estate Agent',
    location: 'Lagos, Nigeria',
    phone: '+234 801 234 5678',
    email: 'chisom@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 127,
    specialization: 'Luxury Residential',
    propertiesSold: 156,
  },
  {
    id: 2,
    name: 'Amara Ibrahim',
    title: 'Commercial Property Specialist',
    location: 'Abuja, Nigeria',
    phone: '+234 802 345 6789',
    email: 'amara@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 98,
    specialization: 'Commercial Real Estate',
    propertiesSold: 132,
  },
  {
    id: 3,
    name: 'Tunde Adeyemi',
    title: 'Investment Property Agent',
    location: 'Lagos, Nigeria',
    phone: '+234 803 456 7890',
    email: 'tunde@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 112,
    specialization: 'Investment Properties',
    propertiesSold: 89,
  },
  {
    id: 4,
    name: 'Zainab Hassan',
    title: 'Residential Sales Agent',
    location: 'Port Harcourt, Nigeria',
    phone: '+234 804 567 8901',
    email: 'zainab@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 145,
    specialization: 'Residential Properties',
    propertiesSold: 198,
  },
  {
    id: 5,
    name: 'Chidi Nwosu',
    title: 'Land & Development Agent',
    location: 'Enugu, Nigeria',
    phone: '+234 805 678 9012',
    email: 'chidi@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 87,
    specialization: 'Land Development',
    propertiesSold: 67,
  },
  {
    id: 6,
    name: 'Nia Okafor',
    title: 'Rental Properties Specialist',
    location: 'Calabar, Nigeria',
    phone: '+234 806 789 0123',
    email: 'nia@ulorealestate.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 103,
    specialization: 'Rental Properties',
    propertiesSold: 156,
  },
]

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialization, setFilterSpecialization] = useState('All')

  const specializations = ['All', ...new Set(agents.map((a) => a.specialization))]

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = filterSpecialization === 'All' || agent.specialization === filterSpecialization
    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="min-h-screen bg-background">
      <HomeNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary">Meet Our Agents</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Connect with experienced real estate professionals dedicated to finding your perfect property
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {specializations.map((spec) => (
              <Button
                key={spec}
                variant={filterSpecialization === spec ? 'default' : 'outline'}
                onClick={() => setFilterSpecialization(spec)}
                className={`rounded-full ${
                  filterSpecialization === spec ? 'bg-secondary text-white' : ''
                }`}
              >
                {spec}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent, index) => (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
                {/* Agent Image */}
                <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <img
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Agent Info */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">{agent.name}</h3>
                    <p className="text-sm text-foreground/60">{agent.title}</p>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(agent.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-secondary">{agent.rating}</span>
                    <span className="text-xs text-foreground/60">({agent.reviews} reviews)</span>
                  </div>

                  {/* Specialization */}
                  <div className="bg-secondary/10 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide">
                      {agent.specialization}
                    </p>
                    <p className="text-xs text-foreground/70">{agent.propertiesSold} properties sold</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <MapPin className="w-4 h-4 text-secondary" />
                    {agent.location}
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-2 pt-4 border-t">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {agent.email}
                    </a>
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-secondary hover:underline">
                      <Phone className="w-4 h-4" />
                      {agent.phone}
                    </a>
                  </div>

                  {/* CTA */}
                  <Link href={`/agents/${agent.id}`}>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white mt-4">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/60">No agents found matching your criteria.</p>
          </div>
        )}
      </section>

      <HomeFooter />
    </div>
  )
}
