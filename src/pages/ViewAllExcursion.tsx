import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllExcursions } from '../slices/productsSlice';
import { LoadingStateWithSkeleton } from '../components/Skeletons/AllExcursionSkeleton';
import { ExcursionCard } from '../components/ExcursionCard';
import { Search, SlidersHorizontal, X, MapPin, Sparkles, Compass, Filter } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    images: string[];
    location: string;
    duration: string;
    rating: number;
    reviewsCount: number;
    groupSize: string;
}

const ViewAllExcursion = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { products: excursions, loading } = useAppSelector((state) => state.products);
    const [filteredExcursions, setFilteredExcursions] = useState<Product[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Get location from query parameter
    const locationFromQuery = searchParams.get('location') || '';

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(locationFromQuery);
    const [sortBy, setSortBy] = useState('rating');

    // Get unique locations from excursions
    const uniqueLocations = Array.from(
        new Set(excursions.map((exc: Product) => exc.location).filter(Boolean))
    ).map((location) => ({
        value: location,
        label: location,
    }));

    // Fetch excursions on mount
    useEffect(() => {
        dispatch(fetchAllExcursions());
    }, [dispatch]);

    // Update selected location when query parameter changes
    useEffect(() => {
        if (locationFromQuery) {
            setSelectedLocation(locationFromQuery);
        }
    }, [locationFromQuery]);

    // Filter and search logic
    useEffect(() => {
        let filtered = [...excursions];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(exc =>
                exc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exc.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Location filter
        if (selectedLocation) {
            filtered = filtered.filter(exc =>
                exc.location.toLowerCase() === selectedLocation.toLowerCase()
            );
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredExcursions(filtered);
    }, [searchQuery, selectedLocation, sortBy, excursions]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLocation('');
        setSortBy('rating');
        navigate('/excursions');
    };

    const activeFiltersCount = () => {
        let count = 0;
        if (searchQuery) count++;
        if (selectedLocation) count++;
        return count;
    };

    if (loading) {
        return <LoadingStateWithSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={excursions.length}
                selectedLocation={selectedLocation}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border-2 border-amber-200 rounded-xl shadow-md hover:shadow-lg hover:border-amber-300 transition-all font-semibold text-gray-700"
                    >
                        <Filter className="w-5 h-5 text-amber-600" />
                        <span>
                            Filters {activeFiltersCount() > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                    {activeFiltersCount()}
                                </span>
                            )}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                        <FilterSidebar
                            uniqueLocations={uniqueLocations}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilters && (
                        <MobileFilterDrawer
                            uniqueLocations={uniqueLocations}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            clearFilters={clearFilters}
                            onClose={() => setShowMobileFilters(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort and Results */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="flex items-center gap-2">
                                <Compass className="w-5 h-5 text-amber-600" />
                                <p className="text-gray-700 font-medium">
                                    <span className="font-bold text-gray-900 text-lg">{filteredExcursions.length}</span>
                                    <span className="ml-1">{filteredExcursions.length === 1 ? 'safari' : 'safaris'} available</span>
                                    {selectedLocation && (
                                        <span className="ml-2 text-amber-600 font-bold">in {selectedLocation}</span>
                                    )}
                                </p>
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full sm:w-auto pl-10 pr-4 py-2.5 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    <option value="rating">⭐ Highest Rated</option>
                                    <option value="price-low">💰 Price: Low to High</option>
                                    <option value="price-high">💎 Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(selectedLocation || searchQuery) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">Active filters:</span>
                                {selectedLocation && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-full text-sm font-medium text-gray-700">
                                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                                        {selectedLocation}
                                        <button
                                            onClick={() => setSelectedLocation('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-full text-sm font-medium text-gray-700">
                                        <Search className="w-3.5 h-3.5 text-amber-600" />
                                        "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="ml-auto text-sm font-semibold text-amber-700 hover:text-amber-800 underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Results Grid */}
                        {filteredExcursions.length === 0 ? (
                            <EmptyState clearFilters={clearFilters} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredExcursions.map((excursion) => (
                                    <ExcursionCard key={excursion.id} excursion={excursion} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

// Hero Section Component
const HeroSection = ({ searchQuery, setSearchQuery, totalCount, selectedLocation }: any) => (
    <div className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white py-16 md:py-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-56 h-56 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Premium Desert Experiences</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 drop-shadow-lg">
                {selectedLocation ? (
                    <>
                        Discover <span className="text-amber-200">{selectedLocation}</span>
                    </>
                ) : (
                    <>
                        Desert Safaris & Adventures
                    </>
                )}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 font-medium drop-shadow max-w-3xl mx-auto">
                Explore {totalCount}+ unforgettable desert experiences across the UAE
            </p>

            <div className="max-w-2xl mx-auto">
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400 group-focus-within:text-amber-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search safaris, activities, destinations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 md:pl-16 pr-6 py-4 md:py-5 rounded-2xl text-gray-800 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-2xl font-medium border-2 border-transparent focus:border-amber-300 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Filter Sidebar Component
const FilterSidebar = ({
    uniqueLocations,
    selectedLocation,
    setSelectedLocation,
    clearFilters
}: any) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border-2 border-amber-100">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-100">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-black text-gray-900">Filters</h2>
            </div>
            <button
                onClick={clearFilters}
                className="text-sm text-amber-600 hover:text-amber-700 font-bold hover:underline transition-colors"
            >
                Clear all
            </button>
        </div>

        {/* Location Filter */}
        <FilterSection title="Destination">
            <button
                onClick={() => setSelectedLocation('')}
                className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${!selectedLocation
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'hover:bg-amber-50 text-gray-700'
                    }`}
            >
                <MapPin className={`w-4 h-4 ${!selectedLocation ? 'text-white' : 'text-amber-600'}`} />
                All Destinations
            </button>
            {uniqueLocations.map((location: any) => (
                <button
                    key={location.value}
                    onClick={() => setSelectedLocation(location.value)}
                    className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${selectedLocation === location.value
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'hover:bg-amber-50 text-gray-700'
                        }`}
                >
                    <MapPin className={`w-4 h-4 ${selectedLocation === location.value ? 'text-white' : 'text-amber-600'}`} />
                    {location.label}
                </button>
            ))}
        </FilterSection>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Need Help?</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Contact our travel experts for personalized safari recommendations
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({
    uniqueLocations,
    selectedLocation,
    setSelectedLocation,
    clearFilters,
    onClose
}: any) => (
    <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={onClose}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto shadow-2xl animate-slideInLeft">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-100">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                        <h2 className="text-xl font-black text-gray-900">Filters</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <FilterSidebar
                    uniqueLocations={uniqueLocations}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    clearFilters={clearFilters}
                />

                <button
                    onClick={onClose}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                    Show Results
                </button>
            </div>
        </div>
    </>
);

// Filter Section Component
const FilterSection = ({ title, children }: any) => (
    <div className="mb-6 pb-6 border-b-2 border-amber-100 last:border-0">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
            {title}
        </h3>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

// Empty State
const EmptyState = ({ clearFilters }: any) => (
    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-amber-100">
        <div className="relative w-32 h-32 mx-auto mb-6">
            <Compass className="w-32 h-32 text-amber-200 animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-12 h-12 text-amber-400" />
            </div>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">No Safaris Found</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find any desert adventures matching your criteria. Try adjusting your filters or search query.
        </p>
        <button
            onClick={clearFilters}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
            Clear All Filters
        </button>
    </div>
);

export default ViewAllExcursion;