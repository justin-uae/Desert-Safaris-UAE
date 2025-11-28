import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, LogOut, User as UserIcon, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout } from '../slices/authSlice';
import { CurrencySwitcher } from './CurrencySwitcher';
import { clearOrders } from '../slices/ordersSlice';
import Logo from '../assets/Logo.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { optimizeShopifyImage } from '../helper/optimizeImage';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get auth state from Redux
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    // Get cart state from Redux
    const { items } = useAppSelector((state) => state.cart);

    // Calculate cart count from items
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click-outside handler for desktop user menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleLogout = () => {
        dispatch(clearOrders());
        dispatch(logout());
        setShowUserMenu(false);
        navigate('/login');
    };

    return (
        <>
            {/* Top Bar - Desert Theme */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-10 text-sm">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5" />
                                <span className="font-medium">+971 54561 3397</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" />
                                <span className="font-medium">info@safaris.ae</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline font-medium">Hor Al Anz Building 101, Dubai, UAE</span>
                            <span className="sm:hidden font-medium">Dubai, UAE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar - Premium Desert Theme */}
            <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="flex-shrink-0">
                                <LazyLoadImage
                                    loading='lazy'
                                    className="w-12 h-12 sm:w-14 sm:h-12 md:w-18 md:h-18 transform group-hover:scale-110 transition-transform duration-300"
                                    src={optimizeShopifyImage(Logo, 40)}
                                    alt="Desert Safaris UAE Logo"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-tight">
                                    Desert Safaris UAE
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                                    Unforgettable Desert Adventures
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-amber-600 font-semibold transition-colors relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/safaris"
                                className="text-gray-700 hover:text-amber-600 font-semibold transition-colors relative group"
                            >
                                Desert Safaris
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-amber-600 font-semibold transition-colors relative group"
                            >
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-amber-600 font-semibold transition-colors relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </div>

                        {/* Right Side - User Menu or Login */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="border-r border-gray-200 pr-4">
                                <CurrencySwitcher />
                            </div>
                            <Link
                                to="/cart"
                                aria-label="Go to cart"
                                className="relative p-2.5 hover:bg-amber-50 rounded-full transition-colors group"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                // User Menu
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 p-2 hover:bg-amber-50 rounded-full transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-sm">
                                                {user?.email?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                                            <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                                                <p className="text-xs text-gray-600 mt-0.5">Member</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <UserIcon className="w-5 h-5" />
                                                <span className="font-medium">My Profile</span>
                                            </Link>

                                            <Link
                                                to="/bookings"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="font-medium">My Bookings</span>
                                            </Link>

                                            <hr className="my-2 border-gray-100" />

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span className="font-medium">Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Login/Register Buttons
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-amber-600 font-semibold transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-amber-600 p-2"
                                aria-label="mobile-menu-button"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden pb-4 border-t border-gray-100">
                            <div className="flex flex-col space-y-1 pt-4">
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/safaris"
                                    className="text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Desert Safaris
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <div className="py-3 px-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-lg my-2">
                                    <p className="text-xs font-bold text-gray-700 uppercase mb-2">Currency</p>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <CurrencySwitcher />
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-4 px-4 space-y-3">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="px-3 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                                                <p className="text-xs text-gray-600 font-medium">Signed in as</p>
                                                <p className="font-bold text-gray-900 truncate mt-1">{user?.email}</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 text-gray-700 hover:text-amber-600 py-2.5"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <UserIcon className="w-5 h-5" />
                                                <span className="font-semibold">My Profile</span>
                                            </Link>

                                            <Link
                                                to="/bookings"
                                                className="flex items-center gap-3 text-gray-700 hover:text-amber-600 py-2.5"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="font-semibold">My Bookings</span>
                                            </Link>

                                            <Link
                                                to="/cart"
                                                className="flex items-center gap-3 text-gray-700 hover:text-amber-600 py-2.5"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span className="font-semibold">Cart</span>
                                                {cartCount > 0 && (
                                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 py-2.5"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span className="font-semibold">Sign Out</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block text-center border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700 font-bold py-3 rounded-full transition-all"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign In
                                            </Link>

                                            <Link
                                                to="/register"
                                                className="block text-center bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold py-3 rounded-full shadow-lg"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Book Your Safari
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}