import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCollectionsWithProducts } from '../slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import { getMediaUrls } from '../services/shopifyService';
import ScopedSandParticles from './SandParticles';
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [bannerUrls, setBannerUrls] = useState<string[]>([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const autoRotateRef = useRef<any | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { collectionsWithProducts, loading } = useAppSelector((state) => state.products);

    // Fetch collections on mount
    useEffect(() => {
        dispatch(fetchCollectionsWithProducts());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLocationDropdown(false);
            }
        };

        if (showLocationDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLocationDropdown]);

    // Fetch banner URLs from media IDs
    useEffect(() => {
        const fetchBannerUrls = async () => {
            const bannerCollection = collectionsWithProducts?.find((col: any) => col.handle === "banner");
            const mediaIds = bannerCollection?.bannerMediaIds || [];

            if (mediaIds.length > 0) {
                setLoadingBanners(true);
                try {
                    const urls = await getMediaUrls(mediaIds);
                    setBannerUrls(urls);
                } catch (error) {
                    console.error("Error fetching banner URLs:", error);
                } finally {
                    setLoadingBanners(false);
                }
            }
        };

        fetchBannerUrls();
    }, [collectionsWithProducts]);

    // Auto-rotate banner every 5 seconds
    useEffect(() => {
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);

            return () => {
                if (autoRotateRef.current) {
                    clearInterval(autoRotateRef.current);
                }
            };
        }
    }, [bannerUrls.length]);

    // Banner navigation functions
    const goToPreviousBanner = () => {
        // Reset auto-rotate timer
        console.log("clicked");
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }

        setCurrentBannerIndex((prev) =>
            prev === 0 ? bannerUrls.length - 1 : prev - 1
        );

        // Restart auto-rotate
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);
        }
    };

    const goToNextBanner = () => {
        console.log("clicked");

        // Reset auto-rotate timer
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }

        setCurrentBannerIndex((prev) =>
            (prev + 1) % bannerUrls.length
        );

        // Restart auto-rotate
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);
        }
    };

    // Get current banner image
    const currentBannerImage = bannerUrls[currentBannerIndex] || '';

    useEffect(() => {
        if (selectedLocation !== '') {
            console.log("selectedLocation", selectedLocation);
            navigate(`/safaris?location=${encodeURIComponent(selectedLocation)}`);
        }
    }, [selectedLocation, navigate])

    // Get best cities to visit collection
    const bestCitiesCollection = collectionsWithProducts.find(
        (col: any) => col.handle === 'best-cities-to-visit'
    );

    const bestCitiesToVisit = bestCitiesCollection?.products || [];

    // Get unique locations for dropdown
    const uniqueLocations = [
        ...new Map(
            bestCitiesToVisit?.map((city: any) => [city?.location, city])
        ).values(),
    ];

    // Scroll Functionality
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const newScrollPosition =
                direction === 'left'
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleCityClick = (location: string) => {
        setSelectedLocation(location);
    };

    return (
        <>
            <div className="relative">
                {/* Hero Banner - Desert Theme */}
                <div className="relative h-72 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] group">
                    <div className="absolute inset-0 overflow-hidden">
                        {loadingBanners || !currentBannerImage ? (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
                                    <Compass className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-400 animate-pulse" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <LazyLoadImage
                                    src={`${currentBannerImage}`}
                                    alt="Desert Safari Banner"
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                // onError={(e) => {
                                //     e.currentTarget.style.display = 'none';
                                // }}
                                />
                                {/* Strong dark overlay for text visibility */}
                                {/* <div className="absolute inset-0 bg-black/40"></div> */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
                            </>
                        )}
                    </div>

                    {/* Banner Navigation Arrows - Desert styled */}
                    {bannerUrls.length > 1 && !loadingBanners && (
                        <>
                            {/* Left Arrow */}
                            <button
                                onClick={goToPreviousBanner}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all opacity-0 group-hover:opacity-100 z-30"
                                aria-label="Previous banner"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={goToNextBanner}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all opacity-0 group-hover:opacity-100 z-30"
                                aria-label="Next banner"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {/* Banner Indicators/Dots - Desert styled */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {bannerUrls.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentBannerIndex(index);
                                            if (autoRotateRef.current) {
                                                clearInterval(autoRotateRef.current);
                                                autoRotateRef.current = setInterval(() => {
                                                    setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
                                                }, 5000);
                                            }
                                        }}
                                        className={`rounded-full transition-all ${index === currentBannerIndex
                                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 w-10 h-3 shadow-lg'
                                            : 'bg-white/60 hover:bg-white/80 w-3 h-3'
                                            }`}
                                        aria-label={`Go to banner ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Hero Text - Clean & Visible */}
                    <div className="absolute inset-0 flex items-center z-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="max-w-3xl">
                                {/* Badge with solid background */}
                                {/* <div className="mb-3 sm:mb-4">
                                    <span className="inline-block bg-white text-amber-600 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xl uppercase tracking-wider border-2 border-amber-200">
                                        Most Popular Adventures
                                    </span>
                                </div> */}

                                {/* Main heading with text shadow */}
                                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
                                    Experience the
                                    <span className="block text-amber-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                                        Magic of the Desert
                                    </span>
                                </h1>

                                {/* Description with background */}
                                <div className="inline-block bg-black/30 backdrop-blur-sm px-4 py-3 rounded-2xl mb-6 sm:mb-8">
                                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold max-w-xl leading-relaxed">
                                        Discover unforgettable desert safaris, dune bashing adventures, and authentic Arabian experiences across the UAE
                                    </p>
                                </div>

                                {/* <Link to={"/safaris"}>
                                    <button className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full transition-all transform hover:scale-105 shadow-2xl text-sm sm:text-base md:text-lg overflow-hidden">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Explore Desert Adventures
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Location Selector - Desert styled */}
                <div className="relative -mt-10 z-40 px-4">
                    <div className="max-w-md mx-auto">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                className="w-full bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 hover:shadow-3xl transition-all border-2 border-amber-100 hover:border-amber-300 group"
                            >
                                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-2 rounded-xl group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                                    <MapPin className="w-6 h-6 text-amber-600" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Destination</p>
                                    <span className={`${selectedLocation ? "text-gray-900 font-bold" : "text-gray-400 font-medium"} text-base`}>
                                        {selectedLocation || "Choose Your Adventure"}
                                    </span>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-amber-600 transition-transform ${showLocationDropdown ? 'rotate-90' : ''}`} />
                            </button>

                            {showLocationDropdown && (
                                <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl p-5 max-h-96 overflow-y-auto z-50 border-2 border-amber-100">
                                    <div className="mb-4">
                                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Select Location</h3>
                                        <p className="text-xs text-gray-500 mt-1">Discover amazing desert experiences</p>
                                    </div>
                                    {loading ? (
                                        <div className="text-center py-12 text-gray-500">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500 mx-auto mb-3"></div>
                                            <p className="text-sm font-medium">Loading destinations...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {uniqueLocations?.map((city: any, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        handleCityClick(city?.location);
                                                        setShowLocationDropdown(false);
                                                    }}
                                                    className="group flex flex-col gap-2 p-2 rounded-xl hover:bg-amber-50 transition-all border-2 border-transparent hover:border-amber-200"
                                                >
                                                    <div className="w-full h-24 rounded-lg overflow-hidden shadow-md">
                                                        <LazyLoadImage
                                                            src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://via.placeholder.com/400x300'}
                                                            alt={city.location}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1.5 justify-center">
                                                        <MapPin className="w-3 h-3 text-amber-600" />
                                                        <span className="text-sm font-bold text-gray-800 group-hover:text-amber-700 transition-colors">{city?.location}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Best Cities to Visit Section - Desert Theme */}
                <ScopedSandParticles density={80} />
                <div className="bg-gradient-to-b from-white via-amber-50/30 to-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                                    Top Desert Destinations
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base font-medium">Explore the most breathtaking desert locations</p>
                            </div>
                            <div className="hidden sm:flex gap-2">
                                <button
                                    onClick={() => scroll('left')}
                                    className="bg-white border-2 border-amber-200 rounded-full p-3 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-md hover:shadow-lg group"
                                >
                                    <ChevronLeft className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="bg-white border-2 border-amber-200 rounded-full p-3 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-md hover:shadow-lg group"
                                >
                                    <ChevronRight className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-16 text-gray-500">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
                                <p className="font-semibold">Discovering amazing destinations...</p>
                            </div>
                        ) : (
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {bestCitiesToVisit.map((city: any, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCityClick(city?.location)}
                                        className="relative min-w-[280px] md:min-w-[320px] lg:min-w-[380px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-72 hover:shadow-2xl transition-all transform hover:scale-[1.02]"
                                    >
                                        <LazyLoadImage
                                            src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://via.placeholder.com/400x300'}
                                            alt={city.title}
                                            loading='lazy'
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            {/* <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-5 h-5 text-amber-400" />
                                                <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Destination</span>
                                            </div> */}
                                            <h3 className="text-white text-2xl md:text-3xl font-black mb-2 drop-shadow-lg">{city?.location}</h3>
                                            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                                                <span>Explore {city?.location}</span>
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                        {/* Corner accent */}
                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}