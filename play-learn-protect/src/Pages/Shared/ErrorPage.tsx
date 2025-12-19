import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaNetworkWired, FaUserLock, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../../Components/Context/ThemeContext';

interface ErrorPageProps {
    type?: '404' | '403' | 'network' | 'general';
    message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type = '404', message }) => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    // Determine error details based on type
    const getErrorDetails = () => {
        // Cast icons to any to bypass React 19 type strictness with current react-icons version
        const Icon404 = FaExclamationTriangle as any;
        const Icon403 = FaUserLock as any;
        const IconNetwork = FaNetworkWired as any;
        const IconGeneral = FaExclamationTriangle as any;

        switch (type) {
            case '404':
                return {
                    icon: <Icon404 className="text-6xl text-yellow-500 mb-4" />,
                    title: 'Page Not Found',
                    description: "Oops! The page you're looking for doesn't exist or has been moved.",
                };
            case '403':
                return {
                    icon: <Icon403 className="text-6xl text-red-500 mb-4" />,
                    title: 'Access Denied',
                    description: "Sorry, you don't have permission to view this page.",
                };
            case 'network':
                return {
                    icon: <IconNetwork className="text-6xl text-blue-500 mb-4" />,
                    title: 'Connection Lost',
                    description: 'Please check your internet connection and try again.',
                };
            default:
                return {
                    icon: <IconGeneral className="text-6xl text-gray-500 mb-4" />,
                    title: 'Something Went Wrong',
                    description: 'An unexpected error occurred. Please try again later.',
                };
        }
    };

    const { icon, title, description } = getErrorDetails();
    const customMessage = message || description;

    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800';
    const cardBgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

    // Cast button icons
    const ArrowIcon = FaArrowLeft as any;
    const HomeIcon = FaHome as any;

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${bgClass}`}>
            <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl border ${cardBgClass} text-center transform transition-all hover:scale-105 duration-300`}>
                <div className="flex justify-center animate-bounce-slow">
                    {icon}
                </div>
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-lg opacity-80 mb-8">{customMessage}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
                    >
                        <ArrowIcon />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                    >
                        <HomeIcon />
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
