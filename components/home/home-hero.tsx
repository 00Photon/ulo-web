'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import type { CurrencyFilter, QuickType } from '@/components/home/types'

type TabType = 'buy' | 'rent' | 'shortlet' | 'land'

const typesByTab: Record<TabType, string[]> = {
  buy: ['All Types', 'Apartment', 'House', 'Duplex', 'Villa', 'Townhouse'],
  rent: ['All Types', 'Apartment', 'House', 'Duplex', 'Studio', 'Shared Space'],
  shortlet: ['All Types', 'Apartment', 'Villa', 'Studio', 'House', 'Penthouse'],
  land: ['All Types', 'Commercial', 'Residential', 'Mixed Use', 'Industrial'],
}

const bedroomOptions = ['Any', '1', '2', '3', '4', '5+']

const priceRanges = ['Any', '50000', '100000', '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000', '2000000', '3000000']

type HomeHeroProps = {
  locationFilter: string
  typeFilter: string
  priceRangeFilter: string
  currencyFilter: CurrencyFilter
  quickType: QuickType
  onLocationChange: (value: string) => void
  onTypeChange: (value: string) => void
  onPriceRangeChange: (value: string) => void
  onCurrencyChange: (value: CurrencyFilter) => void
  onQuickTypeChange: (value: QuickType) => void
  onSearch: () => void
}

export default function HomeHero({
  locationFilter,
  typeFilter,
  priceRangeFilter,
  currencyFilter,
  quickType,
  onLocationChange,
  onTypeChange,
  onPriceRangeChange,
  onCurrencyChange,
  onQuickTypeChange,
  onSearch,
}: HomeHeroProps) {
  const [activeTab, setActiveTab] = useState<TabType>('buy')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [propertyType, setPropertyType] = useState('')

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.15) 100%), url('/house.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Content */}
        <div className="text-left space-y-4 max-w-3xl">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Dream Property in Nigeria
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Discover premium residences, smart investments, and commercial spaces.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-5xl w-full pt-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/60">
            {/* Tab Navigation */}
            <div className="px-6 md:px-8 pt-5 border-b border-gray-100">
              <div className="flex gap-6 md:gap-10 flex-wrap">
                {(['buy', 'rent', 'shortlet', 'land'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium uppercase tracking-wide transition-colors relative ${
                      activeTab === tab
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'shortlet' ? 'Short Let' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-900 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Content */}
            <div className="p-6 md:p-7 space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location, neighborhood, or city"
                  value={locationFilter}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full pl-12 pr-36 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-base placeholder:text-gray-400"
                />
                <Button
                  onClick={onSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  Search
                </Button>
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Type Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none cursor-pointer text-sm"
                  >
                    {typesByTab[activeTab].map((type) => (
                      <option key={type} value={type} className="bg-white text-gray-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none cursor-pointer text-sm"
                  >
                    {bedroomOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white text-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Price Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Min Price</label>
                  <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none cursor-pointer text-sm"
                  >
                    <option value="" className="bg-white text-gray-900">Any</option>
                    {priceRanges.slice(0, 10).map((price) => (
                      <option key={`min-${price}`} value={price} className="bg-white text-gray-900">
                        {Number(price).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Price Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Max Price</label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none cursor-pointer text-sm"
                  >
                    <option value="" className="bg-white text-gray-900">Any</option>
                    {priceRanges.slice(5).map((price) => (
                      <option key={`max-${price}`} value={price} className="bg-white text-gray-900">
                        {Number(price).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

