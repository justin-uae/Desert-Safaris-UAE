export function BrandedFallback() {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 overflow-hidden">
            {/* Animated Background Particles - Desert Theme */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-amber-300"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                    />
                ))}
            </div>

            {/* Desert Sand Dunes Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-amber-950 to-transparent"></div>
                <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" fill="rgba(245, 158, 11, 0.2)" />
                    <path d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z" fill="rgba(251, 146, 60, 0.2)" />
                </svg>
            </div>

            {/* Main Loader Container */}
            <div className="relative z-10 text-center">
                {/* Circular Loader with Rings - Desert Theme */}
                <div className="relative w-44 h-44 mx-auto mb-10">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-orange-500 animate-spin-slow shadow-2xl shadow-amber-500/30"></div>

                    {/* Middle Ring */}
                    <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-amber-300 border-r-orange-400 animate-spin-reverse shadow-xl shadow-orange-500/20"></div>

                    {/* Inner Ring */}
                    <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-amber-500 border-r-orange-600 animate-spin-slower"></div>

                    {/* Center Icon - Desert/Safari Themed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Compass/Navigation Icon for Desert Safari */}
                            <svg
                                className="w-20 h-20 text-amber-100 animate-pulse-scale"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                <path d="M12 8l-4 8h8z" opacity="0.5" />
                            </svg>

                            {/* Glowing Effect - Desert Colors */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 blur-2xl opacity-60 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Orbiting Dots - Desert Theme */}
                    <div className="absolute inset-0 animate-spin-orbital">
                        <div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full -translate-x-1/2 shadow-lg shadow-amber-400/50"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-orbital-reverse">
                        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full -translate-x-1/2 shadow-lg shadow-orange-500/50"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-orbital-slow">
                        <div className="absolute left-0 top-1/2 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full -translate-y-1/2 shadow-lg shadow-amber-500/50"></div>
                    </div>
                </div>

                {/* Brand Text - Desert Safari Theme */}
                <div className="space-y-5">
                    <h1 className="text-6xl font-black bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                        Desert Safaris UAE
                    </h1>

                    {/* Animated Subtitle */}
                    <div className="flex items-center justify-center gap-3 text-amber-100">
                        <span className="text-xl font-bold animate-fade-in">Discovering</span>
                        <span className="text-xl font-black text-amber-300 animate-text-glow">Arabian Adventures</span>
                    </div>

                    {/* Progress Bar - Desert Theme */}
                    <div className="w-72 h-2 mx-auto bg-amber-950/50 rounded-full overflow-hidden backdrop-blur-sm border border-amber-700/30 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 animate-progress rounded-full shadow-lg shadow-amber-500/50"></div>
                    </div>

                    {/* Loading Dots - Desert Colors */}
                    <div className="flex items-center justify-center gap-3 pt-6">
                        <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce-dot shadow-lg shadow-amber-400/50"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce-dot shadow-lg shadow-orange-400/50" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce-dot shadow-lg shadow-amber-500/50" style={{ animationDelay: '0.3s' }}></div>
                    </div>

                    {/* Status Text */}
                    <p className="text-amber-200/80 text-sm font-semibold tracking-wider uppercase pt-4">
                        Loading Your Adventure...
                    </p>
                </div>
            </div>

            {/* Floating Elements - Desert Theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right */}
                <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-float-slow"></div>

                {/* Bottom Left */}
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-full blur-3xl animate-float-slower"></div>

                {/* Middle Large Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

                {/* Additional Accent Glows */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-float-slower"></div>
                <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-orange-400/10 rounded-full blur-2xl animate-float-slow"></div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes spin-slower {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-orbital {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-orbital-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes spin-orbital-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes fade-in {
                    0%, 50% { opacity: 0.6; }
                    100% { opacity: 1; }
                }

                @keyframes text-glow {
                    0%, 100% {
                        text-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
                    }
                    50% {
                        text-shadow: 0 0 25px rgba(251, 191, 36, 0.9), 0 0 35px rgba(251, 191, 36, 0.7);
                    }
                }

                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes bounce-dot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(25px, -25px); }
                }

                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-35px, 35px); }
                }

                @keyframes twinkle {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.8);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.25;
                        transform: scale(1.08);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 2s linear infinite;
                }

                .animate-spin-slower {
                    animation: spin-slower 4s linear infinite;
                }

                .animate-spin-orbital {
                    animation: spin-orbital 3s linear infinite;
                }

                .animate-spin-orbital-reverse {
                    animation: spin-orbital-reverse 4s linear infinite;
                }

                .animate-spin-orbital-slow {
                    animation: spin-orbital-slow 5s linear infinite;
                }

                .animate-pulse-scale {
                    animation: pulse-scale 2.5s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-fade-in {
                    animation: fade-in 2s ease-in-out infinite;
                }

                .animate-text-glow {
                    animation: text-glow 2s ease-in-out infinite;
                }

                .animate-progress {
                    animation: progress 1.8s ease-in-out infinite;
                }

                .animate-bounce-dot {
                    animation: bounce-dot 1.2s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 7s ease-in-out infinite;
                }

                .animate-float-slower {
                    animation: float-slower 9s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}