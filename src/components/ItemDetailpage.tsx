import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Calendar, Star, ChevronLeft, ChevronRight, CheckCircle, Check, FileText, Sparkles, ArrowRight, ChevronUp, ChevronDown, Info, AlertCircle, HelpCircle, Award } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchExcursionById } from '../slices/productsSlice';
import { addToCartAsync } from '../slices/cartSlice';
import { LazyImage } from './LazyImage';
import { BookingSkeleton, DetailsSkeleton, ImageGallerySkeleton } from './Skeletons/ItemDetailPage';
import { FaWhatsapp } from 'react-icons/fa';
import { useCurrency } from '../hooks/useCurrency';

export default function ItemDetailpage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get product and cart state from Redux
    const { selectedProduct: excursion, loading } = useAppSelector((state) => state.products);
    const { formatPrice } = useCurrency();

    const { checkout } = useAppSelector((state) => state.cart);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);

    // Accordion states
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isInclusionsOpen, setIsInclusionsOpen] = useState(true);
    const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
    const [isImportantInfoOpen, setIsImportantInfoOpen] = useState(false);
    const [isWhyBookOpen, setIsWhyBookOpen] = useState(false);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Fetch excursion details
    useEffect(() => {
        if (id) {
            const gidId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`;
            dispatch(fetchExcursionById(gidId));
        }
    }, [id, dispatch]);

    const nextImage = () => {
        if (excursion) {
            setCurrentImageIndex((prev) => (prev + 1) % excursion.images.length);
        }
    };

    const prevImage = () => {
        if (excursion) {
            setCurrentImageIndex((prev) => (prev - 1 + excursion.images.length) % excursion.images.length);
        }
    };

    const displayInclusions = useMemo(() => {
        const defaultInclusions = [
            "Refreshment drink",
            "Tea & Coffee",
            "Bottled water"
        ];

        const hasValidInclusions = excursion?.inclusions &&
            excursion.inclusions.length > 0 &&
            excursion.inclusions.some(item => item && item.trim().length > 0);

        return hasValidInclusions
            ? excursion.inclusions.filter(item => item && item.trim().length > 0)
            : defaultInclusions;
    }, [excursion?.inclusions]);

    const safetyPdfUrl = excursion?.title?.toLowerCase().includes('skydive')
        ? 'https://d1i3enf1i5tb1f.cloudfront.net/assets/pdf/SkydiveImportantInfo.pdf'
        : null;

    const totalGuests = adults + children;

    const pricePerPerson = excursion?.price || 0;
    const subtotal = formatPrice(pricePerPerson * totalGuests);

    // Format date for display
    const formatDateDisplay = (dateString: string) => {
        if (!dateString) return 'Select a date';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleWhatsAppInquiry = () => {
        if (!excursion) return;

        const phoneNumber = `${import.meta.env.VITE_CONTACT_NUMBER}`;
        console.log("phoneNumber", phoneNumber);

        const message = `Hi! I'm interested in booking this excursion:

    📍 *${excursion.title}*
    ${excursion.location ? `📌 Location: ${excursion.location}` : ''}

    *Booking Details:*
    📅 Date: ${formatDateDisplay(selectedDate)}
    👥 Adults: ${adults}
    👶 Children: ${children}
    🎟️ Total Guests: ${totalGuests}

    💰 Total Price: AED ${subtotal}

    Can you help me with the booking?`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    // Handle Book Now
    const handleBookNow = async () => {
        if (!excursion) return;

        setAddingToCart(true);
        try {
            const result = await dispatch(
                addToCartAsync({
                    item: {
                        variantId: excursion.variants[0].id,
                        quantity: totalGuests,
                        title: `${excursion.title} - ${selectedDate}`,
                        price: excursion?.price,
                        image: excursion.images[0],
                        productId: excursion.id,
                        customAttributes: {
                            date: selectedDate,
                            adults: adults.toString(),
                            children: children.toString(),
                            totalGuests: totalGuests.toString(),
                        }
                    },
                    currentCheckout: checkout
                })
            );

            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
                {/* Custom Styles for Date Picker */}
                <style>{`
                    @keyframes shimmer {
                        0% {
                            background-position: -1000px 0;
                        }
                        100% {
                            background-position: 1000px 0;
                        }
                    }

                    .animate-pulse {
                        animation: shimmer 2s infinite;
                        background-size: 1000px 100%;
                    }
                `}</style>

                {/* Breadcrumb Skeleton */}
                <div className="border-b border-amber-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                        <div className="h-4 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 animate-pulse rounded w-48 sm:w-64" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                        {/* Left Column - Skeletons */}
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <ImageGallerySkeleton />
                            <DetailsSkeleton />
                        </div>

                        {/* Right Column - Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 sm:top-8">
                                <BookingSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!excursion) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 px-4">
                Excursion not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
            {/* Custom Styles for Date Picker */}
            <style>{`
                input[type="date"] {
                    position: relative;
                    cursor: pointer;
                }

                input[type="date"]::-webkit-calendar-picker-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: auto;
                    height: auto;
                    color: transparent;
                    background: transparent;
                    cursor: pointer;
                }

                input[type="date"]:hover {
                    border-color: #F59E0B !important;
                }

                input[type="date"]:focus {
                    border-color: #F59E0B !important;
                    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1) !important;
                }

                .date-input-wrapper {
                    position: relative;
                }

                .date-input-wrapper .calendar-icon {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #F59E0B;
                }
            `}</style>

            {/* Breadcrumb */}
            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-amber-600 font-medium transition-colors">Home</Link>
                        <span className="text-amber-400">→</span>
                        <Link to="/excursions" className="hover:text-amber-600 font-medium transition-colors">Desert Safaris</Link>
                        <span className="text-amber-400">→</span>
                        <span className="text-gray-900 font-semibold truncate">{excursion.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Image Gallery */}
                        <div className="relative">
                            <div className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100">
                                <LazyImage
                                    src={excursion.images[currentImageIndex]}
                                    alt={excursion.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                                </button>

                                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                                    {currentImageIndex + 1} / {excursion.images.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                                {excursion.images.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 ${index === currentImageIndex
                                            ? 'border-amber-500 ring-2 ring-amber-300'
                                            : 'border-amber-200 opacity-60 hover:opacity-100 hover:border-amber-400'
                                            } transition-all`}
                                    >
                                        <LazyImage
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                            <div className="flex items-start justify-between mb-4 gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 rounded-full mb-3">
                                        <Sparkles className="w-4 h-4 text-amber-600" />
                                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Featured Safari</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                                        {excursion.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600">
                                        {excursion.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                                                <span className="truncate font-semibold">{excursion.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 flex-shrink-0" />
                                            <span className="font-bold text-gray-900">
                                                {excursion.rating?.toFixed(1)}
                                            </span>
                                            <span className="truncate font-medium">({excursion.reviewsCount} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 text-center border-2 border-amber-100 shadow-md hover:shadow-lg transition-all">
                                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 mx-auto mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">
                                    {excursion.duration || 'N/A'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Duration</div>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 text-center border-2 border-amber-100 shadow-md hover:shadow-lg transition-all">
                                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 mx-auto mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">
                                    {excursion.groupSize || 'N/A'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Group Size</div>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 text-center border-2 border-amber-100 shadow-md hover:shadow-lg transition-all">
                                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 mx-auto mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">Daily</div>
                                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Availability</div>
                            </div>
                        </div>

                        {/* Overview - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsOverviewOpen(!isOverviewOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
                                    Overview
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isOverviewOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isOverviewOpen && (
                                <div className="px-6 pb-6">
                                    <div
                                        className="text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: excursion.descriptionHtml }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Inclusions - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsInclusionsOpen(!isInclusionsOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <span>What's Included</span>
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isInclusionsOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isInclusionsOpen && (
                                <div className="px-6 pb-6">
                                    <div className="space-y-3">
                                        {displayInclusions?.map((inclusion: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-200 hover:bg-green-100 transition-colors"
                                            >
                                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-800 font-semibold text-sm sm:text-base">{inclusion}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {safetyPdfUrl && (
                                        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                                <div className="flex-1 min-w-0 w-full">
                                                    <h3 className="font-bold text-red-800 mb-2 text-base">
                                                        Important Safety Information
                                                    </h3>
                                                    <p className="text-sm text-red-700 mb-3 leading-relaxed">
                                                        Please read the safety guidelines before your skydive experience.
                                                    </p>

                                                    <a href={safetyPdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto shadow-lg"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        <span>View Safety Guide (PDF)</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* How It Works - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                                        <Info className="w-6 h-6 text-white" />
                                    </div>
                                    <span>How It Works</span>
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isHowItWorksOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isHowItWorksOpen && (
                                <div className="px-6 pb-6">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black">
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-2">Select Your Date</h3>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    Choose your preferred date and number of guests. Our calendar shows real-time availability.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black">
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-2">Book & Confirm</h3>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    Complete your booking securely online. You'll receive instant confirmation via email.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black">
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-2">Get Ready</h3>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    We'll send you all the details including pickup time, meeting point, and what to bring.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black">
                                                4
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-2">Enjoy Your Adventure</h3>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    Our professional team will ensure you have an unforgettable desert safari experience!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Important Information - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsImportantInfoOpen(!isImportantInfoOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <span>Important Information</span>
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isImportantInfoOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isImportantInfoOpen && (
                                <div className="px-6 pb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 font-semibold mb-1">Weather Dependent</p>
                                                <p className="text-xs text-gray-700">
                                                    Tours may be rescheduled due to extreme weather conditions for safety reasons.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 font-semibold mb-1">Dress Code</p>
                                                <p className="text-xs text-gray-700">
                                                    Wear comfortable, casual clothing suitable for desert conditions. Closed-toe shoes recommended.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 font-semibold mb-1">Health & Safety</p>
                                                <p className="text-xs text-gray-700">
                                                    Not recommended for pregnant women or people with back/heart problems. Please inform us of any medical conditions.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 font-semibold mb-1">Cancellation Policy</p>
                                                <p className="text-xs text-gray-700">
                                                    Free cancellation up to 24 hours before the tour. Full refund for cancellations within this period.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 font-semibold mb-1">What to Bring</p>
                                                <p className="text-xs text-gray-700">
                                                    Sunglasses, sunscreen, camera, and a light jacket for evening tours.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Why Book With Us - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsWhyBookOpen(!isWhyBookOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <span>Why Book With Us</span>
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isWhyBookOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isWhyBookOpen && (
                                <div className="px-6 pb-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Best Price Guarantee</h3>
                                                <p className="text-xs text-gray-700">
                                                    We offer the most competitive prices in Dubai with no hidden fees.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Expert Guides</h3>
                                                <p className="text-xs text-gray-700">
                                                    Professional, licensed drivers and guides with years of experience.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">24/7 Support</h3>
                                                <p className="text-xs text-gray-700">
                                                    Round-the-clock customer support for any questions or concerns.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Flexible Booking</h3>
                                                <p className="text-xs text-gray-700">
                                                    Easy online booking with flexible cancellation policy.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Safety First</h3>
                                                <p className="text-xs text-gray-700">
                                                    All vehicles are regularly maintained and fully insured.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">5-Star Reviews</h3>
                                                <p className="text-xs text-gray-700">
                                                    Thousands of satisfied customers with excellent ratings.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ - Accordion */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
                            <button
                                onClick={() => setIsFaqOpen(!isFaqOpen)}
                                className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                            >
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center">
                                        <HelpCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <span>Frequently Asked Questions</span>
                                </h2>
                                <div className="flex-shrink-0 ml-4">
                                    {isFaqOpen ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {isFaqOpen && (
                                <div className="px-6 pb-6">
                                    <div className="space-y-4">
                                        <div className="border-b border-gray-200 pb-4">
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm">What should I wear?</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Wear comfortable, casual clothing. We recommend light, breathable fabrics and closed-toe shoes. Bring a light jacket for evening tours as it can get cooler in the desert.
                                            </p>
                                        </div>
                                        <div className="border-b border-gray-200 pb-4">
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm">Is hotel pickup included?</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Yes, we offer complimentary pickup and drop-off from most hotels in Dubai. We'll confirm your exact pickup time after booking.
                                            </p>
                                        </div>
                                        <div className="border-b border-gray-200 pb-4">
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm">Is the tour suitable for children?</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Yes, children of all ages are welcome. However, dune bashing may not be suitable for very young children or those with motion sickness. Child seats are available upon request.
                                            </p>
                                        </div>
                                        <div className="border-b border-gray-200 pb-4">
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm">What if I have dietary restrictions?</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                We can accommodate most dietary requirements including vegetarian, vegan, halal, and gluten-free options. Please inform us of any restrictions when booking.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm">Can I take photos?</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Absolutely! Bring your camera or smartphone. The desert offers stunning photo opportunities, especially during sunset. Our guides can also take photos for you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
                                {/* Price */}
                                <div className="mb-6">
                                    {excursion.price && (
                                        <div className="flex items-center gap-3 mb-2">
                                            {/* Original Price */}
                                            <span className="text-sm text-gray-500 line-through font-medium">
                                                {formatPrice(excursion.price + 60)}
                                            </span>
                                            {/* Discount Badge */}
                                            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                                <Sparkles className="w-3 h-3" />
                                                {Math.round(((60) / (excursion.price + 60)) * 100)}% OFF
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        {formatPrice(excursion.price)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1 font-medium">per person</div>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Select Date
                                        </label>

                                        {/* Date Display Box */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-3 border-2 border-amber-200">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg p-2 flex-shrink-0">
                                                    <Calendar className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 mb-0.5 font-medium">Selected Date</div>
                                                    <div className="text-sm font-bold text-gray-900 truncate">
                                                        {formatDateDisplay(selectedDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Styled Date Input */}
                                        <div className="date-input-wrapper">
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={getTodayDate()}
                                                className="w-full px-4 py-3 pr-12 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-semibold text-gray-900 hover:border-amber-300 cursor-pointer"
                                            />
                                            <Calendar className="calendar-icon w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Guests
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Adults</label>
                                                <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors">
                                                    <button
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                                        className="px-3 py-2 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                        aria-label="Decrease adults"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900">{adults}</span>
                                                    <button
                                                        onClick={() => setAdults(adults + 1)}
                                                        className="px-3 py-2 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                        aria-label="Increase adults"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Children</label>
                                                <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors">
                                                    <button
                                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                                        className="px-3 py-2 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                        aria-label="Decrease children"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900">{children}</span>
                                                    <button
                                                        onClick={() => setChildren(children + 1)}
                                                        className="px-3 py-2 hover:bg-amber-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                        aria-label="Increase children"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 text-sm">
                                            <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">
                                                Total: <span className="font-bold text-gray-900">{totalGuests}</span> {totalGuests === 1 ? 'guest' : 'guests'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border-2 border-amber-200">
                                    <div className="flex items-center justify-between mb-2 text-sm">
                                        <span className="text-gray-700 font-medium">
                                            Subtotal ({totalGuests} {totalGuests === 1 ? 'guest' : 'guests'})
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            {subtotal}
                                        </span>
                                    </div>
                                    <div className="border-t-2 border-amber-200 pt-3 mt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-black text-gray-900">Total</span>
                                            <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                                {subtotal}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleBookNow}
                                        disabled={addingToCart}
                                        className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {addingToCart ? 'Adding to Cart...' : (
                                            <>
                                                Book Now
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleWhatsAppInquiry}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                    >
                                        Inquire via WhatsApp
                                        <FaWhatsapp className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
                                <div className="text-center">
                                    <div className="text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                                        {excursion.rating?.toFixed(1)}/5
                                    </div>
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-700 font-semibold">
                                        Based on {excursion.reviewsCount} reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}