'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Eye,
  Edit,
  Trash2,
  LayoutGrid,
  LayoutList,
  Plus,
  MapPin,
  Filter,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Property {
  id: number
  title: string
  location: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  status: 'active' | 'sold' | 'pending'
  views: number
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    location: 'Downtown District',
    price: 850000,
    type: 'For Sale',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: 'active',
    views: 342,
  },
  {
    id: 2,
    title: 'Luxury Waterfront Villa',
    location: 'Coastal Avenue',
    price: 1250000,
    type: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    status: 'active',
    views: 567,
  },
  {
    id: 3,
    title: 'Suburban Family Home',
    location: 'Green Valley',
    price: 525000,
    type: 'For Rent',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    status: 'active',
    views: 234,
  },
  {
    id: 4,
    title: 'Cozy Studio Apartment',
    location: 'City Center',
    price: 1800,
    type: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    status: 'pending',
    views: 89,
  },
  {
    id: 5,
    title: 'Commercial Office Space',
    location: 'Business Park',
    price: 2500000,
    type: 'Commercial',
    bedrooms: 0,
    bathrooms: 4,
    sqft: 5000,
    status: 'sold',
    views: 445,
  },
]

export default function PropertiesManager() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const itemsPerPage = 6

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((prop) => {
      const matchesSearch =
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === 'all' || prop.type === filterType

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterType])

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProperties, currentPage])

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  const handleDelete = (id: number) => {
    console.log('[v0] Deleting property:', id)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage and track all your property listings
          </p>
        </div>
        <Link href="/dashboard/add-property">
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>

          {/* Filter */}
          <Select value={filterType} onValueChange={(value) => {
            setFilterType(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex gap-2 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded transition ${
                viewMode === 'card'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded transition ${
                viewMode === 'table'
                  ? 'bg-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Results Counter */}
      <p className="text-sm text-gray-600">
        Showing {paginatedProperties.length} of {filteredProperties.length} properties
      </p>

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 h-32 relative flex items-center justify-center">
                  <div className="text-gray-300">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <Badge
                    className={`absolute top-3 right-3 ${
                      property.status === 'active'
                        ? 'bg-green-500'
                        : property.status === 'sold'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </div>

                  <p className="font-bold text-secondary text-lg mb-3">
                    {property.type === 'For Rent' ? `$${property.price}/mo` : `$${(property.price / 1000).toFixed(0)}k`}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{property.bedrooms}</p>
                      <p className="text-gray-600">Beds</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{property.bathrooms}</p>
                      <p className="text-gray-600">Baths</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{property.sqft}</p>
                      <p className="text-gray-600">sqft</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 text-xs mb-4 pb-4 border-b">
                    <Eye className="w-3 h-3" />
                    {property.views} views
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-secondary text-secondary hover:bg-secondary/5 bg-transparent"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Link href={`/dashboard/edit-property/${property.id}`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => setDeleteId(property.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="bg-white overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProperties.map((property) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell>
                    <p className="font-medium text-gray-900">{property.title}</p>
                  </TableCell>
                  <TableCell className="text-gray-600">{property.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{property.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {property.type === 'For Rent' ? `$${property.price}/mo` : `$${(property.price / 1000).toFixed(0)}k`}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        property.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{property.views}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Link href={`/dashboard/edit-property/${property.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-secondary hover:bg-secondary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteId(property.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Empty State */}
      {paginatedProperties.length === 0 && (
        <Card className="bg-white p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No properties found</p>
          <Link href="/dashboard/add-property">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Create Your First Listing
            </Button>
          </Link>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <Card className="bg-white p-6 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Property?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
