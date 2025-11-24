import { MapPin, Zap, Users, ArrowRight, Star, Sparkles, Award, Shield, Clock, CheckCircle, TrendingUp, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Desert Theme */}
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 rounded-full">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700 text-sm sm:text-base font-black uppercase tracking-wider">Our Story</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 px-2 leading-tight">
                        Your Gateway to{' '}
                        <span className="block mt-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                            Unforgettable Desert Adventures
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
                        We make it easy for travelers to experience authentic Arabian desert safaris across the UAE
                    </p>
                </div>
            </div>

            {/* Features Grid - Desert Theme */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-amber-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Best Desert Locations</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Carefully curated desert experiences across top UAE destinations</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-amber-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Premium Quality</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Award-winning tours and activities you can trust completely</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-amber-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Instant Booking</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Lightning-fast booking process with instant confirmation</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-amber-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Expert Support</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">24/7 dedicated customer support for all your needs</p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision - Desert Theme */}
            <div className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 py-12 sm:py-16 md:py-20 px-4 sm:px-6 my-8 sm:my-12 overflow-hidden">
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <Compass className="w-8 h-8" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Mission</h2>
                            </div>
                            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                                To make authentic desert safari experiences accessible, affordable, and unforgettable for everyone. We connect adventurers with the magic of Arabian dunes.
                            </p>
                        </div>
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-8 h-8" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Vision</h2>
                            </div>
                            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                                To become the most trusted platform for desert safari bookings across the Middle East, delivering exceptional value and creating lasting memories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us - Desert Theme */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700 text-sm font-bold uppercase tracking-wider">Benefits</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        Experience the difference with our premium desert safari services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-xl transition-all hover:border-amber-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Verified Desert Experiences</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">All safaris are carefully selected and reviewed by our expert team</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-xl transition-all hover:border-amber-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Best Price Guarantee</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Competitive pricing with absolutely no hidden fees or surprises</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-xl transition-all hover:border-amber-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">100% Secure Booking</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Safe payment options with instant email confirmation guaranteed</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:shadow-xl transition-all hover:border-amber-300">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Flexible Cancellation</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Free cancellation up to 24 hours before your desert adventure</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section - Desert Theme */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Our Journey in Numbers</h2>
                        <p className="text-gray-400 text-lg font-medium">Trusted by thousands of adventure seekers</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-3">200+</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Desert Safaris</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-3">50K+</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Happy Travelers</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-3">4.9★</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Average Rating</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                            <h3 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-3">24/7</h3>
                            <p className="text-base sm:text-lg text-gray-300 font-bold uppercase tracking-wider">Support Available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section - Desert Theme */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-10 sm:p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-bold uppercase tracking-wider">Start Your Journey</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 sm:mb-5">Ready to Explore the Desert?</h2>
                        <p className="text-lg sm:text-xl text-white/95 mb-8 sm:mb-10 max-w-2xl mx-auto px-2 font-medium">
                            Start your next Arabian adventure today and discover why thousands of travelers choose us for their desert safari experience
                        </p>
                        <Link
                            to="/excursions"
                            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-amber-700 rounded-full font-black text-lg sm:text-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                        >
                            Browse Desert Safaris <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contact Section - Desert Theme */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 bg-white border-2 border-amber-200 px-4 py-2 rounded-full mb-4">
                            <Users className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-700 text-sm font-bold uppercase tracking-wider">Contact Us</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Get in Touch</h3>
                        <p className="text-lg text-gray-600 font-medium">We're here to help you plan your perfect desert adventure</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all hover:border-amber-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Email Us</h4>
                            <p className="text-sm sm:text-base text-amber-600 font-bold break-all">info@desertsafarisuae.com</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all hover:border-amber-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Call Us</h4>
                            <p className="text-sm sm:text-base text-amber-600 font-bold">+971 50 123 4567</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all hover:border-amber-300 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Support Hours</h4>
                            <p className="text-sm sm:text-base text-gray-700 font-bold">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}