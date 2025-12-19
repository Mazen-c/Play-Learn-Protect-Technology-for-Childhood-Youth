import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWifi, FaRedo } from 'react-icons/fa';
import { useTheme } from '../../Components/Context/ThemeContext';

const OfflinePage: React.FC = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleRetry = () => {
        if (navigator.onLine) {
            navigate(-1); // Go back if online
        } else {
            window.location.reload(); // Reload to trigger browser check
        }
    };

    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800';
    const cardBgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

    const WifiIcon = FaWifi as any;
    const RedoIcon = FaRedo as any;

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${bgClass}`}>
            <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl border ${cardBgClass} text-center`}>
                <div className="flex justify-center mb-6 relative">
                    <div className="relative">
                        <WifiIcon className="text-6xl text-gray-400 opacity-50" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-red-500 rotate-45 rounded-full"></div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">You're Offline</h1>
                <p className="text-lg opacity-80 mb-8">
                    It looks like you've lost your internet connection. Check your network and try again.
                </p>

                <button
                    onClick={handleRetry}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                >
                    <RedoIcon />
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default OfflinePage;
